module.exports = {
    "docs/app": [
        {
            type: 'category',
            label: 'Primeiros Passos',
            items: [
                'app/getting-started',
                'app/project-setup',
                'app/xdk-setup',
                'app/getting-started-manually'
            ]
        },
        {
            type: 'category',
            label: 'Estrutura',
            items: [
                'app/structure/folder-structure',
                'app/structure/data-modeling',
                'app/structure/stores',
                'app/structure/routes',
                'app/structure/layouts',
            ]
        }
    ],
    "docs/server": [
        {
            type: 'doc',
            id: 'server/introduction'
        },
        {
            type: 'category',
            label: '.NET',
            items: [
                {
                    type: 'category',
                    label: 'Básico',
                    items: [
                        'server/dotnet/getting-started',
                        'server/dotnet/utilities'
                    ]
                }
            ]
        }
    ]
};
