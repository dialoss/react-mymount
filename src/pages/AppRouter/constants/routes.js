

export const routes = [
    {path:'/main/',         component: 'Main',         exact:true, text:'главная'},
    {path:'/models/',       component: 'EntrysPage',   exact:true, text:'модели'},
    {path:'/orders/',       component: 'EntrysPage',   exact:true, text:'заказы'},
    {path:'/parts/',        component: 'EntrysPage',   exact:true, text:'детали'},
    {path:'/blueprints/',   component: 'EntrysPage',   exact:true, text:'чертежи'},
    {path:'/shop/',         component: 'EntrysPage',   exact:true, text:'в продаже'},
    {path:'/models/:id',    component: 'EntrysPage',   exact:true, text:'в продаже'},
    {path:'/orders/:id',    component: 'EntrysPage',   exact:true, text:'заказы'},
];
