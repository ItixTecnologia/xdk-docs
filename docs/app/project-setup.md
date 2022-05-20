---
title: Configurando o Projeto
slug: /app/project-setup
---

Para configurar o projeto corretamente, precisamos completar as etapas a seguir:

## 1 - TÍTULO DA APLICAÇÃO

Na pasta `src` abra o arquivo `index.html` e troque o título (no caso de nosso exemplo iremos trocar de `gerenciamento-pacientes` para
`Gerenciamento de Pacientes`):

```html title="index.html"
<title>Gerenciamento de Pacientes</title>
```

## 2 - ARQUIVOS DE CONFIGURAÇÃO DE AMBIENTES (ENVIRONMENTS)

Na pasta `src/environments` abra o arquivo `environment.ts` e troque a URL da propriedade `baseUrl` para a URL do seu servidor de
desenvolvimento local. Confira se a porta está correta.

Abra agora o arquivo `environment.prod.ts` e troque a URL da propriedade `baseUrl` para a URL do seu servidor de produção.

### 2.a - ADICIONANDO NOVOS AMBIENTES

Na pasta `src/environments` você pode adicionar novos arquivos `environment.[ENV].ts`, onde `[ENV]` é o ambiente desejado. Para cada novo
arquivo, lembre-se de copiar o conteúdo de um já existente e alterar as propriedades para representarem o ambiente desejado. Além disso, é
necessário adicionar o novo ambiente no arquivo `angular.json`. Para demonstrar isso, iremos usar um novo ambiente com o nome `hml`:

Após criar o arquivo `environments.hml.ts`, precisamos abrir o arquivo `angular.json` e adicionar uma nova entrada em `projects ->
gerenciamento-pacientes -> architect -> build -> configurations` (onde `gerenciamento-pacientes` é o nome do seu projeto) com o nome `hml`.
Ficaria assim (**a parte adicionada está destacada**):

```jsonp title="angular.json" showLineNumbers
{
    "configurations": {
        "production": {
            "budgets": [
                {
                    "type": "initial",
                    "maximumWarning": "500kb",
                    "maximumError": "1mb"
                },
                {
                    "type": "anyComponentStyle",
                    "maximumWarning": "2kb",
                    "maximumError": "4kb"
                }
            ],
            "fileReplacements": [
                {
                    "replace": "src/environments/environment.ts",
                    "with": "src/environments/environment.prod.ts"
                }
            ],
            "outputHashing": "all"
        },
        // highlight-start
        "hml": {
            // Outras configurações que desejar alterar para esse ambiente.
            ...,
            "fileReplacements": [
                {
                    "replace": "src/environments/environment.ts",
                    "with": "src/environments/environment.hml.ts"
                }
            ],
            "outputHashing": "all"
        },
        // highlight-end
        "development": {
            "buildOptimizer": false,
            "optimization": false,
            "vendorChunk": true,
            "extractLicenses": false,
            "sourceMap": true,
            "namedChunks": true
        }
    }
}
```

Feito isso, precisamos criar scripts para esse novo ambiente. No arquivo `package.json` vamos adicionar a seguinte entrada em `scripts`:

```json title="package.json"
"build:hml": "ng build --configuration hml"
```

Assim, sempre que o comando `npm run build:hml` for executado, a configuração `hml` será utilizada.
