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

![Gerador 3](/img/tutorials/page-with-form/form3.png)

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

### ADICIONANDO ROTA

Agora que a página está criada, vamos adicionar a rota pra ela no arquivo `app-routing.module.ts`. Como se trata de uma rota-filha, vamos alterar a entrada da tabela para funcionar com o registro aninhado. Segue exemplo:

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
