---
title: Criar uma página com formulário
slug: /app/tutorials/page-with-form
---

Para criar uma página que contém um formulário, podemos fazer manualmente ou usando o gerador da XDK. Manualmente, envolveria criar uma página
com o comando `ng g c nome-componente`, criar um arquivo de configuração do formulário e adicionar o HTML necessário para o funcionamento dele. Nesse exemplo, iremos utilizar o utilitário fornecido pela XDK, mas você pode fazer manualmente também, como explicado.

Para criar a página precisamos executar o comando: `yo xdk:front --force`.

:::info
A opção `--force` deve ser usada para evitar confirmações constantes do sistema de arquivos pedindo permissão para fazer alterações.
:::

:::caution Importante
Esse comando deve ser executado na raiz do projeto.
:::

Uma série de perguntas será exibida. Em cada etapa você informa os dados desejados. Segue um exemplo de utilização:

1. Na primeira pergunta devemos informar o tipo do gerador a ser executado. Para nosso exemplo selecione a opção Formulário e aperte `Enter`.

![Gerador 1](/img/tutorials/page-with-form/form1.png)

2. Nas próximas perguntas iremos responder:
    1. Se desejamos criar um `store` (deixaremos em não porque o nosso já está criado)
    2. Qual o nome do `store` (usaremos o store `gerenciamento-pacientes` em nosso caso)
    3. O nome do formulário (como será um formulário de pacientes, iremos usar o nome `pacientes`)
    4. Se deve usar o nome `form` como nome da pasta que contém o formulário. Se você estiver criando o formulário dentro de um pasta pai (por exemplo, uma tabela que seja a listagem do item que você está criando o formulário ou qualquer outra pasta pai que seja do mesmo escopo), deixe a opção "Sim" marcada. Caso contrário, selecione "Não" e será criada uma pasta com o nome informado mais o sufixo `-form`
    5. Qual o tipo de dados da tabela (usaremos o *model* já criado: `PacienteModel`)
    6. Por último, informar qual pasta contém o nosso formulário, como estamos criando essa página como filha de uma tabela, vamos colocar o nome da pasta da página da tabela como pai, `gerenciamento-pacientes`, e apertar `Enter`.

![Gerador 2](/img/tutorials/page-with-form/form2.png)

3. Feito isso, o gerador irá criar a página, o configurador da tabela e fazer as configurações necessárias. Teremos a seguinte
estrutura de arquivos como resultado:

![Estrutura de pastas](/img/tutorials/page-with-form/form3.png)

## CONFIGURANDO O FORMULÁRIO

Vamos agora configurar o formulário de acordo com nossas necessidades. Para isso, vamos abrir o
arquivo `pacientes.form-config.ts`. Esse é o código gerado automaticamente:

```ts title="/src/app/views/gerenciamento-pacientes/form/pacientes.form-config.ts" showLineNumbers
import {
    BaseFormConfig,
    FormTitleConfigModel,
    FormRowModel,
    FormFieldModel,
    RequiredValidator
} from '@itix/components'; 

export class PacientesFormConfig extends BaseFormConfig {
    constructor() {
        super();

        // TODO: Exemplo de utilização. Remover.
        this.titleConfig = new FormTitleConfigModel({
            onCreate: '[Cadastro de Pacientes] Criação',
            onEdit: '[Cadastro de Pacientes] Edição',
            onView: '[Cadastro de Pacientes] Visualização'
        });
        this.rows = [
            new FormRowModel({
                fields: [
                    new FormFieldModel({
                        name: 'name',
                        label: 'Nome',
                        validations: [
                            new RequiredValidator()
                        ]
                    })
                ]
            })
        ];
    }
}

```

### CONFIGURANDO O CAMPO `nome`

Nosso modelo atualmente tem os campos `id`, `nome`, `situacao` e `dataCadastro`. Para esse exemplo, vamos manter o campo `name` gerado automaticamente, só trocando o nome e alterando o tamanho do campo na tela. Vamos deixar ocupando a metade da tela. Ficou assim (parte alterada destacada):

