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


    {
        title: 'IoT Dashboard',
        icon: 'nb-order-list-history',
        link: '/pages/iot-dashboard',
    },
    {
        title: 'Extra Components',
        icon: 'nb-star',
        children: [
            {
                title: 'Calendar',
                link: '/pages/extra-components/calendar',
            },
            {
                title: 'Stepper',
                link: '/pages/extra-components/stepper',
            },
            {
                title: 'List',
                link: '/pages/extra-components/list',
            },
            {
                title: 'Infinite List',
                link: '/pages/extra-components/infinite-list',
            },
            {
                title: 'Form Inputs',
                link: '/pages/extra-components/form-inputs',
            },
            {
                title: 'Accordion',
                link: '/pages/extra-components/accordion',
            },
            {
                title: 'Progress Bar',
                link: '/pages/extra-components/progress-bar',
            },
            {
                title: 'Spinner',
                link: '/pages/extra-components/spinner',
            },
            {
                title: 'Alert',
                link: '/pages/extra-components/alert',
            },
            {
                title: 'Tree',
                link: '/pages/extra-components/tree',
            },
            {
                title: 'Tabs',
                link: '/pages/extra-components/tabs',
            },
            {
                title: 'Calendar Kit',
                link: '/pages/extra-components/calendar-kit',
            },
            {
                title: 'Chat',
                link: '/pages/extra-components/chat',
            },
        ],
    },
    {
        title: 'Forms',
        icon: 'nb-compose',
        children: [
            {
                title: 'Form Inputs',
                link: '/pages/forms/inputs',
            },
            {
                title: 'Form Layouts',
                link: '/pages/forms/layouts',
            },
            {
                title: 'Buttons',
                link: '/pages/forms/buttons',
            },
            {
                title: 'Datepicker',
                link: '/pages/forms/datepicker',
            },
        ],
    },
    {
        title: 'UI Features',
        icon: 'nb-keypad',
        link: '/pages/ui-features',
        children: [
            {
                title: 'Grid',
                link: '/pages/ui-features/grid',
            },
            {
                title: 'Icons',
                link: '/pages/ui-features/icons',
            },
            {
                title: 'Typography',
                link: '/pages/ui-features/typography',
            },
            {
                title: 'Animated Searches',
                link: '/pages/ui-features/search-fields',
            },
        ],
    },
    {
        title: 'Modal & Overlays',
        icon: 'nb-layout-default',
        children: [
            {
                title: 'Dialog',
                link: '/pages/modal-overlays/dialog',
            },
            {
                title: 'Window',
                link: '/pages/modal-overlays/window',
            },
            {
                title: 'Popover',
                link: '/pages/modal-overlays/popover',
            },
            {
                title: 'Toastr',
                link: '/pages/modal-overlays/toastr',
            },
            {
                title: 'Tooltip',
                link: '/pages/modal-overlays/tooltip',
            },
        ],
    },
    {
        title: 'Bootstrap',
        icon: 'nb-gear',
        children: [
            {
                title: 'Form Inputs',
                link: '/pages/bootstrap/inputs',
            },
            {
                title: 'Buttons',
                link: '/pages/bootstrap/buttons',
            },
            {
                title: 'Modal',
                link: '/pages/bootstrap/modal',
            },
        ],
    },
    {
        title: 'Maps',
        icon: 'nb-location',
        children: [
            {
                title: 'Google Maps',
                link: '/pages/maps/gmaps',
            },
            {
                title: 'Leaflet Maps',
                link: '/pages/maps/leaflet',
            },
            {
                title: 'Bubble Maps',
                link: '/pages/maps/bubble',
            },
            {
                title: 'Search Maps',
                link: '/pages/maps/searchmap',
            },
        ],
    },
    {
        title: 'Charts',
        icon: 'nb-bar-chart',
        children: [
            {
                title: 'Echarts',
                link: '/pages/charts/echarts',
            },
            {
                title: 'Charts.js',
                link: '/pages/charts/chartjs',
            },
            {
                title: 'D3',
                link: '/pages/charts/d3',
            },
        ],
    },
    {
        title: 'Editors',
        icon: 'nb-title',
        children: [
            {
                title: 'TinyMCE',
                link: '/pages/editors/tinymce',
            },
            {
                title: 'CKEditor',
                link: '/pages/editors/ckeditor',
            },
        ],
    },
    {
        title: 'Tables',
        icon: 'nb-tables',
        children: [
            {
                title: 'Smart Table',
                link: '/pages/tables/smart-table',
            },
        ],
    },
    {
        title: 'Miscellaneous',
        icon: 'nb-shuffle',
        children: [
            {
                title: '404',
                link: '/pages/miscellaneous/404',
            },
        ],
    },
    {
        title: 'Auth',
        icon: 'nb-locked',
        children: [
            {
                title: 'Login',
                link: '/auth/login',
            },
            {
                title: 'Register',
                link: '/auth/register',
            },
            {
                title: 'Request Password',
                link: '/auth/request-password',
            },
            {
                title: 'Reset Password',
                link: '/auth/reset-password',
            },
        ],
    },
];
