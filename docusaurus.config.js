/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
    title: 'XDK Docs',
    tagline: 'Faça muito mais em muito menos tempo',
    url: 'https://itixtecnologia.github.io/xdk-docs',
    baseUrl: '/',
    onBrokenLinks: 'ignore',
    onBrokenMarkdownLinks: 'warn',
    favicon: 'img/favicon.ico',
    organizationName: 'ItixTecnologia',
    projectName: 'xdk-docs',
    i18n: {
        defaultLocale: 'pt-BR',
        locales: ['pt-BR'],
    },
    themeConfig: {
        prism: {
            theme: require('prism-react-renderer/themes/dracula'),
            additionalLanguages: ['jsonp', 'csharp', 'bash'],
        },
        navbar: {
            title: 'XDK Docs',
            logo: {
                alt: 'XDK Docs',
                src: 'img/itixlogo.jpg',
            },
            items: [
                {
                    to: 'docs/app/getting-started',
                    activeBasePath: 'docs-front',
                    label: 'Aplicação',
                    position: 'left',
                },
                {
                    to: 'docs/server/introduction',
                    activeBasePath: 'docs-front',
                    label: 'Servidor',
                    position: 'left',
                },
                {to: 'blog', label: 'Blog', position: 'left'}
            ],
        },
        footer: {
            style: 'dark',
            links: [
                {
                    title: 'Docs',
                    items: [
                        {
                            label: 'Começar',
                            to: 'docs/',
                        },
                    ],
                },
                {
                    title: 'Fale com a gente',
                    items: [
                        {
                            label: 'Página de contato',
                            href: 'https://itixti.com.br',
                        },
                        {
                            label: 'E-mail',
                            href: 'mailto:contato@itixti.com.br',
                        }
                    ],
                },
            ],
            copyright: `Copyright © ${new Date().getFullYear()} XDK Docs.`,
        },
    },
    presets: [
        [
            '@docusaurus/preset-classic',
            {
                docs: {
                    sidebarPath: require.resolve('./sidebars.js'),
                },
                blog: {
                    showReadingTime: true,
                },
                theme: {
                    customCss: require.resolve('./src/css/custom.css'),
                },
            },
        ],
    ],
};
