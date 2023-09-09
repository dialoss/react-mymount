import Intro from "../components/Pages/Intro";
import ListView from "../components/Pages/ListView";

export const routes = [
    {path:'/main/',     component:<Intro/>, exact:true, text:'главная'},
    {path:'/models/',   component:<ListView/>, exact:true, text:'модели'},
    {path:'/orders/',   component:<ListView/>, exact:true, text:'заказы'},
    {path:'/parts/',    component:<ListView/>, exact:true, text:'детали'},
    {path:'/blueprints/',component:<ListView/>, exact:true, text:'чертежи'},
    {path:'/shop/',     component:<ListView/>, exact:true, text:'в продаже'},
];