```ts
new FormFieldModel({
    // highlight-start
    name: 'nome',
    colSize: 6,
    // highlight-end
    label: 'Nome',
    validations: [
        new RequiredValidator()
    ]
})
```

Como queremos que o campo seja obrigatório, vamos manter o validador `RequiredValidator`.

### CONFIGURANDO O CAMPO `situacao`

Vamos adicionar agora o campo `situacao`. Por se tratar de um enumerador fixo, podemos criar uma lista local com essas opções ou usar um *endpoint* que retorne essa lista estática ou de uma base de dados. Vamos demonstrar como fazer das duas formas:

#### 1 - USANDO UM *ENDPOINT* PARA O SELECT

Para usar um *endpoint*, poderíamos criar um novo *store* e adicionar o método que retorna a lista lá, mas, no nosso caso, vamos usar o *store* de pacientes que já temos. Para isso, vamos adicionar um novo método para carregar os dados do *endpoint* que lista as situações:

```ts title="/src/app/services/stores/gerenciamento-pacientes.store.ts" showLineNumbers
// ...
@Injectable()
export class GerenciamentoPacientesStore extends BaseEntityStore<PacienteModel> {
    constructor(
        requestService: RequestService
    ) {
        super(
            new StoreConfig<PacienteModel>({
                requestService,
                baseUrl: 'gerenciamento-pacientes'
            })
        );
    }
}

```

Após alterar, ficará assim (as partes alteradas estão destacadas):

```ts title="/src/app/services/stores/gerenciamento-pacientes.store.ts" showLineNumbers
import { Injectable } from '@angular/core';
import {
    BaseEntityStore,
    RequestService,
    // highlight-start
    KeyValueModel,
    SearchRequestModel,
    SearchResponseModel,
    // highlight-end
    StoreConfig
} from '@itix/core';
// highlight-start
import { Observable } from 'rxjs';
// highlight-end

import { PacienteModel } from '../../models/paciente.model';

@Injectable()
export class GerenciamentoPacientesStore extends BaseEntityStore<PacienteModel> {
    constructor(
        requestService: RequestService
    ) {
        super(
            new StoreConfig<PacienteModel>({
                requestService,
                baseUrl: 'gerenciamento-pacientes'
            })
        );
    }

    // highlight-start
    listarSituacoes(
        request = new SearchRequestModel()
    ): Observable<SearchResponseModel<KeyValueModel>> {
        return this._config.requestService.makePost<SearchResponseModel<KeyValueModel>>(
            this.getRequestModel('listar-situacoes', request)
        );
    }
    // highlight-end
}

```

Com essa alteração, podemos agora adicionar o campo no arquivo `pacientes.form-config.ts`, ficará assim:

```ts
new FormFieldSelectModel({
    name: 'situacao', // Nome da propriedade no objeto.
    label: 'Situação', // Texto exibido como descrição do campo no formulário.
    colSize: 4, // Tamanho da coluna usando o padrão GridSystem.
    store: store, // Store que irá realizar a busca dos dados.
    storeMethodName: 'listarSituacoes', // Nome do método, no store, que irá fazer a busca dos dados.
    keyProperty: 'key', // Nome da propriedade usada como chave no objeto retornado pelo store.
    valueProperty: 'value' // Nome da propriedade usada como descrição no objeto retornado pelo store.
})
```

Para adicionar o *store* no `FormFieldSelectModel`, precisamos alterar o construtor de `PacientesFormConfig`:

```ts
// ...
export class PacientesFormConfig extends BaseFormConfig {
    // highlight-start
    constructor(store: GerenciamentoPacientesStore) {
    // highlight-end
        // ...
    }
}
```

E em `PacientesFormComponent`, adicionar o novo parâmetro:

```ts
this.config = new PacientesFormConfig(gerenciamentoPacientesStore);
```

:::caution Importante
Se nós tivéssemos um *store* específico para as situações, não teria sido necessário informar o nome do método de pesquisa, nem criar o novo método no *store*, a XDK iria utilizar automaticamente o método `list` do *store* `BaseListStore`.
:::

#### 2 - USANDO UMA LISTA LOCAL PARA O SELECT

Para usar uma lista com dados locais, nosso modelo ficaria assim:

