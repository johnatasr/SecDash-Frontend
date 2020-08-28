import React from 'react';
import $ from 'jquery';

window.jQuery = $;
window.$ = $;
global.jQuery = $;

const DashboardDefault = React.lazy(() => import('./Demo/Dashboard/Default'));
const BootstrapTable = React.lazy(() => import('./Demo/Tables/BootstrapTable'));
const OtherDocs = React.lazy(() => import('./Demo/Other/Docs'));

const routes = [
    { path: '/dashboard', exact: true, name: 'Default', component: DashboardDefault },
    { path: '/tables', exact: true, name: 'Bootstrap Table', component: BootstrapTable },
];

export default routes;