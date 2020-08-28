export default {
    items: [
        {
            id: 'navigation',
            title: 'Navegação',
            type: 'group',
            icon: 'icon-navigation',
            children: [
                {
                    id: 'dashboard',
                    title: 'Dashboard',
                    type: 'item',
                    url: '/dashboard',
                    icon: 'feather icon-home',
                },
                {
                    id: 'bootstrap',
                    title: 'Tabela',
                    type: 'item',
                    icon: 'feather icon-server',
                    url: '/tables'
                },
            ]
        },       
    ]
}