```ts
new FormFieldSelectModel({
    name: 'situacao',
    label: 'Situação',
    colSize: 4,
    keyProperty: 'key',
    valueProperty: 'value',
    items: [
        new KeyValueModel({ 
            key: `${SituacaoPacienteEnum.Ativo}`, 
            value: 'Ativo' 
        }),
        new KeyValueModel({ 
            key: `${SituacaoPacienteEnum.AguardandoAtivacao}`, 
            value: 'Aguardando ativação' 
        }),
        new KeyValueModel({ 
            key: `${SituacaoPacienteEnum.Desativado}`, 
            value: 'Desativado' 
        })
    ]
})
```

### CONFIGURANDO O CAMPO `dataCadastro`

Vamos adicionar agora o campo `dataCadastro`. Ele é um campo de data, por isso vamos usar o `DatePicker`:

```ts
new FormFieldDateModel({
    name: 'dataCadastro',
    label: 'Data de cadastro',
    colSize: 4
})
```

Como não queremos adicionar esse campo na linha atual do formulário, vamos adicioná-lo em uma nova linha:

```ts
new FormRowModel({
    fields: [
        // ...
    ]
}),
new FormRowModel({
    fields: [
        new FormFieldDateModel({
            name: 'dataCadastro',
            label: 'Data de cadastro',
            colSize: 4
        })
    ]
})
```

O arquivo de configuração do formulário (`PacientesFormConfig`) completo, ficou assim: 

```ts title="/src/app/views/gerenciamento-pacientes/form/pacientes.form-config.ts" showLineNumbers
import {
    BaseFormConfig,
    FormTitleConfigModel,
    FormRowModel,
    FormFieldModel,
    RequiredValidator,
    FormFieldSelectModel,
    FormFieldDateModel
} from '@itix/components'; 

import { GerenciamentoPacientesStore } from '../../../services/stores/gerenciamento-pacientes.store'; 

export class PacientesFormConfig extends BaseFormConfig {
    constructor(store: GerenciamentoPacientesStore) {
        super();

        this.titleConfig = new FormTitleConfigModel({
            onCreate: 'Cadastrar paciente',
            onEdit: 'Editar paciente',
            onView: 'Visualizar paciente'
        });
        this.rows = [
            new FormRowModel({
                fields: [
                    new FormFieldModel({
                        name: 'nome',
                        colSize: 6,
                        label: 'Nome',
                        validations: [
                            new RequiredValidator()
                        ]
                    }),
                    new FormFieldSelectModel({
                        name: 'situacao',
                        label: 'Situação',
                        colSize: 4,
                        store: store,
                        storeMethodName: 'listarSituacoes',
                        keyProperty: 'key',
                        valueProperty: 'value'
                    })
                ]
            }),
            new FormRowModel({
                fields: [
                    new FormFieldDateModel({
                        name: 'dataCadastro',
                        label: 'Data de cadastro',
                        colSize: 4
                    })
                ]
            })
        ];
    }
}

```

### CONFIGURANDO O SUBTÍTULO

Podemos remover o subtítulo, mas para o nosso caso iremos utilizá-lo. Para isso, vamos remover o comentário gerado automaticamente e mudar o texto de `PacientesForm` para `paciente` no arquivo `pacientes-form.component.ts`:

```ts title="/src/app/views/gerenciamento-pacientes/form/pacientes-form.component.ts" showLineNumbers
override ngAfterViewInit(): void {
    super.ngAfterViewInit();
    // highlight-start
    this.setupSubheader(`${this.getStateTitle()} de paciente`);
    // highlight-end
}
```

E no arquivo `pacientes-form.component.html` vamos mudar a propriedade `title` para: `title="Formulário"`

### ADICIONANDO OS MÓDULOS

Para utilizar o formulário da XDK, precisamos adicionar dois módulos ao nosso arquivo `views.module.ts`,  `CardModule` e `FormModule`. Nosso arquivo ficará assim (as partes alteradas estão destacadas):

