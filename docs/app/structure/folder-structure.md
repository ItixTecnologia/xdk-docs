---
title: Estrutura de Pastas
slug: /app/structure/folder-structure
---

A estrutura de pastas dos projetos que usam a XDK é a seguinte:

![Estrutura de pastas](/img/structure/folder_structure.png)

## 1 - Components

Nesta pasta devem ser adicionados componentes criados especificamente para o projeto atual. Aqui não devemos adicionar páginas usadas na
aplicação, apenas componentes e partes de telas que são utilizadas em mais de um lugar.

## 2 - Core

Utilitários gerais e arquivos de suporte.

### 2.a - Core/Utils

Contém os arquivos de suporte utilizados pelo projeto.

### 2.b - Core/Validators

Contém validadores utilizados nos formulários.

## 3 - Models

Armazena os modelos/classes utilizados pela aplicação. Inclui todos os modelos de dados, inclusive os utilizados em comunicações com APIs.

### 3.a - Models/Enums

O mesmo que Models, mas apenas para os enumeradores.

## 4 - Services

Armazena os providers da aplicação. Aqui podemos ter uma outra subpasta chamada storages para os storages (armazenamento no navegador, seja
localStorage ou sessionStorage) utilizados no projeto.

### 4.a - Services/Stores

Armazena os stores da aplicação.

## 5 - Views

Contém as páginas do projeto.
