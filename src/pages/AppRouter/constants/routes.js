import childStyle from "ui/Themes/child.module.scss";
import parentStyle from "ui/Themes/parent.module.scss";
import shop from "ui/Themes/shop.module.scss";
import blueprints from "ui/Themes/blueprints.module.scss";


export const routes = [
    {path:'/main/',         comments: false, component: 'Main',        style: parentStyle,   exact:true, text:'главная'},
    {path:'/models/',       comments: false, component: 'EntrysPage',  style: parentStyle,   exact:true, text:'модели'},
    {path:'/orders/',       comments: false, component: 'EntrysPage',  style: parentStyle,   exact:true, text:'заказы'},
    {path:'/parts/',        comments: false, component: 'EntrysPage',  style: parentStyle,   exact:true, text:'детали'},
    {path:'/blueprints/',   comments: true, component: 'EntrysPage',  style: blueprints,   exact:true, text:'чертежи'},
    {path:'/shop/',         comments: false, component: 'EntrysPage',  style: shop,   exact:true, text:'в продаже'},
    {path:'/models/:id',    comments: true, component: 'EntrysPage',  style: childStyle,   exact:true, text:'в продаже'},
    {path:'/orders/:id',    comments: true, component: 'EntrysPage',  style: childStyle,  exact:true, text:'заказы'},
];
