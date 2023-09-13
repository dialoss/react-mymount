import React from 'react';
import Intro from "components/Pages/Intro";
import ListView from "components/Pages/ListView";
import parentStyle from "styles/listview/parent.module.scss";
import childStyle from "styles/listview/child.module.scss";

const intro = <Intro/>;
const ListParent = <ListView listStyle={parentStyle}/>
const ListChild = <ListView listStyle={childStyle}/>



export const routes = [
    {path:'/main/',     component:intro, exact:true, text:'главная'},
    {path:'/models/',   component:ListParent, exact:true, text:'модели'},
    {path:'/orders/',   component:ListParent, exact:true, text:'заказы'},
    {path:'/parts/',    component:ListParent, exact:true, text:'детали'},
    {path:'/blueprints/',component:ListParent, exact:true, text:'чертежи'},
    {path:'/shop/',     component:ListParent, exact:true, text:'в продаже'},
    {path:'/models/:id', component: ListChild, exact:true, text:'в продаже'},
    {path:'/orders/:id',   component:ListChild, exact:true, text:'заказы'},
];