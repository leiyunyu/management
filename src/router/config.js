import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes';
import { getCookie, setCookie } from '../utils/utils';
Vue.use(VueRouter);
let router = new VueRouter({
    routes
})
router.beforeEach((to, from, next) => {
    if(to.name === 'login' ){
        next();
    } else{
        if(getCookie('token')){
            next();
        }else{
            next('/login');            
        }
    }
})
export default router;
