---
title: Tema
slug: /app/customization/theme
---

O tema da aplicação pode ser personalizado em detalhes, desde as cores principais até o estilo dos componentes. Nesta seção vamos abordar
várias opções de como personalizar o tema da aplicação.

## TEMA PRINCIPAL

Para configurar o tema principal, precisamos alterar o arquivo `styles.scss`. Se você usou o gerador ou seguiu o processo de configuração de
projetos da XDK, seu arquivo deve estar parecido com o código a seguir:

```scss title="/src/styles.scss" showLineNumbers
@import "node_modules/@itix/components/themes/index";

$primary: #2850d1;
$secondary: #002087;

$theme: ix-light-theme($primary, $secondary);

@include ix-theme($theme);
```

Esse código irá gerar a seguinte visualização:

![Tema padrão](/img/customization/theme1.png)

Como nossa primeira alteração, queremos que as cores principais se adaptem ao projeto onde estamos trabalhando. Por exemplo, para
determinado projeto definimos as cores primárias e secúndarias como mostrar a seguir:


```scss title="/src/styles.scss" showLineNumbers
@import "node_modules/@itix/components/themes/index";

// highlight-start
$primary: #00995D;
$secondary: #73C947;
// highlight-end

$theme: ix-light-theme($primary, $secondary);

@include ix-theme($theme);
```

Essa alteração irá gerar a seguinte visualização:

![Tema padrão](/img/customization/theme2.png)

Como notado, as cores primárias e secundárias de toda a aplicação foram alteradas.
Não é necessário, mas se desejar, você também pode mudar as outras cores do estilo, são elas:

```scss
$success: #fff;
$danger: #fff;
$warning: #fff;
$info: #fff;
$light: #fff;
$dark: #fff;

$theme: ix-light-theme($primary, $secondary, $success, $danger, $warning, $info, $light, $dark);
```

:::info
Você pode alterar nenhuma ou quantas cores quiser.
:::
