import Intro from "../components/Pages/Intro";
import ListView from "../components/Pages/ListView";

const intro = <Intro/>;
const listView = <ListView/>;

export const routes = [
    {path:'/main/',     component:intro, exact:true, text:'главная'},
    {path:'/models/',   component:listView, exact:true, text:'модели'},
    {path:'/orders/',   component:listView, exact:true, text:'заказы'},
    {path:'/parts/',    component:listView, exact:true, text:'детали'},
    {path:'/blueprints/',component:listView, exact:true, text:'чертежи'},
    {path:'/shop/',     component:listView, exact:true, text:'в продаже'},
];