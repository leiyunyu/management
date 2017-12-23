import './static/css/reset.css';
import Vue from 'vue';
import Mock from 'mockjs';
import { store } from './src/store/store';
import './static/fonts1/iconfont.css'
import axios from './src/http/axios';
import ElementUi from 'element-ui';
import App from './App.vue';
import 'element-ui/lib/theme-chalk/index.css';
import router from './src/router/config';
Vue.use(ElementUi);
new Vue ({
    el: '.contsiner',
    router,
    store,
    render: function(createElement) {
        return createElement(App);
    }
})
if (module.hot) {
    module.hot.accept();
};
