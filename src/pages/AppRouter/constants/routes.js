

export const routes = [
    {path:'/main/',         component: 'Main',        style: parentStyle,        exact:true, text:'главная'},
    {path:'/models/',       component: 'EntrysPage',  style: parentStyle,   exact:true, text:'модели'},
    {path:'/orders/',       component: 'EntrysPage',  style: parentStyle,   exact:true, text:'заказы'},
    {path:'/parts/',        component: 'EntrysPage',  style: parentStyle,   exact:true, text:'детали'},
    {path:'/blueprints/',   component: 'EntrysPage',  style: parentStyle,   exact:true, text:'чертежи'},
    {path:'/shop/',         component: 'EntrysPage',  style: parentStyle,   exact:true, text:'в продаже'},
    {path:'/models/:id',    component: 'EntrysPage',  style: parentStyle,   exact:true, text:'в продаже'},
    {path:'/orders/:id',    component: 'EntrysPage',  style: parentStyle,  exact:true, text:'заказы'},
];
