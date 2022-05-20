---
title: Layouts
slug: /app/structure/layouts
---

A XDK disponibiliza alguns layouts prontos para as aplicações. São eles:

:::info
Usamos a mesma tela em todos os exemplos para facilitar a identificação das diferenças entre os layouts.
:::

## DefaultLayoutComponent

Layout padrão da XDK. Conta com uma barra superior com informações sobre o título da página, ações de login, etc. Também tem um menu lateral
e pode exibir um rodapé, se configurado.

Utilização:

```ts title="/src/app/app-routing.module.ts" showLineNumbers
import { DefaultLayoutComponent } from '@itix/components';

export const routes: Routes = [
    // ...
    {
        path: '',
        component: DefaultLayoutComponent,
        children: [
            // Todos os itens aqui terão o layout aplicado.
        ]
    }
    // ...
]
```

Resultado:

![Estrutura de pastas](/img/structure/default_layout.png)

## SideMenuLayoutComponent

Layout com um menu lateral que também tem informações sobre o título da página, ações de login, etc e pode exibir um rodapé, se configurado.

Utilização:

```ts title="/src/app/app-routing.module.ts" showLineNumbers
import { SideMenuLayoutComponent } from '@itix/components';

export const routes: Routes = [
    // ...
    {
        path: '',
        component: SideMenuLayoutComponent,
        children: [
            // Todos os itens aqui terão o layout aplicado.
        ]
    }
    // ...
]
```

Resultado:

![Estrutura de pastas](/img/structure/side_menu_layout.png)

## BlankLayoutComponent

Layout sem componentes adicionais.

Utilização:

```ts title="/src/app/app-routing.module.ts" showLineNumbers
import { BlankLayoutComponent } from '@itix/components';

export const routes: Routes = [
    // ...
    {
        path: '',
        component: BlankLayoutComponent,
        children: [
            // Todos os itens aqui terão o layout aplicado.
        ]
    }
    // ...
]
```

Resultado:

![Estrutura de pastas](/img/structure/blank_layout.png)
