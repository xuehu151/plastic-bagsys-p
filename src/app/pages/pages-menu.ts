import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
    {
        title: '权限管理',
        icon: 'nb-locked',
        hidden: false,
        data:{
            id: 1
        },
        children: [
            {
                title: '用户',
                hidden: false,
                data:{
                    id: 1001
                },
                link: '/pages/authority/authority-user',
            },
            {
                title: '角色',
                hidden: false,
                data:{
                    id: 1002
                },
                link: '/pages/authority/authority-role',
            },
        ],
    },
    {
        title: '财务管理',
        icon: 'nb-compose',
        hidden: false,
        data:{
            id: 2
        },
        children: [
            {
                title: '打款',
                hidden: false,
                data:{
                    id: 2001
                },
                link: '/pages/finance/refuse-payment',
            },
            {
                title: '打款历史',
                hidden: false,
                data:{
                    id: 2002
                },
                link: '/pages/finance/make-money-history',
            },
        ],
    },
    {
        title: '运营管理',
        icon: 'nb-gear',
        hidden: false,
        data:{
            id: 3
        },
        children: [
            {
                title: '代理商管理',
                hidden: false,
                data:{
                    id: 3001
                },
                link: '/pages/agent-operation/agent',
            },
            {
                title: '设备管理',
                hidden: false,
                data:{
                    id: 3002
                },
                link: '/pages/agent-operation/device-manage',
            },
            {
                title: 'C端用户管理',
                hidden: false,
                data:{
                    id: 3003
                },
                link: '/pages/agent-operation/c-user-manage',
            },
            {
                title: '订单',
                hidden: false,
                data:{
                    id: 3004
                },
                link: '/pages/agent-operation/device-order',
            },
            {
                title: '商品管理',
                hidden: false,
                data:{
                    id: 3005
                },
                link: '/pages/agent-operation/shop-home',
            },
        ],
    },
    {
        title: '订单管理',
        icon: 'nb-list',
        hidden: false,
        data:{
            id: 4
        },
        children: [
            {
                title: '订单信息',
                hidden: false,
                data:{
                    id: 4001
                },
                link: '/pages/order/order-list',
            },
            {
                title: '订单历史',
                hidden: false,
                data:{
                    id: 4002
                },
                link: '/pages/order/order-list-history',
            },
        ],
    },
];
