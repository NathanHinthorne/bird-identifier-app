import { createRouter, createWebHistory } from '@ionic/vue-router';
import TabRoot from './components/TabRoot.vue';

const routes = [
    {
        path: '/',
        redirect: '/home',
    },
    {
        path: '/',
        component: TabRoot,
        children: [
            {
                path: '',
                redirect: '/home',
            },
            {
                path: 'home',
                component: () => import('./views/HomePage.vue'),
            },
            {
                path: 'identify',
                component: () => import('./views/IdentifyPage.vue'),
            },
            {
                path: 'life-list',
                component: () => import('./views/LifeListPage.vue'),
            },
        ],
    },
];

const router = createRouter({
    // Use: createWebHistory(process.env.BASE_URL) in your app
    history: createWebHistory(),
    routes,
});

export default router;