```ts title="/src/app/views/views.module.ts" showLineNumbers
import { NgModule } from '@angular/core'; 
import { CommonModule } from '@angular/common'; 
// highlight-start
import { LayoutsModule, ColumnModule, FormModule, CardModule } from '@itix/components'; 
// highlight-end

import { HomeComponent } from './home/home.component'; 
import { 
    GerenciamentoPacientesComponent 
} from './gerenciamento-pacientes/gerenciamento-pacientes.component'; 
import { 
    PacientesFormComponent 
} from './gerenciamento-pacientes/form/pacientes-form.component'; 

@NgModule({
    imports: [
        CommonModule,
        LayoutsModule,
        ColumnModule,
        // highlight-start
        CardModule,
        FormModule
        // highlight-end
    ],
    declarations: [
        HomeComponent,
        GerenciamentoPacientesComponent,
        PacientesFormComponent
    ],
    exports: [
        HomeComponent,
        GerenciamentoPacientesComponent,
        PacientesFormComponent
    ]
})
export class ViewsModule { }

```

### ADICIONANDO AS ROTAS

Agora que a página está criada, vamos adicionar as rotas pra ela no arquivo `app-routing.module.ts`. Como se trata de uma rota-filha, vamos alterar a entrada da tabela para funcionar com o registro aninhado. Segue exemplo:

Como estava:

```ts
// ...
{
    path: 'pacientes',
    component: GerenciamentoPacientesComponent,
    data: {
        showInMenu: true,
        title: 'Gerenciamento de pacientes',
        icon: 'fad fa-user-injured'
    }
}
// ...
```

Como ficou:

```ts
// ...
{
    path: 'pacientes',
    data: {
        isGroup: true,
        title: 'Gerenciamento de pacientes',
        breadcrumb: 'Gerenciamento de pacientes',
        icon: 'fad fa-user-injured'
    },
    children: [
        {
            path: '',
            component: GerenciamentoPacientesComponent,
            data: {
                showInMenu: true,
                title: 'Lista'
            }
        },
        {
            path: 'add',
            component: PacientesFormComponent,
            data: {
                showInMenu: true,
                title: 'Novo',
                breadcrumb: 'Novo'
            }
        },
        { path: ':id', component: PacientesFormComponent, data: { breadcrumb: 'Visualizar' } },
        { path: ':id/edit', component: PacientesFormComponent, data: { breadcrumb: 'Editar' } }
    ]
}
// ...
```

Arquivo final com a parte alterada em destaque:

```ts title="/src/app/app-routing.module.ts" showLineNumbers
// imports...
export const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'home' },

    {
        path: '',
        component: DefaultLayoutComponent,
        data: {
            showChildrenInMenu: true
        },
        children: [
            {
                path: 'home',
                component: HomeComponent,
                data: {
                    showInMenu: true,
                    title: 'Home',
                    icon: 'fad fa-home'
                }
            },
            {
                path: '',
                data: {
                    isSection: true,
                    title: 'Cadastros',
                    breadcrumb: 'Cadastros'
                },
                children: [
                    {
                        path: 'pacientes',
                        // highlight-start
                        data: {
                            isGroup: true,
                            title: 'Gerenciamento de pacientes',
                            breadcrumb: 'Gerenciamento de pacientes',
                            icon: 'fad fa-user-injured'
                        },
                        children: [
                            {
                                path: '',
                                component: GerenciamentoPacientesComponent,
                                data: {
                                    showInMenu: true,
                                    title: 'Lista'
                                }
                            },
                            {
                                path: 'add',
                                component: PacientesFormComponent,
                                data: {
                                    showInMenu: true,
                                    title: 'Novo',
                                    breadcrumb: 'Novo'
                                }
                            },
                            { 
                                path: ':id', 
                                component: PacientesFormComponent, 
                                data: { breadcrumb: 'Visualizar' } 
                            },
                            { 
                                path: ':id/edit', 
                                component: PacientesFormComponent, 
                                data: { breadcrumb: 'Editar' } 
                            }
                        ]
                        // highlight-end
                    }
                ]
            }
        ]
    },

    { path: '**', redirectTo: 'home' }
]; 
```

Feito tudo isso, teremos a seguinte tela:

![Tela formulário](/img/tutorials/page-with-form/form4.png)
