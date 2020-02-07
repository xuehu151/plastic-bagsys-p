import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
    {
        title: '权限管理',
        icon: 'nb-locked',
        hidden: false,
        children: [
            {
                title: '用户',
                hidden: false,
                link: '/pages/authority/authority-user',
            },
            {
                title: '角色',
                hidden: false,
                link: '/pages/authority/authority-role',
            },
        ],
    },
    {
        title: '财务管理',
        icon: 'nb-compose',
        hidden: false,
        children: [
            {
                title: '打款',
                hidden: false,
                link: '/pages/finance/refuse-payment',
            },
            {
                title: '打款历史',
                hidden: false,
                link: '/pages/finance/make-money-history',
            },
        ],
    },
    {
        title: '运营管理',
        icon: 'nb-gear',
        hidden: false,
        children: [
            {
                title: '代理商管理',
                hidden: false,
                link: '/pages/agent-operation/agent',
            },
            {
                title: '设备管理',
                hidden: false,
                link: '/pages/agent-operation/device-manage',
            },
            {
                title: 'C端用户管理',
                hidden: false,
                link: '/pages/agent-operation/c-user-manage',
            },
            {
                title: '订单',
                hidden: false,
                link: '/pages/agent-operation/device-order',
            },
        ],
    },
    {
        title: '订单管理',
        icon: 'nb-list',
        hidden: false,
        children: [
            {
                title: '订单信息',
                hidden: false,
                link: '/pages/order/order-list',
            },
            {
                title: '订单历史',
                hidden: false,
                link: '/pages/order/order-list-history',
            },
        ],
    },
];
