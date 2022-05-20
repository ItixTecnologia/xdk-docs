---
title: Stores
slug: /app/structure/stores
---

Um store é um meio de comunicação do projeto com APIs.

:::warning
Todas as requisições HTTP **_<ins>DEVEM</ins>_** ser feitas usando `stores`.
:::

:::info
Se você acredita que tem um motivo válido para não usar um `store` na sua requisição, favor comunicar a equipe da XDK para avaliação.
:::

## CRIANDO UM STORE

Um `store` é um *provider*. Para gerar um, temos duas opções muito simples:

1. Criar manualmente uma classe que tenha a anotação `@Injectable()`
2. Usar o gerador da XDK

### 1 - CRIANDO MANUALMENTE

Na pasta `src/app/services/store`, crie um arquivo com o nome `gerenciamento-pacientes.store.ts` e cole o seguinte código nele:

```ts title="/src/app/services/store/gerenciamento-pacientes.store.ts" showLineNumbers
import { Injectable } from '@angular/core';
import { BaseEntityStore, RequestService, StoreConfig } from '@itix/core';

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
}
```

### 2 - USANDO O GERADOR DA XDK

Abra um terminal e execute o comando `yo xdk:front --force`

1. Selecione a opção Store.
2. Informe o nome do store, que no nosso caso será gerenciamento-pacientes.
3. Selecione o tipo do store (mais informações nas seções abaixo), no nosso caso selecionamos CRUD.
4. Informe a URL base do store (normalmente será o endereço do controller), usamos gerenciamento-pacientes.
5. Informe o tipo de dados utilizado pelo store, no nosso caso será PacienteModel.

![Execução](/img/structure/store_usage.png)

Feito isso, um arquivo, com o mesmo código exibido anteriormente, será gerado na pasta `src/app/services/stores`.

