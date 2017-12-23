import admin from '../pages/index/index.vue';
import message from '../pages/tab/message.vue';
import active from '../pages/tab/active.vue';
import entry from '../pages/pintai/onemouse.vue';
import grid from '../pages/pintai/bootstropt.vue';
import myPublic from '../pages/pintai/public.vue';
import myLogin from '../pages/index/login.vue';
import activity from '../pages/tab/activity.vue';
import activeInfo from '../pages/pintai/entry/activeInfo.vue';
import people from '../pages/pintai/entry/people.vue';
let routes = [
    {
        path: '/',
        redirect: '/admin/menu/public/message'
    },
    {
        path: '/login',
        name: 'login',
        component: myLogin
    },
    {
        path: '/admin',
        name: 'admin',
        component: admin,
        children: [
            {
                path: '/admin/menu/entry',
                name: 'entry',
                component: entry,
                children: [
                    {
                        path: '/admin/menu/entry/activeInfo',
                        name: 'activeInfo',
                        component: activeInfo,
                    },
                    {
                        path: '/admin/menu/entry/people',
                        name: 'people',
                        component: people,
                    }
                ]
            },
            {
                path: '/admin/menu/activity/:id',
                name: 'activity',
                component: activity,
            },
            {
                path: '/admin/menu/grid',
                name: 'grid',
                component: grid
            },
            {
                path: '/admin/menu/public',
                name: 'public',
                component: myPublic,
                children: [
                    {
                        path: '/admin/menu/public/message',
                        name: 'message',
                        component: message,
                    },
                    {
                        path: '/admin/menu/public/active',
                        name: 'active',
                        component: active,
                    }
                ]
            },
        ]
    }
]
export default routes;
