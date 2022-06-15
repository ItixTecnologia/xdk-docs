---
title: Criar uma página com tabela
slug: /app/tutorials/page-with-table
---

Para criar uma página que contém uma tabela, podemos fazer manualmente ou usando o gerador da XDK. Manualmente, envolveria criar uma página
com o comando `ng g c nome-componente`, criar um arquivo de configuração da tabela e adicionar o HTML necessário para o funcionamento da
tabela. Nesse exemplo, iremos utilizar o utilitário fornecido pela XDK, mas você pode fazer manualmente também, como explicado.

Para criar a página precisamos executar o comando: `yo xdk:front --force`.

:::info
A opção `--force` deve ser usada para evitar confirmações constantes do sistema de arquivos pedindo permissão para fazer alterações.
:::

:::caution Importante
Esse comando deve ser executado na raiz do projeto.
:::

Uma série de perguntas será exibida. Em cada etapa você informa os dados desejados. Segue um exemplo de utilização:

1. Na primeira pergunta devemos informar o tipo do gerador a ser executado. Para nosso exemplo selecione a opção Tabela e aperte `Enter`.

![Gerador 1](/img/tutorials/page-with-table/table1.png)

2. Nas próximas perguntas iremos responder:
    1. Se desejamos criar um `store` (deixaremos em não porque o nosso já está criado)
    2. Qual o nome do `store` (usaremos o store `gerenciamento-pacientes` em nosso caso)
    3. O nome da tabela no plural (como será uma tabela de pacientes, iremos deixar o mesmo nome do `store`: `gerenciamento-pacientes`)
    4. Qual o tipo de dados da tabela (usaremos o *model* já criado: `PacienteModel`)
    5. Por último, informar qual pasta contém a nossa página, como estamos criando essa página diretamente em `src/app/views`, podemos
       deixar em branco e apertar `Enter`.

![Gerador 2](/img/tutorials/page-with-table/table2.png)

3. Feito isso, o gerador irá criar a página, o configurador da tabela e fazer as configurações necessárias. Teremos a seguinte estrutura de
   arquivos como resultado:

![Gerador 3](/img/tutorials/page-with-table/table3.png)

## CONFIGURANDO A TABELA

Vamos agora configurar a tabela de acordo com nossas necessidades. Para isso, vamos abrir o
arquivo `gerenciamento-pacientes.table-config.ts`. Esse é o código gerado automaticamente:

```ts title="/src/app/views/gerenciamento-pacientes/gerenciamento-pacientes.table-config.ts" showLineNumbers
// imports ...
export class GerenciamentoPacientesTableConfig extends BaseTableConfig<PacienteModel> {
    constructor(
        store: GerenciamentoPacientesStore
    ) {
        super();

        this._title = 'GerenciamentoPacientes';
        this._name = 'gerenciamento-pacientes';
        this._store = store;

        // TODO: todo o conteúdo abaixo é apenas um exemplo, mudar para atender aos seus requisitos.
        // this._canCreate já é verdadeiro por padrão.
        this._canDelete = true;
        this._canEdit = true;
        this._canView = true;
        this._columns = [
            new TableColumnModel({
                name: 'id', title: 'ID', width: '200px', canSort: true, canFilter: true
            }),
            new TableColumnModel({
                name: 'nome', title: 'Nome', canSort: true, canFilter: true
            }),
            new TableColumnModel({
                name: 'quantidade',
                title: 'Quantidade',
                canSort: true,
                canFilter: true,
                type: ColumnTypeEnum.CustomTemplate
            }),
            new TableColumnModel({
                name: 'preco',
                title: 'Custo unitário',
                canSort: true,
                canFilter: true,
                type: ColumnTypeEnum.Currency
            })
        ];
    }
}

```

Inicialmente vamos alterar o título da tabela e remover os comentários.

```ts
this._title = 'Gerenciamento de Pacientes';
```

Vamos também modificar as colunas para se adequarem ao nosso modelo de retorno de dados (`PacienteModel`):

```ts
this._columns = [
    new TableColumnModel({ name: 'id', title: 'ID', width: '120px', canSort: true, canFilter: true }),
    new TableColumnModel({ name: 'nome', title: 'Nome', canSort: true, canFilter: true }),
    new TableColumnModel({ name: 'situacao', title: 'Situação', canSort: true, canFilter: true }),
    new TableColumnModel({
        name: 'dataCadastro', title: 'Data de Cadastro', canSort: true, canFilter: true
    })
];
```

O campo `name` de `TableColumnModel` se refere ao nome da propriedade em nosso objeto (`PacienteModel`).

Não vamos alterar os tipos dos dados ainda. Vamos analisar primeiro o que cada propriedade nos permite fazer e depois voltamos para alterar
o que for necessário.

