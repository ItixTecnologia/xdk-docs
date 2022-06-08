---
title: Layout
slug: /app/customization/layout
---

O layout pode ser personalizado conforme a necessidade do projeto. Além dos layouts predefinidos exibidos
em [Layouts](../structure/layouts.md) você pode personalizar detalhes específicos de cada um deles. Vamos abordar alguns deles aqui.

## BOTÃO DE NOTIFICAÇÕES

O botão de notificações será exibido por padrão. Ele permite acessar a central de notificações do usuário. Se desejar remover esse botão,
basta atualizar a configuração da XDK no arquivo `app.module.ts` com a seguinte estrutura:

```ts title="/src/app/app.module.ts" showLineNumbers
const xdkConfig: IxCoreConfig = {
    baseUrl: environment.baseUrl,
    routes: routes,
    applicationName: 'gerenciamento-pacientes',
    // ...
    menu: {
        applicationsUrl: '',
        // ...
    },
    layout: {
        // highlight-start
        showNotificationsButton: false
        // highlight-end
    }
};
```

Com o botão habilitado:

![Notificações habilitadas](/img/customization/notf_button_before.png)

Após desabilitar o botão:

![Notificações desabilitadas](/img/customization/notf_button_after.png)

## BOTÃO DO USUÁRIO LOGADO

O botão com as informações do usuário logado será exibido por padrão. Ele permite acessar a central de notificações do usuário. Se desejar
remover esse botão, basta atualizar a configuração da XDK no arquivo `app.module.ts` com a seguinte estrutura:

:::caution Alerta
Se você remover o botão do usuário logado, o botão da central de notificações também será removido
:::

```ts title="/src/app/app.module.ts" showLineNumbers
const xdkConfig: IxCoreConfig = {
    baseUrl: environment.baseUrl,
    routes: routes,
    applicationName: 'gerenciamento-pacientes',
    // ...
    menu: {
        applicationsUrl: '',
        // ...
    },
    layout: {
        // highlight-start
        hideUserMenu: true
        // highlight-end
    }
};
```

Com o botão habilitado:

![Botão do usuário habilitado](/img/customization/user_button_before.png)

Após desabilitar o botão (note que o botão da central de notificações também desapareceu):

![Botão do usuário desabilitado](/img/customization/user_button_after.png)

## MENU LATERAL

### ESTADO INICIAL DO MENU

Se estiver usando um layout que tenha o menu lateral, é possível mudar o comportamento padrão dele e iniciar o menu no estado contraído.
Para isso, basta atualizar a configuração da XDK no arquivo `app.module.ts` com a seguinte estrutura:

:::caution Alerta
Se você remover o botão do usuário logado, o botão da central de notificações também será removido
:::

```ts title="/src/app/app.module.ts" showLineNumbers
const xdkConfig: IxCoreConfig = {
    baseUrl: environment.baseUrl,
    routes: routes,
    applicationName: 'gerenciamento-pacientes',
    // ...
    menu: {
        applicationsUrl: '',
        // highlight-start
        shouldStartExpanded: false,
        // highlight-end
        // ...
    }
};
```

Com o menu aberto:

![Menu aberto](/img/customization/menu_opened.png)

Com o menu contraído:

![Menu contraído](/img/customization/menu_closed.png)

### TEXTO DA APLICAÇÃO NO MENU

Podemos alterar o texto da aplicação que aparece no menu. Para isso, devemos alterar o arquivo `app.module.ts` da seguinte maneira:

```ts title="/src/app/app.module.ts" showLineNumbers
const xdkConfig: IxCoreConfig = {
    baseUrl: environment.baseUrl,
    routes: routes,
    applicationName: 'gerenciamento-pacientes',
    // ...
    menu: {
        applicationsUrl: '',
        // highlight-start
        mainTitle: 'Gerenciamento de Pacientes',
        mainLogo: '', // Removendo logo padrão.
        // highlight-end
        // ...
    }
};
```

:::info
Além de alterar o título da aplicação no menu, também removemos o logo padrão no código acima.
:::

Menu com título padrão:

![Título padrão](/img/customization/logo_default.png)

Título personalizado:

![Título personalizado](/img/customization/no_logo.png)

### LOGO DA APLICAÇÃO NO MENU

Podemos alterar o logo da aplicação que aparece no menu nos dois estados, aberto e contraído. Para isso, precisamos das imagens no padrão
`Base64`. Em posse delas, podemos alterar o arquivo `app.module.ts` da seguinte maneira:

```ts title="/src/app/app.module.ts" showLineNumbers
const xdkConfig: IxCoreConfig = {
    baseUrl: environment.baseUrl,
    routes: routes,
    applicationName: 'gerenciamento-pacientes',
    // ...
    menu: {
        applicationsUrl: '',
        // highlight-start
        mainLogo: 'imagemBase64',
        smallLogo: 'imagemBase64',
        // highlight-end
        // ...
    }
};
```

:::info
`mainLogo` é o logo exibido no estado aberto do menu. Quando o menu está contraído, a imagem em `smallLogo` será exibida no lugar.
:::

Com as imagens da XDK:

![Imagens menu padrão](/img/customization/logo_default.png)

Com imagens personalizadas:

![Imagens personalizadas no menu](/img/customization/logo_custom.png)

:::tip Dica
Para evitar deixar o arquivo `app.module.ts` muito grande, crie um arquivo `typescript` apenas para armazenar suas imagens `Base64` em
variáveis e referencie apenas essas variáveis no arquivo `app.module.ts`.
:::
