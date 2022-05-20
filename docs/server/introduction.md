---
title: Introdução
slug: /server/introduction
---

A XDK visa facilitar e padronizar a criação de projetos seguindo o padrão DDD (Domain-Driven Design) como descrito por Eric Evans em seu livro de 2003.

Algumas liberdades foram tomadas (como a não utilização da regra de usar Application/Domain Services como CRUDs, entre outras), mas a estrutura geral permanece a proposta. Por exemplo, seguindo conceitos mais modernos abordados por Scott Millett e Nick Tune, não usamos a camada Infrastructure para tratar a persistência, em vez disso usamos uma camada específica que só deve ser acessada pela camada Domain. Seguindo essa estrutura, temos as cinco principais camadas do DDD (adaptado/moderno):

- Interface de Usuário: parte responsável pela exibição de informações do sistema ao usuário e também por interpretar comandos do usuário
- Aplicação: essa camada não possui lógica de negócio. Ela é apenas uma camada fina, responsável por conectar a Interface de Usuário às camadas inferiores
    - Caso você precise realizar qualquer lógica que não seja de negócio (ex: alguma formatação específica), pode-se fazer nessa camada.
- Domínio: representa os conceitos, regras e lógicas de negócio. Todo o foco de DDD está nessa camada.
- Persistência: persistência de dados, conexões com bancos de dados
- Infra-estrutura: fornece recursos técnicos que darão suporte às camadas superiores. São normalmente as partes de um sistema responsáveis pelo envio de mensagens por redes, gravação e leitura de discos, etc.

Pensando nesses cinco príncipios (camadas), todos os projetos gerados pela XDK terão a estrutura:
- SeuProjeto.UserInterface
    - Inicialmente serão controles pensando na comunicação REST, mas pode ser qualquer camada de comunicação com o usuário (ex: projetos MVVM, WinForms, etc).
    - OBS: Visto que nos projetos mais comuns essa camada se refere à API (Controllers), esses projetos, normalmente, não terão nenhuma lógica, apenas chamadas aos `AppServices`. Mas nos casos onde essa camada for "realmente" a exibição final ao usuário (MVC - páginas, MVVM - View, etc) ela deverá, obviamente, conter toda a lógica de interação com o usuário. (realmente está entre aspas aqui, porque no caso do projeto API a exibição final é lá também, já que o usuário da API é quem consome ela, não necessariamente seria o usuário do sistema que vê a tela/página web)
- SeuProjeto.Application
    - Armazena todos os `AppServices`. Como explicado acima, deveria ser apenas a comunicação com os `DomainServices`, mas caso necessário, podem ter pequenas lógicas que não sejam de negócio.
- SeuProjeto.Domain
    - Armazena todos os `DomainServices` com suas regras de negócios, assim como `Specifications` e `Validators`. Todas as regras de negócio devem estar no `DomainService` específico de sua entidade, se houver, ou em um genérico que herda de `BaseDomainService`
    - *OBS: Nenhuma regra de negócio deve estar fora dessa camada.*
- SeuProjeto.Persistence
    - Contextos, entidades, repositórios, mappers de entidades, etc.
- SeuProjeto.Infrastructure
    - SMS, E-mail, classes utilitárias, etc.
- SeuProjeto.Models
    - Classes de retorno utilizadas na aplicação.
    - Na raiz, guardamos todas as classes que servem tanto para entrada quanto retorno de dados (sufixo Model)
    - Na pasta Inputs, guardamos todas as classes de entrada de dados (sufixo Input)
    - Na pasta Responses, guardamos todas as classes de retorno de dados (sufixo Response)

Você pode ficar à vontade para adicionar mais camadas para deixar seu projeto mais organizado, de acordo com suas necessidades. Mas essas camadas não devem substituir as atuais, devem ser apenas camadas/projetos auxiliares à elas.
- Por exemplo, eu posso criar dentro do projeto `SeuProjeto.Infrastructure` um serviço de envio de e-mails, mas, pensando em deixar genérico, crio apenas a estrutura de comunicação dentro dela e a implementação, que irá utilizar um serviço externo, como o SendGrid, em um novo projeto chamado `SeuProjeto.Infrastructure.Integrations`. E dentro desse projeto crio uma pasta para a integração com o SendGrid. Essa integração é então usada no projeto `SeuProjeto.Infrastructure`.

Escolhemos não adotar alguns itens especificados pelo padrão, como o Factories/Aggregates para entidades (apesar de que você pode fazer sua implementação), visto que fornecemos um domain service bem robusto que pode se comunicar com outros domain services, tornando esse padrão irrelevante para nosso caso.
Outro ponto aceito pelo padrão e rejeitado por esse projeto é o acesso aos repositórios pela `UserInterface`. A `UserInterface` só deveria realizar operações com dados através da camada Application. Essa separação também é defendida no livro "Patterns, Principles, and Practices of Domain-Driven Design" de Scott Millett e Nick Tune.


### UserInterface

### Application

Conforme mencionado na introdução, não implementamos a regra de não usar CRUD nos application services. Eles podem ser usados e são encorajados. Entretanto, seguindo o padrão DDD, devemos tentar sempre agrupar as lógicas em métodos específicos. Ex: Se você precisa fazer uma retirada de dinheiro de uma conta e isso é feito através da criação do objeto Transaction no banco, você não deveria chamar o método Add de TransactionService, em vez disso deveria ter um método específico para retirada de dinheiro, como WithdrawMoney, que vai criar a transação e realizar as outras operações necessárias.
