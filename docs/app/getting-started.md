---
title: Instalando e Usando o Gerador (Projetos)
slug: /app/getting-started
---

:::tip DICA
Se desejar, pode conferir um projeto de exemplo [aqui](https://github.com/ItixTecnologia/xdk-front-angular-sample).
:::

O primeiro passo é instalar o gerador da XDK. Mesmo que o projeto já tenha sido criado, ele será útil para agilizar tarefas repetitivas,
como criação de telas comuns. Para instalar o gerador, precisamos ter o NodeJS instalado. Feito isso:

* Abrir um terminal da linha de comando
* Instalar o yeoman com o comando: `npm install -g yo`
* Instalar o gerador da XDK: `npm install -g generator-xdk`

Após esses passos, o gerador estará instalado e pronto para uso.

## CRIANDO UM NOVO PROJETO

Para criar um projeto precisamos executar o comando: `yo xdk:front --force`.

:::info
A opção `--force` deve ser usada para evitar confirmações constantes do sistema de arquivos pedindo permissão para fazer alterações.
:::

Uma série de perguntas será exibida. Em cada etapa você informa os dados desejados. Segue um exemplo de utilização:

1. Na primeira pergunta devemos informar o tipo do gerador a ser executado. Para nosso exemplo deixe selecionada a opção Projeto e
   aperte `Enter`.
    1. ![Gerador 1](/img/getting-started/img1.png)
2. Serão exibidas as versões do Node, NPM e Angular instaladas em seu sistema. Logo abaixo, uma opção para selecionar qual versão da XDK
   você gostaria de usar. Iremos deixar a opção mais recente disponível selecionada e apertar `Enter`.
    1. ![Gerador 1](/img/getting-started/img2.png)
3. Na próxima pergunta devemos informar o nome da aplicação sem usar acentos e/ou espaços. Deve-se usar apenas letras minúsculas, números e
   hifens. Para nosso exemplo iremos usar `gerenciamento-pacientes` e apertar `Enter`.
4. Feito isso, o gerador irá criar o projeto e fazer as configurações necessárias. Nosso projeto está pronto para uso!
