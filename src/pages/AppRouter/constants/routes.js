
export const routes = [
    {path:'/main/',         comments: false, component: 'Main',         style: "parent.module.scss",   exact:true, text:'главная'},
    {path:'/models/',       comments: false, component: 'EntrysPage',   style: "parent.module.scss",   exact:true, text:'модели'},
    {path:'/orders/',       comments: false, component: 'EntrysPage',   style: "parent.module.scss",   exact:true, text:'заказы'},
    {path:'/parts/',        comments: false, component: 'EntrysPage',   style: "parent.module.scss",   exact:true, text:'детали'},
    {path:'/blueprints/',   comments: true, component: 'EntrysPage',    style: "blueprints.module.scss",   exact:true, text:'чертежи'},
    {path:'/shop/',         comments: false, component: 'EntrysPage',   style: "shop.module.scss",  exact:true, text:'в продаже'},
    {path:'/models/:id',    comments: true, component: 'EntrysPage',    style: "child.module.scss",   exact:true, text:'в продаже'},
    {path:'/orders/:id',    comments: true, component: 'EntrysPage',    style: "child.module.scss",      exact:true, text:'заказы'},
];
