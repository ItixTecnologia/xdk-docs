---
title: Rotas
slug: /app/structure/routes
---

## ESTRUTURA

As rotas na XDK usam o padrão Angular com algumas opções extras que são configuradas através do atributo `data` .
Para aplicar um layout a um conjunto de rotas, basta adicionar um item com `path` vazio e o componente de layout desejado. Os itens que
estiverem como filhos dele herdarão o mesmo layout:

```ts title="/src/app/app-routing.module.ts" showLineNumbers
import { DefaultLayoutComponent } from '@itix/components';

import { HomeComponent } from './views/home/home.component';

export const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'home' },

    {
        path: '',
        component: DefaultLayoutComponent,
        children: [
            {
                path: 'home',
                component: HomeComponent
            }
        ]
    }
];
```

No exemplo acima, `home` e todos seus irmãos e filhos herdarão do layout `DefaultLayoutComponent` .

### ATRIBUTO DATA

Para personalizar as rotas, você pode utilizar o atributo `data` e configurar conforme a necessidade. A estrutura completa desse atributo,
aceita pela XDK, é:

``` ts
data: {
    showChildrenInMenu: boolean,
    showInMenu: boolean,
    isSection: boolean,
    isGroup: boolean,
    title: string,
    breadcrumb: string,
    icon: string,
    allowedClaims: string[],
    isPrefix: boolean
}                
```

Explicação dos campos:

| Propriedade        | Descrição                                                                                                                                                                                                                                                                                                                |
|--------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| showChildrenInMenu | Se verdadeiro, irá incluir os filhos deste item no menu                                                                                                                                                                                                                                                                  |
| showInMenu         | Se verdadeiro, exibe o item atual no menu.                                                                                                                                                                                                                                                                               |
| isSection          | Se verdadeiro, exibe o item atual como uma seção (agrupamento geral) de itens no menu. Pode conter itens ou agrupamentos.                                                                                                                                                                                                |
| isGroup            | Se verdadeiro, exibe o item atual como um grupo de itens. Pode conter itens.                                                                                                                                                                                                                                             |
| title              | Título do item no menu.                                                                                                                                                                                                                                                                                                  |
| breadcrumb         | Título do item no breadcrumb.                                                                                                                                                                                                                                                                                            |
| icon               | Ícone do item no menu.                                                                                                                                                                                                                                                                                                   |
| allowedClaims      | Claims/Roles que o usuário precisa ter para acessar o item atual. Se ele tiver uma das claims/roles informadas na lista, ele poderá acessar a rota.                                                                                                                                                                      |
| isPrefix           | Se verdadeiro, verifica se o usuário tem alguma das claims/roles informadas como prefixo. Por exemplo, se informar `allowedClaims` com o valor `['empresa']` e marcar `isPrefix` como verdadeiro, se o usuário tiver as claims/roles "empresa.adicionar" ou "empresa.consultar", ele terá permissão para acessar o item. |

:::info
Os campos de tipo boolean só precisam ser informados se seu valor for verdadeiro. Caso contrário, assumimos que seu valor é falso.
:::

## GUARDS

Também é possível utilizar os guards que a XDK disponibiliza, `AuthGuard` e `OnlyLoggedUsersGuard` .

* `AuthGuard`: Faz a validação da permissão do usuário para a rota usando os campos `allowedClaims` e `isPrefix`.
* `OnlyLoggedUsersGuard`: Garante que o usuário esteja logado para acessar a rota.

## EXEMPLO DE UTILIZAÇÃO

```ts title="/src/app/app-routing.module.ts" showLineNumbers
export const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'home' },

    {
        path: '',
        component: DefaultLayoutComponent, // Usa o layout padrão.
        // Garante que apenas usuários logados tenha acesso à essa e às rotas filhas.
        canActivate: [OnlyLoggedUsersGuard],
        data: {
            showChildrenInMenu: true // Exibe os filhos no menu.
        },
        children: [
            {
                path: 'home',
                component: HomeComponent,
                data: {
                    showInMenu: true, // Exibe o item no menu
                    title: 'Home', // com o título "Home"
                    icon: 'fad fa-home' // e o ícone "fad fa-home".
                }
            },
            {
                path: '',
                data: {
                    isSection: true, // Exibe o item como uma seção
                    title: 'Cadastros', // com o título "Cadastros"
                    breadcrumb: 'Cadastros' // e exibe "Cadastros" no breadcrumb.
                },
                children: [
                    {
                        path: 'messages',
                        // Garante que apenas usuários com as permissões informadas terão acesso.
                        canActivate: [AuthGuard],
                        data: {
                            showInMenu: true, // Exibe o item no menu
                            title: 'Mensagens', // com o título "Mensagens"
                            breadcrumb: 'Mensagens', // exibe "Mensagens" no breadcrumb
                            icon: 'fad fa-comments-alt', // com o ícone "fad fa-comments-alt"
                            // apenas para os usuários com a(s) permissão(ões)
                            allowedClaims: ['mensagem'],
                            // e se o usuário tiver alguma como prefixo (mensagem.editar)
                            isPrefix: true
                        },
                        children: [
                            {
                                path: '',
                                component: MessagesComponent,
                                // Garante que apenas usuários com as permissões informadas
                                // terão acesso.
                                canActivate: [AuthGuard],
                                data: {
                                    // Exibe "Lista" no breadcrumb
                                    breadcrumb: 'Lista',
                                    // apenas para os usuários com a(s) permissão(ões).
                                    allowedClaims: ['mensagem.consultar']
                                }
                            },
                            {
                                path: 'add',
                                component: MessageFormComponent,
                                canActivate: [AuthGuard],
                                data: {
                                    breadcrumb: 'Novo',
                                    allowedClaims: ['mensagem.adicionar']
                                }
                            },
                            {
                                path: ':id',
                                component: MessageFormComponent,
                                canActivate: [AuthGuard],
                                data: {
                                    breadcrumb: 'Visualizar',
                                    allowedClaims: ['mensagem.visualizar']
                                }
                            },
                            {
                                path: ':id/edit',
                                component: MessageFormComponent,
                                canActivate: [AuthGuard],
                                data: {
                                    breadcrumb: 'Editar',
                                    allowedClaims: ['mensagem.editar']
                                }
                            }
                        ]
                    }
                ]
            }
        ]
    }
];
```

## LAYOUTS

Também é possível customizar o layout das rotas. A XDK fornece um conjunto pronto de layouts que podem ser utilizados. Veja mais na
página [Layouts](layouts.md)
