
export const routes = [
    {path:'/login/',        comments: false, component: 'Login',        style: "parent.module.scss",   exact:true},
    {path:'/main/',         comments: false, component: 'Main',         style: "parent.module.scss",   exact:true},
    {path:'/models/',       comments: false, component: 'EntrysPage',   style: "parent.module.scss",   exact:true},
    {path:'/orders/',       comments: false, component: 'EntrysPage',   style: "parent.module.scss",   exact:true},
    {path:'/parts/',        comments: false, component: 'EntrysPage',   style: "parent.module.scss",   exact:true},
    {path:'/blueprints/',   comments: true, component: 'EntrysPage',    style: "blueprints.module.scss",   exact:true},
    {path:'/shop/',         comments: false, component: 'EntrysPage',   style: "shop.module.scss",  exact:true},
    {path:'/models/:id',    comments: true, component: 'EntrysPage',    style: "child.module.scss",   exact:true},
    {path:'/orders/:id',    comments: true, component: 'EntrysPage',    style: "child.module.scss",      exact:true},
];
