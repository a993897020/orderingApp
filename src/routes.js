/**
 * 路由
 */
import Bg from './components/bg/Bg.vue'
import Home from './components/home/Home.vue'
import Register from './components/register/Register.vue'
import Login from './components/login/Login.vue'
import Order from './components/order/Order.vue'
import Information from './components/information/Information.vue'

export const routes=[
    {path:'/',name:'BgLink',component:Bg},
    {path:'/login',name:'LoginLink',component:Login},
    {path:'/register',name:'RegisterLink',component:Register},
    {path:'/home',name:'HomeLink',component:Home},
    {path:'/order',name:'OrderLink',component:Order},
    {path:'/information',name:'InformationLink',component:Information},
]