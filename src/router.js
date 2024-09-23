import { createRouter, createWebHistory } from '@ionic/vue-router';
// import { useUserStore } from './stores/userStore';

import Root from './views/Root.vue';
import LifeList from './views/LifeList.vue';
import Explore from './views/Explore.vue';
import Settings from './views/Settings.vue';
import Identify from './views/Identify.vue';
import IdentifyBySound from './views/IdentifyBySound.vue';
import IdentifyByDescription from './views/IdentifyByDescription.vue';
import RegionalBirdInfo from './views/RegionalBirdInfo.vue';
import SeenBirdInfo from './views/SeenBirdInfo.vue';
import SightingHistory from './views/SightingHistory.vue';
import Auth from './views/Auth.vue';


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
                name: 'Identify',
                component: Identify
            },
            {
                path: 'identify/sound',
                name: 'IdentifyBySound',
                component: IdentifyBySound
            },
            {
                path: 'identify/description',
                name: 'IdentifyByDescription',
                component: IdentifyByDescription
            },
            {
                // Remember, child components will be rendered INSIDE the parent component
                // from the <router-view> tag in the parent component's template
                path: 'life-list',
                name: 'LifeList',
                component: LifeList
            },
            {
                path: 'explore',
                name: 'Explore',
                component: Explore
            },
            {
                path: 'life-list/bird-info/:birdName',
                name: 'SeenBirdInfo',
                component: SeenBirdInfo,
                props: true
            },
            {
                path: 'life-list/bird-info/:birdName/sighting-history',
                name: 'SightingHistory',
                component: SightingHistory
            },
            {
                path: 'explore/bird-info/:birdName',
                name: 'RegionalBirdInfo',
                component: RegionalBirdInfo,
                props: true
            },
            {
                path: 'settings',
                name: 'Settings',
                component: Settings
            },
            {
                path: '/auth',
                name: 'Auth',
                component: Auth
            }
        ]
    }

    // Add more routes for other tabs as needed
];

const router = createRouter({
    // use for production?
    // history: createWebHistory(import.meta.env.VITE_BASE_URL),

    // use for dev
    history: createWebHistory(),

    routes
});


export default router;