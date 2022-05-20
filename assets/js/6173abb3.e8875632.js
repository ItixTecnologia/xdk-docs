"use strict";(self.webpackChunkxdk_docs=self.webpackChunkxdk_docs||[]).push([[249],{3905:function(e,t,n){n.d(t,{Zo:function(){return l},kt:function(){return d}});var a=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},o=Object.keys(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var c=a.createContext({}),p=function(e){var t=a.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):s(s({},t),e)),n},l=function(e){var t=p(e.components);return a.createElement(c.Provider,{value:t},e.children)},m={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},u=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,o=e.originalType,c=e.parentName,l=i(e,["components","mdxType","originalType","parentName"]),u=p(n),d=r,f=u["".concat(c,".").concat(d)]||u[d]||m[d]||o;return n?a.createElement(f,s(s({ref:t},l),{},{components:n})):a.createElement(f,s({ref:t},l))}));function d(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=n.length,s=new Array(o);s[0]=u;var i={};for(var c in t)hasOwnProperty.call(t,c)&&(i[c]=t[c]);i.originalType=e,i.mdxType="string"==typeof e?e:r,s[1]=i;for(var p=2;p<o;p++)s[p]=n[p];return a.createElement.apply(null,s)}return a.createElement.apply(null,n)}u.displayName="MDXCreateElement"},8420:function(e,t,n){n.r(t),n.d(t,{assets:function(){return l},contentTitle:function(){return c},default:function(){return d},frontMatter:function(){return i},metadata:function(){return p},toc:function(){return m}});var a=n(7462),r=n(3366),o=(n(7294),n(3905)),s=["components"],i={title:"Tema",slug:"/app/customization/theme"},c=void 0,p={unversionedId:"app/customization/theme",id:"app/customization/theme",title:"Tema",description:"O tema da aplica\xe7\xe3o pode ser personalizado em detalhes, desde as cores principais at\xe9 o estilo dos componentes. Nesta se\xe7\xe3o vamos abordar",source:"@site/docs/app/customization/theme.md",sourceDirName:"app/customization",slug:"/app/customization/theme",permalink:"/xdk-docs/docs/app/customization/theme",draft:!1,tags:[],version:"current",frontMatter:{title:"Tema",slug:"/app/customization/theme"},sidebar:"docs/app",previous:{title:"Layouts",permalink:"/xdk-docs/docs/app/structure/layouts"},next:{title:"Layout",permalink:"/xdk-docs/docs/app/customization/layout"}},l={},m=[{value:"TEMA PRINCIPAL",id:"tema-principal",level:2}],u={toc:m};function d(e){var t=e.components,i=(0,r.Z)(e,s);return(0,o.kt)("wrapper",(0,a.Z)({},u,i,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("p",null,"O tema da aplica\xe7\xe3o pode ser personalizado em detalhes, desde as cores principais at\xe9 o estilo dos componentes. Nesta se\xe7\xe3o vamos abordar\nv\xe1rias op\xe7\xf5es de como personalizar o tema da aplica\xe7\xe3o."),(0,o.kt)("h2",{id:"tema-principal"},"TEMA PRINCIPAL"),(0,o.kt)("p",null,"Para configurar o tema principal, precisamos alterar o arquivo ",(0,o.kt)("inlineCode",{parentName:"p"},"styles.scss"),". Se voc\xea usou o gerador ou seguiu o processo de configura\xe7\xe3o de\nprojetos da XDK, seu arquivo deve estar parecido com o c\xf3digo a seguir:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-scss",metastring:'title="/src/styles.scss" showLineNumbers',title:'"/src/styles.scss"',showLineNumbers:!0},'@import "node_modules/@itix/components/themes/index";\n\n$primary: #2850d1;\n$secondary: #002087;\n\n$theme: ix-light-theme($primary, $secondary);\n\n@include ix-theme($theme);\n')),(0,o.kt)("p",null,"Esse c\xf3digo ir\xe1 gerar a seguinte visualiza\xe7\xe3o:"),(0,o.kt)("p",null,(0,o.kt)("img",{alt:"Tema padr\xe3o",src:n(584).Z,width:"2888",height:"1724"})),(0,o.kt)("p",null,"Como nossa primeira altera\xe7\xe3o, queremos que as cores principais se adaptem ao projeto onde estamos trabalhando. Por exemplo, para\ndeterminado projeto definimos as cores prim\xe1rias e sec\xfandarias como mostrar a seguir:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-scss",metastring:'title="/src/styles.scss" showLineNumbers',title:'"/src/styles.scss"',showLineNumbers:!0},'@import "node_modules/@itix/components/themes/index";\n\n// highlight-start\n$primary: #00995D;\n$secondary: #73C947;\n// highlight-end\n\n$theme: ix-light-theme($primary, $secondary);\n\n@include ix-theme($theme);\n')),(0,o.kt)("p",null,"Essa altera\xe7\xe3o ir\xe1 gerar a seguinte visualiza\xe7\xe3o:"),(0,o.kt)("p",null,(0,o.kt)("img",{alt:"Tema padr\xe3o",src:n(2850).Z,width:"2882",height:"1730"})),(0,o.kt)("p",null,"Como notado, as cores prim\xe1rias e secund\xe1rias de toda a aplica\xe7\xe3o foram alteradas.\nN\xe3o \xe9 necess\xe1rio, mas se desejar, voc\xea tamb\xe9m pode mudar as outras cores do estilo, s\xe3o elas:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-scss"},"$success: #fff;\n$danger: #fff;\n$warning: #fff;\n$info: #fff;\n$light: #fff;\n$dark: #fff;\n\n$theme: ix-light-theme($primary, $secondary, $success, $danger, $warning, $info, $light, $dark);\n")),(0,o.kt)("div",{className:"admonition admonition-info alert alert--info"},(0,o.kt)("div",{parentName:"div",className:"admonition-heading"},(0,o.kt)("h5",{parentName:"div"},(0,o.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,o.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,o.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"}))),"info")),(0,o.kt)("div",{parentName:"div",className:"admonition-content"},(0,o.kt)("p",{parentName:"div"},"Voc\xea pode alterar nenhuma ou quantas cores quiser."))))}d.isMDXComponent=!0},584:function(e,t,n){t.Z=n.p+"assets/images/theme1-053a2b04458c8250206e69622ec78dd6.png"},2850:function(e,t,n){t.Z=n.p+"assets/images/theme2-bc657370e21cdc27227547e491782a4d.png"}}]);