## StoreConfig
([ver documentação detalhada](https://xdkresources.z13.web.core.windows.net/#/app/core?path=models&v=1.1.16&item=StoreConfig))

Independente do tipo de `store` selecionado, todos recebem um `StoreConfig` como parâmetro no construtor. Esta propriedade tem o objetivo de
configurar o `store`. As opções disponíveis são:

| Propriedade                                                                                                                | Descrição                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
|----------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| listKeyProperty                                                                                                            | Nome da propriedade que contém o valor usado como chave do item da lista. <br/>**Obs.: Utilizado apenas para listas estáticas (locais).**                                                                                                                                                                                                                                                                                                                                                                                                                            |
| listValueProperty                                                                                                          | Nome da propriedade que contém o valor usado como descrição do item da lista. Essa propriedade pode receber um template no padrão:<br/> `{{[[nomeCampo1]], siga para [[nomeCampo2]]}}`<br/><ul><li>`{{`: inicia o template</li><li>`}}`: finaliza o template</li><li>`[[`: inicia a tag com o nome do campo do objeto</li><li>`]]`: finaliza a tag com o nome do campo do objeto</li></ul> <br/>**Obs.: Utilizado apenas para listas estáticas (locais).**                                                                                                           |
| requestService                                                                                                             | Serviço de requisições. <br/>**Obs.: No caso de dados estáticos (locais), não deve ser preenchido.**                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| items                                                                                                                      | Items estáticos (locais). <br/>**Obs.: Se for preenchido, todas as requisições serão feitas a esse vetor.**                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| baseUrl                                                                                                                    | URL base. No caso padrão será o nome do `controller`.<br/>Ex: Para o controle `UsuariosController` na rota `/api/usuarios/...` deverá ser informado o valor "usuarios". <br/>Também pode ser informada uma URL completa (absoluta) para casos especiais. Neste caso, a URL configurada como base da aplicação será ignorada e para as requisições deste `store`, somente a URL informada aqui será utilizada. <br/>**Obs.: Quando for utilizar como URL absoluta, é obrigatório iniciar com o protocolo, exemplo:** `https://servidor-externo.com/api-enderecos/cep` |
| actions ([ver doc](https://xdkresources.z13.web.core.windows.net/#/app/core?path=models&v=1.1.16&item=StoreActionsConfig)) | Permite configurar os nomes das ações utilizadas pelos `stores` de listagem, pesquisa e CRUD, caso não sigam o padrão. Por exemplo, se a listagem na sua aplicação não usa o *endpoint* `list`, basta informar o *endpoint* correto nessa propriedade.                                                                                                                                                                                                                                                                                                               |

## RequestService
([ver documentação detalhada](https://xdkresources.z13.web.core.windows.net/#/app/core?path=services&v=1.1.16&item=RequestService))

O `RequestService` é o serviço responsável por realizar requisições HTTP. Como já mencionado, todas as requisições HTTP devem ser feitas usando `stores` e eles utilizam o `RequestService` para realizar essas requisições. Os métodos disponíveis são (todos os métodos recebem como parâmetro um objeto do tipo `RequestModel`):

| Método                                 | Descrição                                                                                                                                                                                 |
|----------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| makeGet&lt;TModel&gt;                  | Realiza uma requisição HTTP do tipo GET. <br/>**Tipo de retorno: Observable&lt;TModel&gt;**                                                                                               |
| makePost&lt;TModel&gt;                 | Realiza uma requisição HTTP do tipo POST. <br/>**Tipo de retorno: Observable&lt;TModel&gt;**                                                                                              |
| makePut&lt;TModel&gt;                  | Realiza uma requisição HTTP do tipo PUT. <br/>**Tipo de retorno: Observable&lt;TModel&gt;**                                                                                               |
| makeDelete                             | Realiza uma requisição HTTP do tipo Delete. <br/>**Tipo de retorno: Observable&lt;boolean&gt;**                                                                                           |
| makeFilePost&lt;TModel&gt;             | Realiza uma requisição HTTP do tipo POST com um arquivo enviado no corpo. <br/>**Tipo de retorno: Observable&lt;TModel&gt;**                                                              |
| makeFilePostWithProgress&lt;TModel&gt; | Realiza uma requisição HTTP do tipo POST com um arquivo enviado no corpo e faz o rastreamento do progresso do upload. <br/>**Tipo de retorno: Observable&lt;HttpEvent&lt;TModel&gt;&gt;** |
| makeFilePut&lt;TModel&gt;              | Realiza uma requisição HTTP do tipo PUT com um arquivo enviado no corpo. <br/>**Tipo de retorno: Observable&lt;TModel&gt;**                                                               |

## RequestModel
([ver documentação detalhada](https://xdkresources.z13.web.core.windows.net/#/app/core?path=models&v=1.1.16&item=RequestModel))

O `RequestModel` é a configuração da requisição. Ele é responsável por definir como a requisição será realizada e quais dados ela irá conter. A única propriedade obrigatória é a URL, mas ele permite uma configuração bem detalhada. Veja as opções disponíveis a seguir:

| Propriedade  | Descrição                                                                                                                                                                                                                                                                                                                        |
|--------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| url          | URL da requisição.                                                                                                                                                                                                                                                                                                               |
| id           | Identificador do registro, se houver.                                                                                                                                                                                                                                                                                            |
| version      | Versão da API, se houver.                                                                                                                                                                                                                                                                                                        |
| data         | Objeto a ser enviado no corpo (body) da requisição.                                                                                                                                                                                                                                                                              |
| isBase       | Indica se é uma URL base. Se for verdadeira, ignora o "/api/" na montagem da URL. <br/>**Valor padrão: Falso.**                                                                                                                                                                                                                  |
| isAbsolute   | Indica se é uma URL absoluta. Se for verdadeira, faz a requisição para somente para a URL informada em `url`, sem levar em conta nenhuma outra regra externa. <br/>**Valor padrão: Falso.**                                                                                                                                      |
| contentType  | Tipo do conteúdo sendo enviado no corpo (body). <br/>**Valor padrão: ContentTypeEnum.ApplicationJson ([ver doc](https://xdkresources.z13.web.core.windows.net/#/app/core?path=models%2Fenums&v=1.1.16&item=ContentTypeEnum))**                                                                                                   |
| responseType | Tipo do conteúdo a ser recebido. ([ver doc](https://xdkresources.z13.web.core.windows.net/#/app/core?path=models%2Fenums&v=1.1.16&item=ContentTypeEnum))                                                                                                                                                                         |
| params       | Parâmetros de URL, se houver. Aqui você pode informar todos os parâmetros que desejar enviar pela URL como *QueryString*.                                                                                                                                                                                                        |
| headers      | Itens a serem enviados no cabeçalho da requisição.                                                                                                                                                                                                                                                                               |
| isDataReady  | Indica se os dados (`data`) estão prontos ou precisam ser convertidos. Utilizada apenas para envio de arquivos. Quando verdadeira, a XDK não irá converter o objeto em `data` para ser um `form-url-encoded`. A XDK irá assumir que você está enviando no formato que precisa receber no servidor. <br/>**Valor padrão: Falso.** |

## TIPOS DE STORE

Agora que já entendemos como funcionam o `StoreConfig`, o `RequestModel` e o `RequestService`, podemos analisar os tipos de `stores`. Os `stores` estão divididos em quatro grupos, são eles:

### 1 - BaseStore
([ver documentação detalhada](https://xdkresources.z13.web.core.windows.net/#/app/core?path=abstractions&v=1.1.16&item=BaseStore))

Fornece as funções necessárias para o funcionamento básico.

Utilização:

```ts
export class ConsultaCepStore extends BaseStore<CepModel> { }
```

:::info
`CepModel` no exemplo acima deve herdar de `BaseModel` ou `BaseEntityModel`.
:::

Além da estrutura básica de funcionamento, disponibiliza dois métodos para auxiliar a criação de requisições, `getUrl` e `getRequestModel`.

#### 1.a - getUrl

Monta uma URL adicionando as ações (*actions*) informadas em conjunto com a URL base e extensões, como `/api` e `/v[x]`, se houver. No exemplo abaixo, criamos uma requisição para obter um paciente pelo seu identificador:

```ts showLineNumbers
this._config.requestService.makeGet<PacienteModel>(new RequestModel({
    url: this.getUrl(''),
    id: pacienteId
}));
```

Esse código irá gerar a seguinte requisição (assumindo que estamos no `store` com `baseController`: "gerenciamento-pacientes"):

```
GET https://minha_url_base/api/gerenciamento-pacientes/{id}
```

Se nosso endpoint fosse diferente, como:

```
GET https://minha_url_base/api/gerenciamento-pacientes/obter/{id}
```

Só precisaríamos alterar o `getUrl` para a seguinte forma:

```ts showLineNumbers
this._config.requestService.makeGet<PacienteModel>(new RequestModel({
    url: this.getUrl('obter'),
    id: pacienteId
}));
```

#### 1.b - getRequestModel

Utilitário para facilitar a criação de um `RequestModel` com base em dados pré-estabelecidos. Por exemplo, a mesma requisição acima pode ser reescrita de uma maneira mais simples:

```ts showLineNumbers
this._config.requestService.makeGet<PacienteModel>(
    this.getRequestModel(`obter/${pacienteId}`)
);
```

Também é possível preencher a propriedade data passando os dados no segundo parâmetro da função:

```ts showLineNumbers
this._config.requestService.makePost<PacienteModel>(
    this.getRequestModel('salvar', dadosDoPaciente)
);
```

### 2 - BaseListStore
([ver documentação detalhada](https://xdkresources.z13.web.core.windows.net/#/app/core?path=abstractions&v=1.1.16&item=BaseListStore))

Herda de `BaseStore` e além do que é fornecido pelo `BaseStore`, entrega as funcionalidades de listagem. Essas funcionalidades são, geralmente, utilizadas em *selects* e formulários que contém *selects*, mas podem ser utilizadas em qualquer local para obter a lista de registros.

Utilização:

```ts
export class ConsultaCepStore extends BaseListStore<CepModel> { }
```

:::info
`CepModel` no exemplo acima deve herdar de `BaseModel` ou `BaseEntityModel`.
:::

Os métodos entregues pelo `store` são (o `TModel` exemplificado abaixo é o mesmo tipo de dados informado na criação da classe, no `store` do exemplo acima seria `CepModel`):

| Método   | Descrição                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
|----------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| list     | Retorna uma lista de itens.<br/>O método recebe como parâmetro um objeto do tipo `SearchRequestModel` ([ver doc](https://xdkresources.z13.web.core.windows.net/#/app/core?path=models%2Fsearch&v=1.1.16&item=SearchRequestModel)) que é usado para enviar os dados de pesquisa e paginação para o servidor. <br/>**Tipo de retorno: Observable&lt;SearchResponseModel&lt;TModel&gt;&gt; ([ver doc](https://xdkresources.z13.web.core.windows.net/#/app/core?path=models%2Fsearch&v=1.1.16&item=SearchResponseModel))** |
| getByIds | Retorna uma lista de itens com base nos IDs informados.<br/>O método recebe como parâmetro um vetor de IDs. <br/>**Tipo de retorno: Observable<TModel[]>**                                                                                                                                                                                                                                                                                                                                                             |

### 3 - BaseSearchStore
([ver documentação detalhada](https://xdkresources.z13.web.core.windows.net/#/app/core?path=abstractions&v=1.1.16&item=BaseSearchStore))

Herda de `BaseListStore` e além do que é fornecido pelo `BaseStore` e `BaseListStore`, entrega as funcionalidades de pesquisa. Essas funcionalidades são, geralmente, utilizadas em `tables`, mas podem ser utilizadas em qualquer local para fazer uma consulta de registros.

Utilização:

```ts
export class PacientesStore extends BaseSearchStore<PacienteModel> { }
```

:::info
`PacienteModel` no exemplo acima deve herdar de `BaseModel` ou `BaseEntityModel`.
:::

Os métodos entregues pelo `store` são (o `TModel` exemplificado abaixo é o mesmo tipo de dados informado na criação da classe, no `store` do exemplo acima seria `PacienteModel`):

| Método      | Descrição                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
|-------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| search      | Pesquisa nos registros usando os termos/filtros informados.<br/>O método recebe como parâmetro um objeto do tipo `SearchRequestModel` ([ver doc](https://xdkresources.z13.web.core.windows.net/#/app/core?path=models%2Fsearch&v=1.1.16&item=SearchRequestModel)) que é usado para enviar os dados de pesquisa e paginação para o servidor. <br/>**Tipo de retorno: Observable&lt;SearchResponseModel&lt;TModel&gt;&gt; ([ver doc](https://xdkresources.z13.web.core.windows.net/#/app/core?path=models%2Fsearch&v=1.1.16&item=SearchResponseModel))**                                                                                                   |
| getCsv      | Pesquisa nos registros usando os termos/filtros informados e retorna o resultado como um arquivo CSV.<br/><br/><blockquote>A implementação da geração do CSV deve ser feita no servidor, na aplicação só é feito o tratamento do arquivo.</blockquote>O método recebe como parâmetro um objeto do tipo `SearchRequestModel` ([ver doc](https://xdkresources.z13.web.core.windows.net/#/app/core?path=models%2Fsearch&v=1.1.16&item=SearchRequestModel)) que é usado para enviar os dados de pesquisa e paginação para o servidor e um vetor de parâmetros de URL, se houver (ver `RequestModel.params`). <br/>**Tipo de retorno: Observable&lt;any&gt;** |
| downloadCsv | Baixa o arquivo CSV no navegador do usuário.<br/>O método recebe como parâmetro o nome do arquivo e se deve abrir ou não em um popup, além dos parâmetros em `getCsv`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |

### 4 - BaseEntityStore
([ver documentação detalhada](https://xdkresources.z13.web.core.windows.net/#/app/core?path=abstractions&v=1.1.16&item=BaseEntityStore))

Herda de `BaseSearchStore` e além do que é fornecido pelo `BaseStore`, `BaseListStore` e `BaseSearchStore`, entrega as funcionalidades de CRUD. Essas funcionalidades são, geralmente, utilizadas em formulários.

Utilização:

```ts
export class PacientesStore extends BaseEntityStore<PacienteModel> { }
```

:::caution Importante
`PacienteModel` no exemplo acima deve _**<ins>SEMPRE</ins>**_ herdar de `BaseEntityModel`.
:::

Os métodos entregues pelo `store` são (o `TModel` exemplificado abaixo é o mesmo tipo de dados informado na criação da classe, no `store` do exemplo acima seria `PacienteModel`):

| Método     | Descrição                                                                                                                                                                             |
|------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| get        | Obtém um registro pelo identificador informado. Se o registro não existir, retorna `undefined`. <br/>**Tipo de retorno: Observable&lt;OptionalType&lt;TModel&gt;&gt;**                |
| add        | Cria um novo registro usando os dados informados. <br/>**Tipo de retorno: Observable&lt;TModel&gt;**                                                                                  |
| edit       | Atualiza os dados do registro usando os dados informados. Também espera receber uma lista com as propriedades que foram alteradas. <br/>**Tipo de retorno: Observable&lt;TModel&gt;** |
| remove     | Exclui o registro com o identificador informado. <br/>**Tipo de retorno: Observable&lt;boolean&gt;**                                                                                  |
| removeMany | Exclui os registros com os identificadores informados. <br/>**Tipo de retorno: Observable<boolean[]>**                                                                                |
