import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Settings from '../views/Settings.vue';
import Help from '../views/Help.vue';

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/settings',
        name: 'Settings',
        component: Settings
    },
    {
        path: '/help',
        name: 'Help',
        component: Help,
    }
]

const router = new VueRouter({
  routes
})

export default router
