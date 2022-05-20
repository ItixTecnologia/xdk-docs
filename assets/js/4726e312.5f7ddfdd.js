"use strict";(self.webpackChunkxdk_docs=self.webpackChunkxdk_docs||[]).push([[663],{3905:function(e,a,o){o.d(a,{Zo:function(){return u},kt:function(){return m}});var r=o(7294);function t(e,a,o){return a in e?Object.defineProperty(e,a,{value:o,enumerable:!0,configurable:!0,writable:!0}):e[a]=o,e}function n(e,a){var o=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);a&&(r=r.filter((function(a){return Object.getOwnPropertyDescriptor(e,a).enumerable}))),o.push.apply(o,r)}return o}function s(e){for(var a=1;a<arguments.length;a++){var o=null!=arguments[a]?arguments[a]:{};a%2?n(Object(o),!0).forEach((function(a){t(e,a,o[a])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(o)):n(Object(o)).forEach((function(a){Object.defineProperty(e,a,Object.getOwnPropertyDescriptor(o,a))}))}return e}function i(e,a){if(null==e)return{};var o,r,t=function(e,a){if(null==e)return{};var o,r,t={},n=Object.keys(e);for(r=0;r<n.length;r++)o=n[r],a.indexOf(o)>=0||(t[o]=e[o]);return t}(e,a);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);for(r=0;r<n.length;r++)o=n[r],a.indexOf(o)>=0||Object.prototype.propertyIsEnumerable.call(e,o)&&(t[o]=e[o])}return t}var c=r.createContext({}),d=function(e){var a=r.useContext(c),o=a;return e&&(o="function"==typeof e?e(a):s(s({},a),e)),o},u=function(e){var a=d(e.components);return r.createElement(c.Provider,{value:a},e.children)},l={inlineCode:"code",wrapper:function(e){var a=e.children;return r.createElement(r.Fragment,{},a)}},p=r.forwardRef((function(e,a){var o=e.components,t=e.mdxType,n=e.originalType,c=e.parentName,u=i(e,["components","mdxType","originalType","parentName"]),p=d(o),m=t,f=p["".concat(c,".").concat(m)]||p[m]||l[m]||n;return o?r.createElement(f,s(s({ref:a},u),{},{components:o})):r.createElement(f,s({ref:a},u))}));function m(e,a){var o=arguments,t=a&&a.mdxType;if("string"==typeof e||t){var n=o.length,s=new Array(n);s[0]=p;var i={};for(var c in a)hasOwnProperty.call(a,c)&&(i[c]=a[c]);i.originalType=e,i.mdxType="string"==typeof e?e:t,s[1]=i;for(var d=2;d<n;d++)s[d]=o[d];return r.createElement.apply(null,s)}return r.createElement.apply(null,o)}p.displayName="MDXCreateElement"},3474:function(e,a,o){o.r(a),o.d(a,{assets:function(){return u},contentTitle:function(){return c},default:function(){return m},frontMatter:function(){return i},metadata:function(){return d},toc:function(){return l}});var r=o(7462),t=o(3366),n=(o(7294),o(3905)),s=["components"],i={title:"Introdu\xe7\xe3o",slug:"/server/introduction"},c=void 0,d={unversionedId:"server/introduction",id:"server/introduction",title:"Introdu\xe7\xe3o",description:"A XDK visa facilitar e padronizar a cria\xe7\xe3o de projetos seguindo o padr\xe3o DDD (Domain-Driven Design) como descrito por Eric Evans em seu livro de 2003.",source:"@site/docs/server/introduction.md",sourceDirName:"server",slug:"/server/introduction",permalink:"/xdk-docs/docs/server/introduction",draft:!1,tags:[],version:"current",frontMatter:{title:"Introdu\xe7\xe3o",slug:"/server/introduction"},sidebar:"docs/server",next:{title:"Primeiros passos",permalink:"/xdk-docs/docs/server/dotnet/getting-started"}},u={},l=[{value:"UserInterface",id:"userinterface",level:3},{value:"Application",id:"application",level:3}],p={toc:l};function m(e){var a=e.components,o=(0,t.Z)(e,s);return(0,n.kt)("wrapper",(0,r.Z)({},p,o,{components:a,mdxType:"MDXLayout"}),(0,n.kt)("p",null,"A XDK visa facilitar e padronizar a cria\xe7\xe3o de projetos seguindo o padr\xe3o DDD (Domain-Driven Design) como descrito por Eric Evans em seu livro de 2003."),(0,n.kt)("p",null,"Algumas liberdades foram tomadas (como a n\xe3o utiliza\xe7\xe3o da regra de usar Application/Domain Services como CRUDs, entre outras), mas a estrutura geral permanece a proposta. Por exemplo, seguindo conceitos mais modernos abordados por Scott Millett e Nick Tune, n\xe3o usamos a camada Infrastructure para tratar a persist\xeancia, em vez disso usamos uma camada espec\xedfica que s\xf3 deve ser acessada pela camada Domain. Seguindo essa estrutura, temos as cinco principais camadas do DDD (adaptado/moderno):"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},"Interface de Usu\xe1rio: parte respons\xe1vel pela exibi\xe7\xe3o de informa\xe7\xf5es do sistema ao usu\xe1rio e tamb\xe9m por interpretar comandos do usu\xe1rio"),(0,n.kt)("li",{parentName:"ul"},"Aplica\xe7\xe3o: essa camada n\xe3o possui l\xf3gica de neg\xf3cio. Ela \xe9 apenas uma camada fina, respons\xe1vel por conectar a Interface de Usu\xe1rio \xe0s camadas inferiores",(0,n.kt)("ul",{parentName:"li"},(0,n.kt)("li",{parentName:"ul"},"Caso voc\xea precise realizar qualquer l\xf3gica que n\xe3o seja de neg\xf3cio (ex: alguma formata\xe7\xe3o espec\xedfica), pode-se fazer nessa camada."))),(0,n.kt)("li",{parentName:"ul"},"Dom\xednio: representa os conceitos, regras e l\xf3gicas de neg\xf3cio. Todo o foco de DDD est\xe1 nessa camada."),(0,n.kt)("li",{parentName:"ul"},"Persist\xeancia: persist\xeancia de dados, conex\xf5es com bancos de dados"),(0,n.kt)("li",{parentName:"ul"},"Infra-estrutura: fornece recursos t\xe9cnicos que dar\xe3o suporte \xe0s camadas superiores. S\xe3o normalmente as partes de um sistema respons\xe1veis pelo envio de mensagens por redes, grava\xe7\xe3o e leitura de discos, etc.")),(0,n.kt)("p",null,"Pensando nesses cinco pr\xedncipios (camadas), todos os projetos gerados pela XDK ter\xe3o a estrutura:"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},"SeuProjeto.UserInterface",(0,n.kt)("ul",{parentName:"li"},(0,n.kt)("li",{parentName:"ul"},"Inicialmente ser\xe3o controles pensando na comunica\xe7\xe3o REST, mas pode ser qualquer camada de comunica\xe7\xe3o com o usu\xe1rio (ex: projetos MVVM, WinForms, etc)."),(0,n.kt)("li",{parentName:"ul"},"OBS: Visto que nos projetos mais comuns essa camada se refere \xe0 API (Controllers), esses projetos, normalmente, n\xe3o ter\xe3o nenhuma l\xf3gica, apenas chamadas aos ",(0,n.kt)("inlineCode",{parentName:"li"},"AppServices"),'. Mas nos casos onde essa camada for "realmente" a exibi\xe7\xe3o final ao usu\xe1rio (MVC - p\xe1ginas, MVVM - View, etc) ela dever\xe1, obviamente, conter toda a l\xf3gica de intera\xe7\xe3o com o usu\xe1rio. (realmente est\xe1 entre aspas aqui, porque no caso do projeto API a exibi\xe7\xe3o final \xe9 l\xe1 tamb\xe9m, j\xe1 que o usu\xe1rio da API \xe9 quem consome ela, n\xe3o necessariamente seria o usu\xe1rio do sistema que v\xea a tela/p\xe1gina web)'))),(0,n.kt)("li",{parentName:"ul"},"SeuProjeto.Application",(0,n.kt)("ul",{parentName:"li"},(0,n.kt)("li",{parentName:"ul"},"Armazena todos os ",(0,n.kt)("inlineCode",{parentName:"li"},"AppServices"),". Como explicado acima, deveria ser apenas a comunica\xe7\xe3o com os ",(0,n.kt)("inlineCode",{parentName:"li"},"DomainServices"),", mas caso necess\xe1rio, podem ter pequenas l\xf3gicas que n\xe3o sejam de neg\xf3cio."))),(0,n.kt)("li",{parentName:"ul"},"SeuProjeto.Domain",(0,n.kt)("ul",{parentName:"li"},(0,n.kt)("li",{parentName:"ul"},"Armazena todos os ",(0,n.kt)("inlineCode",{parentName:"li"},"DomainServices")," com suas regras de neg\xf3cios, assim como ",(0,n.kt)("inlineCode",{parentName:"li"},"Specifications")," e ",(0,n.kt)("inlineCode",{parentName:"li"},"Validators"),". Todas as regras de neg\xf3cio devem estar no ",(0,n.kt)("inlineCode",{parentName:"li"},"DomainService")," espec\xedfico de sua entidade, se houver, ou em um gen\xe9rico que herda de ",(0,n.kt)("inlineCode",{parentName:"li"},"BaseDomainService")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("em",{parentName:"li"},"OBS: Nenhuma regra de neg\xf3cio deve estar fora dessa camada.")))),(0,n.kt)("li",{parentName:"ul"},"SeuProjeto.Persistence",(0,n.kt)("ul",{parentName:"li"},(0,n.kt)("li",{parentName:"ul"},"Contextos, entidades, reposit\xf3rios, mappers de entidades, etc."))),(0,n.kt)("li",{parentName:"ul"},"SeuProjeto.Infrastructure",(0,n.kt)("ul",{parentName:"li"},(0,n.kt)("li",{parentName:"ul"},"SMS, E-mail, classes utilit\xe1rias, etc."))),(0,n.kt)("li",{parentName:"ul"},"SeuProjeto.Models",(0,n.kt)("ul",{parentName:"li"},(0,n.kt)("li",{parentName:"ul"},"Classes de retorno utilizadas na aplica\xe7\xe3o."),(0,n.kt)("li",{parentName:"ul"},"Na raiz, guardamos todas as classes que servem tanto para entrada quanto retorno de dados (sufixo Model)"),(0,n.kt)("li",{parentName:"ul"},"Na pasta Inputs, guardamos todas as classes de entrada de dados (sufixo Input)"),(0,n.kt)("li",{parentName:"ul"},"Na pasta Responses, guardamos todas as classes de retorno de dados (sufixo Response)")))),(0,n.kt)("p",null,"Voc\xea pode ficar \xe0 vontade para adicionar mais camadas para deixar seu projeto mais organizado, de acordo com suas necessidades. Mas essas camadas n\xe3o devem substituir as atuais, devem ser apenas camadas/projetos auxiliares \xe0 elas."),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},"Por exemplo, eu posso criar dentro do projeto ",(0,n.kt)("inlineCode",{parentName:"li"},"SeuProjeto.Infrastructure")," um servi\xe7o de envio de e-mails, mas, pensando em deixar gen\xe9rico, crio apenas a estrutura de comunica\xe7\xe3o dentro dela e a implementa\xe7\xe3o, que ir\xe1 utilizar um servi\xe7o externo, como o SendGrid, em um novo projeto chamado ",(0,n.kt)("inlineCode",{parentName:"li"},"SeuProjeto.Infrastructure.Integrations"),". E dentro desse projeto crio uma pasta para a integra\xe7\xe3o com o SendGrid. Essa integra\xe7\xe3o \xe9 ent\xe3o usada no projeto ",(0,n.kt)("inlineCode",{parentName:"li"},"SeuProjeto.Infrastructure"),".")),(0,n.kt)("p",null,"Escolhemos n\xe3o adotar alguns itens especificados pelo padr\xe3o, como o Factories/Aggregates para entidades (apesar de que voc\xea pode fazer sua implementa\xe7\xe3o), visto que fornecemos um domain service bem robusto que pode se comunicar com outros domain services, tornando esse padr\xe3o irrelevante para nosso caso.\nOutro ponto aceito pelo padr\xe3o e rejeitado por esse projeto \xe9 o acesso aos reposit\xf3rios pela ",(0,n.kt)("inlineCode",{parentName:"p"},"UserInterface"),". A ",(0,n.kt)("inlineCode",{parentName:"p"},"UserInterface"),' s\xf3 deveria realizar opera\xe7\xf5es com dados atrav\xe9s da camada Application. Essa separa\xe7\xe3o tamb\xe9m \xe9 defendida no livro "Patterns, Principles, and Practices of Domain-Driven Design" de Scott Millett e Nick Tune.'),(0,n.kt)("h3",{id:"userinterface"},"UserInterface"),(0,n.kt)("h3",{id:"application"},"Application"),(0,n.kt)("p",null,"Conforme mencionado na introdu\xe7\xe3o, n\xe3o implementamos a regra de n\xe3o usar CRUD nos application services. Eles podem ser usados e s\xe3o encorajados. Entretanto, seguindo o padr\xe3o DDD, devemos tentar sempre agrupar as l\xf3gicas em m\xe9todos espec\xedficos. Ex: Se voc\xea precisa fazer uma retirada de dinheiro de uma conta e isso \xe9 feito atrav\xe9s da cria\xe7\xe3o do objeto Transaction no banco, voc\xea n\xe3o deveria chamar o m\xe9todo Add de TransactionService, em vez disso deveria ter um m\xe9todo espec\xedfico para retirada de dinheiro, como WithdrawMoney, que vai criar a transa\xe7\xe3o e realizar as outras opera\xe7\xf5es necess\xe1rias."))}m.isMDXComponent=!0}}]);