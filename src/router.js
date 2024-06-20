import { createRouter, createWebHistory } from '@ionic/vue-router';

import Root from './views/Root.vue';
import LifeList from './views/LifeList.vue';
import Explore from './views/Explore.vue';
import Identify from './views/Identify.vue';
import IdentifyBySound from './views/IdentifyBySound.vue';
import IdentifyByImage from './views/IdentifyByImage.vue';


const routes = [
    {
        path: '/',
        redirect: '/identify'
    },
    {
        path: '/',
        component: Root,
        children: [
            {
                path: '',
                redirect: '/identify'
            },
            {
                path: 'identify',
                component: Identify,
                children: [
                    {
                        path: 'sound',
                        component: IdentifyBySound
                    },
                    {
                        path: 'image',
                        component: IdentifyByImage
                    }
                ]
            },
            {
                path: 'life-list',
                component: LifeList
            },
            {
                path: 'explore',
                component: Explore
            }
        ]
    }

    // Add more routes for other tabs as needed
];

const router = createRouter({
    // Use: createWebHistory(process.env.BASE_URL) in your app
    history: createWebHistory(),
    routes
});

export default router;