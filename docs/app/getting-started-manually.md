---
title: Preparando o Projeto (Sem gerador)
slug: /app/getting-started-manually
---

## Passo 1: Instalando as dependências

Para instalar a última versão dos pacotes da XDK no seu projeto, execute o comando:

``` shell
npm i @itix/core @itix/components
```

## Passo 2: Criando a estrutura do projeto

Dentro da pasta `src` do projeto, faça o seguinte:

* execute o comando `ng g m components` para criar o módulo e pasta `components`. Nesse módulo ficarão todos os componentes personalizados e exclusivos à essa aplicação.
* execute o comando `ng g m views` para criar o módulo e pasta `views`. Nesse módulo ficarão todos os componentes que são páginas da aplicação.
  + Eles devem seguir a seguinte estrutura:
    - Página simples: `ng g c my-page`. Irá gerar uma pasta `my-page` dentro de `views`.
    - Página com tabela e formulário: `ng g c my-table`. Irá criar a pasta `my-table` dentro de `views`. Depois, dentro de `my-table`, crie uma nova pasta chamada `form` e dentro dela execute o comando `ng g c --flat my-table-form`. Isso irá criar o componente `MyTableFormComponent` dentro da pasta `form` sem criar outra pasta. Devemos sempre usar essa estrutura para páginas com tabelas e formulários.
* crie uma pasta com o nome `core` e dentro dela crie uma pasta com o nome: `validators`.
  + `validators`: armazena os validadores personalizados da aplicação.
* crie uma pasta `models` e dentro dela uma pasta `enums`.
* na pasta `services`, crie as pastas `interceptors`,  `storages` e `stores`.
  + `interceptors`: armazena os arquivos que realizam tarefas de interceptação na aplicação.
  + `storages`: armazena os local e session storages da aplicação.
  + `stores`: armazena todas as stores da aplicação.

Um exemplo de uma estrutura completa se encontra na imagem abaixo:

![Estrutura de pastas](/img/folder_structure.png)

## Passo 3: Configurando a XDK

Abra o arquivo `app.module.ts` e configure a XDK:

``` ts
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IxCoreConfig, IxCoreModule, GuardsModule } from '@itix/core';
import { AuthModule } from '@itix/components';

import { AppRoutingModule, routes } from './app-routing.module';
import { ViewsModule } from './views/views.module';
import { ComponentsModule } from './components/components.module';
import { environment } from '../environments/environment';

const xdkConfig: IxCoreConfig = {
    baseUrl: environment.baseUrl, // URL base das requisições HTTP da aplicação cliente.
    applicationName: 'Nome da aplicação',
    routes, // Rotas da aplicação local.
    menu: {
        mainTitle: 'Título da aplicação',
        smallLogo: 'Base64 com a logo do menu principal quando contraído.',
        mainLogo: 'Base64 com a logo do menu principal',
        loggedOutBackground: 'Base64 com a imagem de fundo do background da tela de logout.'
    },
    security: {
        shouldUseAuthorizer: true, // Indica se deve utilizar um autorizador para fazer a autenticação.
        useIxOAuth: true // Indica se deve usar OAuth da ITIX para realizar a autenticação das requisições.
    }
};

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        AuthModule,
        IxCoreModule.forRoot(xdkConfig),
        GuardsModule,
        ComponentsModule,
        ViewsModule
    ],
    declarations: [AppComponent],
    bootstrap: [AppComponent]
})
export class AppModule { }

```

## Passo 4: Atualizando o app.component.html

Abra o arquivo `app.component.html` e deixe apenas o código abaixo:

``` html
<router-outlet></router-outlet>
```

## Passo 5: Exportando as rotas

Abra o arquivo `app-routing.module.ts` (ou equivalente) e confira se as rotas estão sendo exportadas:

``` ts
export const routes: Routes = [ 
    ...
];
```

## Passo 6: Adicionando componentes da XDK

Dentro do arquivo `views.module.ts` você pode adicionar os componentes da XDK que irá utilizar em suas páginas. Exemplo, para usar o botão, os layouts, a tabela e o breadcrumbs, usamos:

``` ts
import {
    ButtonModule,
    LayoutsModule,
    TableModule,
    BreadcrumbsModule
} from '@itix/components';

@NgModule({
    imports: [
        CommonModule,
        ButtonModule,
        LayoutsModule,
        TableModule,
        BreadcrumbsModule
    ],
    declarations: [
        MyComponent
    ],
    exports: [
        MyComponent
    ]
})
export class ViewsModule { }
```

## Passo 7: Adicionando estilos

Edite o arquivo `styles.scss` para incluir as seguintes informações e as configure de acordo com a necessidade do projeto:

```scss
@import "~@itix/components/themes/index";

$primary: #005786;
$secondary: $ix-grey-dark-1;

$theme: ix-light-theme($primary, $secondary);

@include ix-theme($theme);
```

É isso! A configuração inicial está pronta.
