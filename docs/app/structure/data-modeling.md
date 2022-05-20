---
title: Modelagem de Dados
slug: /app/structure/data-modeling
---

Sempre que precisarmos criar uma classe (comunicação com APIs, comunicação entre componentes, etc), devemos adicioná-la na pasta `models`.
As classes que representam comunicação com APIs devem sempre herdar de `BaseModel` (para as classes comuns) ou `BaseEntityModel` (para as
classes que representam uma entidade **E** tem o parâmetro ID). As outras classes não precisam herdar de nenhuma classe. Os enumeradores
utilizados no projeto também devem ficar nesta pasta, mas dentro da subpasta `enums`.

### Exemplo

Tendo uma API `gerenciamento-pacientes/obter-paciente/{id}` com o seguinte retorno:

```json showLineNumbers
{
    "id": "a0694733-3d43-482e-a684-9008ff29115e",
    "nome": "João da Silva",
    "situacao": 1,
    "dataCadastro": "2021-05-03"
}
```

Criamos primeiro o enumerador `SituacaoPacienteEnum` dentro da pasta `enums` com a estrutura:

```ts title="/src/app/models/enums/situacao-paciente.enum.ts" showLineNumbers
export enum SituacaoPacienteEnum {
    Ativo = 0,
    AguardandoAtivacao = 1,
    Desativado = 2
}
```

Depois, criamos o modelo `PacienteModel` na pasta `models`, com a seguinte estrutura:

```ts title="/src/app/models/paciente.model.ts" showLineNumbers
import { BaseEntityModel } from '@itix/core';

import { SituacaoPacienteEnum } from './enums/situacao-paciente.enum';

export class PacienteModel extends BaseEntityModel {
    nome: string;
    situacao: SituacaoPacienteEnum;
    dataCadastro: Date;
}
```