### CAMPOS DE `TableColumnModel`

(ver [doc](https://xdkresources.z13.web.core.windows.net/#/app/components?path=data-list%2Ftable%2Fmodels&v=2.0.7&item=TableColumnModel))

| Propriedade          | Descrição                                                                                                                                                                                                                                                                                                                                                                                                                                    |
|----------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| name                 | Nome do campo no objeto.                                                                                                                                                                                                                                                                                                                                                                                                                     |
| type                 | Tipo de dados da coluna (ver os tipos em [`ColumnTypeEnum`](https://xdkresources.z13.web.core.windows.net/#/app/components?path=data-list-controls%2Fcolumn%2Fmodels%2Fenums&v=2.0.7&item=ColumnTypeEnum)). <br/>**Valor padrão: ColumnTypeEnum. Text.**                                                                                                                                                                                      |
| dateTimeFormat       | Permite formatar a data/hora quando o campo for do tipo `ColumnTypeEnum.DateTime`.<br/>Aceita qualquer opção em [`DateTimeFormatEnum`](https://xdkresources.z13.web.core.windows.net/#/app/core?path=models%2Fenums&v=1.1.16&item=DateTimeFormatEnum) além de aceitar uma string com o padrão da data/hora personalizado. <br/>**Valor padrão: DateTimeFormatEnum. ShortDate.**                                                               |
| imageWidth           | Quando o campo for do tipo `ColumnTypeEnum.DateTime`, esse campo definirá a largura da imagem.                                                                                                                                                                                                                                                                                                                                               |
| imageHeight          | Quando o campo for do tipo `ColumnTypeEnum.DateTime`, esse campo definirá a altura da imagem.                                                                                                                                                                                                                                                                                                                                                |
| trueText             | Permite definir o valor que será exibido se o campo for do tipo `ColumnTypeEnum.Boolean` e seu valor for verdadeiro. <br/>**Valor padrão: Sim.**                                                                                                                                                                                                                                                                                             |
| falseText            | Permite definir o valor que será exibido se o campo for do tipo `ColumnTypeEnum.Boolean` e seu valor for falso. <br/>**Valor padrão: Não.**                                                                                                                                                                                                                                                                                                  |
| action               | Ação executada ao clicar na coluna. A função recebe como parâmetro os dados da linha clicada. <br/>**Uso:** `action: (data: MeuModel) => this.onClick(data)`                                                                                                                                                                                                                                                                                 |
| tooltipStaticText    | Texto fixo que é exibido ao passar o mouse em cima do campo.                                                                                                                                                                                                                                                                                                                                                                                 |
| tooltipTemplate      | Template do tooltip que é exibido ao passar o mouse em cima do campo. <br/>O template segue o padrao `[[NomeColuna1]] - [[NomeColuna2]]`.                                                                                                                                                                                                                                                                                                    |
| charLimit            | Limite de caracteres exibidos na coluna.                                                                                                                                                                                                                                                                                                                                                                                                     |
| shouldDisplayTooltip | Função que indica se a coluna exibirá ou não o texto de tooltip. A função recebe como parâmetro os dados da linha atual. <br/>**Uso:** `shouldDisplayTooltip: (data: MeuModel) => this.podeExibirTooltip(data)`                                                                                                                                                                                                                              |
| title                | Título da coluna.                                                                                                                                                                                                                                                                                                                                                                                                                            |
| alignment            | Alinhamento do texto na coluna. Aceita as opções em [`TextAlignmentEnum`](https://xdkresources.z13.web.core.windows.net/#/app/core?path=models%2Fenums&v=1.1.16&item=TextAlignmentEnum)                                                                                                                                                                                                                                                      |
| width                | Largura da coluna. <br/>Aceita:<br/> <ul><li>Percentuais (%): 50% - Caso a largura não seja definida para todas as colunas, as colunas sem definição terão seu percentual calculado automaticamente e igualmente.</li><li>Pixels (px): 250px</li><li>Tamanho GridSystem (ix-col-*): ix-col-3, ix-col-sm-3, etc</li><li>Números: 200 - Nesse caso o comportamento será o mesmo dos pixels.</li></ul>                                          |
| minWidth             | Largura mínima que a coluna deve possuir. O tamanho informado deve ser em pixels e ele será atribuído para a coluna quando o tamanho disponível na tela for menor que o especificado nessa propriedade.                                                                                                                                                                                                                                      |
| canSort              | Indica se a coluna pode ser utilizada para ordenar. Se habilitado, irá permitir ordenação pela coluna. <br/>**Valor padrão: False.**                                                                                                                                                                                                                                                                                                         |
| canFilter            | Indica se a coluna pode ser utilizada para filtrar. Caso `filterConfig` seja informado, não é necessário definir essa propriedade como verdadeira, ela já será por padrão. <br/>**Valor padrão: False.**                                                                                                                                                                                                                                     |
| filterSize           | Tamanho do campo de filtro exibido na tabela. O tamanho segue padrão GridSystem de colunas, começando em 1 e indo até 12. <br/>**Valor padrão: 3.**                                                                                                                                                                                                                                                                                          |
| filterOrder          | Posição na qual o campo será exibido no formulário de filtros. Se nenhuma posição for informada, a tabela irá ordenar conforme a ordem de criação de colunas.                                                                                                                                                                                                                                                                                |
| isFilterVisible      | Indica se o filtro será incluído no grupo visível de filtros da tabela. Por padrão, todo filtro é incluído no grupo de campos adicionais.                                                                                                                                                                                                                                                                                                    |
| filterConfig         | Configuração do filtro, se houver. Se for informado, não é necessário informar a propriedade `canFilter`. <br/>Ele permite customizar o comportamento do filtro adicional, como dizer quais opções devem ser removidas do dropdown e qual deve ser selecionada por padrão. (ver doc em [`TableFilterConfig`](https://xdkresources.z13.web.core.windows.net/#/app/components?path=data-list%2Ftable%2Fmodels&v=2.0.7&item=TableFilterConfig)) |
| customFilter         | Filtro personalizado, se houver. O valor deste campo deve ser uma referência a um componente que estende de [`BaseTableColumnFilter`](https://xdkresources.z13.web.core.windows.net/#/app/components?path=data-list%2Ftable%2Fmodels%2Fabstractions&v=2.0.7&item=BaseTableColumnFilter).<br/>Quando informado, a operação de filtrar para a coluna específica será realizada por esse filtro personalizado.                                  |
| isHidden             | Indica se a coluna será oculta na tabela. <br/>**Valor padrão: False.**                                                                                                                                                                                                                                                                                                                                                                      |

### CONFIGURANDO CAMPOS DO TIPO `DateTime`

Agora que já vimos todas as opções disponíveis em `TableColumnModel`, vamos voltar no nosso exemplo inicial e melhorar nossa estrutura de
colunas. O primeiro campo que vamos alterar é `dataCadastro`. Como o nome já indica, esse campo é uma data e vamos formatá-la de acordo.

Primeiro, vamos trocar o tipo de dados e depois formatar a data:

```ts
new TableColumnModel({
    name: 'dataCadastro',
    title: 'Data de Cadastro',
    canSort: true,
    canFilter: true,
    // highlight-start
    type: ColumnTypeEnum.DateTime
    // highlight-end
})
```

Como o formato padrão para campos do tipo `ColumnTypeEnum.DateTime` já é "dd/MM/yyyy", não precisaríamos mudar mais nada. Mas apenas para
visualizarmos outra opção, vamos colocar um formato onde o ano aparece com apenas 2 dígitos:

```ts
new TableColumnModel({
    name: 'dataCadastro',
    title: 'Data de Cadastro',
    canSort: true,
    canFilter: true,
    // highlight-start
    type: ColumnTypeEnum.DateTime,
    dateTimeFormat: 'dd/MM/yy'
    // highlight-end
})
```

Visto que a propriedade `dateTimeFormat` aceita uma string, podemos usar qualquer formato desejado, desde que aceito pelo angular.

### CONFIGURANDO CAMPOS PERSONALIZADOS

Mesmo que a XDK entregue muitas opções de tipos de colunas, existem casos que vão exigir uma personalização por parte do desenvolvedor.
Para esses casos, temos a opção das colunas personalizadas. Para personalizar uma coluna, são necessárias duas etapas: alterar o tipo e
criar o HTML/TS necessário. Vamos ver um exemplo para o campo `situacao`.

Primeiro, alteramos o tipo do campo na configuração da tabela para `ColumnTypeEnum.CustomTemplate`:

```ts title="/src/app/views/gerenciamento-pacientes/gerenciamento-pacientes.table-config.ts" showLineNumbers
new TableColumnModel({
    name: 'situacao',
    title: 'Situação',
    canSort: true,
    canFilter: true,
    // highlight-start
    type: ColumnTypeEnum.CustomTemplate
    // highlight-end
})

```

Depois, criamos o HTML personalizado (e se necessário, também o código TypeScript):

```html title="/src/app/views/gerenciamento-pacientes/gerenciamento-pacientes.component.html" showLineNumbers
<ix-table-card class="ix-mb-5" [config]="tableConfig">
   // highlight-start
   <ng-template ixCustomColumn="situacao" let-value="value">
        <div class="ix-d-flex ix-px-0 ix-flex-column">
            <span>{{getDescricaoSituacao(value)}}</span>
        </div>
    </ng-template>
   // highlight-end
</ix-table-card>
```

:::info
O `ng-template` da coluna personalizada aceita qualquer HTML, CSS e chamadas às funções TypeScript. Você pode montá-lo como desejar.
Funciona como um componente HTML normal.
:::

Na tabela, ou no nosso caso o card de tabela, adicionamos um `ng-template` e definimos a propriedade `ixCustomColumn` com o nome da
coluna personalizada que estamos configurando. Feito isso, adicionamos quaisquer customizações de HTML/CSS e, na linha 4, acessamos a
função no arquivo TypeScript que irá retornar a descrição do enumerador. A propriedade `value` contém o valor da coluna atual.

Como estamos usando colunas personalizadas, precisamos adicionar o módulo `ColumnModel` no nosso arquivo `views.module.ts`:

```ts title="/src/app/views/views.module.ts" showLineNumbers
// ...
@NgModule({
    imports: [
        CommonModule,
        LayoutsModule,
        // highlight-start
        ColumnModule
        // highlight-end
    ]
// ...

```

### FINALIZANDO A PÁGINA

Agora que nossa tabela já está pronta, vamos limpar o código removendo o que não iremos utilizar, inclusive os comentários adicionados pelo
gerador.

O primeiro passo é remover os comentários na configuração da tabela. Nosso arquivo final ficará assim:

```ts title="/src/app/views/gerenciamento-pacientes/gerenciamento-pacientes.table-config.ts" showLineNumbers
// imports...
@Injectable()
export class GerenciamentoPacientesTableConfig extends BaseTableConfig<PacienteModel> {
    constructor(
        store: GerenciamentoPacientesStore
    ) {
        super();

        this._title = 'Listagem de Pacientes';
        this._name = 'gerenciamento-pacientes';
        this._store = store;
        this._canDelete = true;
        this._canEdit = true;
        this._canView = true;
        this._columns = [
            new TableColumnModel({ name: 'id', title: 'ID', width: '200px', canSort: true, canFilter: true }),
            new TableColumnModel({ name: 'nome', title: 'Nome', canSort: true, canFilter: true }),
            new TableColumnModel({
                name: 'situacao',
                title: 'Situação',
                canSort: true,
                canFilter: true,
                type: ColumnTypeEnum.CustomTemplate
            }),
            new TableColumnModel({
                name: 'dataCadastro',
                title: 'Data de Cadastro',
                canSort: true,
                canFilter: true,
                type: ColumnTypeEnum.DateTime,
                dateTimeFormat: 'dd/MM/yy'
            })
        ];
    }
}
```

Depois, vamos remover os comentários e o que não formos usar do componente que contém nossa tabela. Em nosso caso, iremos utilizar o
*subheader*, mas não vamos usar o `ngOnInit`, então nosso código final ficará assim:

```ts title="/src/app/views/gerenciamento-pacientes/gerenciamento-pacientes.component.ts" showLineNumbers
// imports...
@Component({
    selector: 'app-gerenciamento-pacientes',
    templateUrl: './gerenciamento-pacientes.component.html',
    styleUrls: ['./gerenciamento-pacientes.component.scss'],
    providers: [
        GerenciamentoPacientesStore,
        GerenciamentoPacientesTableConfig
    ]
})
export class GerenciamentoPacientesComponent extends BasePageComponent implements AfterViewInit {
    constructor(
        public tableConfig: GerenciamentoPacientesTableConfig,
        layoutService: LayoutService
    ) {
        super(layoutService);
    }

    ngAfterViewInit(): void {
        this.setupSubheader('Listagem de Pacientes');
    }

    getDescricaoSituacao(situacao: SituacaoPacienteEnum): string {
        switch (situacao) {
            case SituacaoPacienteEnum.AguardandoAtivacao:
                return 'Aguardando ativação';
            case SituacaoPacienteEnum.Ativo:
                return 'Ativo';
            case SituacaoPacienteEnum.Desativado:
                return 'Desativado';
            default:
                return '';
        }
    }
}

```

### ADICIONANDO ROTA

Agora que a página está criada, vamos adicionar a rota pra ela no arquivo `app-routing.module.ts`:

```ts title="/src/app/app-routing.module.ts" showLineNumbers
// imports...
export const routes: Routes = [
    // outras rotas...
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
                    // highlight-start
                    {
                        path: 'pacientes',
                        component: GerenciamentoPacientesComponent,
                        data: {
                            showInMenu: true,
                            title: 'Gerenciamento de pacientes',
                            icon: 'fad fa-user-injured'
                        }
                    }
                    // highlight-end
                ]
                // outras rotas...
            }
        ]
    }
];
```

Nossa página irá ficar assim:

![Página com tabela](/img/tutorials/page-with-table/table4.png)
