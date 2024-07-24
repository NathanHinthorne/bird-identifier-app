import { createRouter, createWebHistory } from '@ionic/vue-router';
import { useUserStore } from './stores/userStore';

import Root from './views/Root.vue';
import LifeList from './views/LifeList.vue';
import Explore from './views/Explore.vue';
import Settings from './views/Settings.vue';
import Identify from './views/Identify.vue';
import IdentifyBySound from './components/IdentifyBySound.vue';
import IdentifyByImage from './components/IdentifyByImage.vue';
import IdentifiedBirdInfo from './views/IdentifiedBirdInfo.vue';
import GeneralBirdInfo from './views/GeneralBirdInfo.vue';
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
                component: Identify,
                children: [
                    {
                        path: 'sound',
                        name: 'IdentifyBySound',
                        component: IdentifyBySound
                    },
                    {
                        path: 'image',
                        name: 'IdentifyByImage',
                        component: IdentifyByImage
                    }
                ]
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
                name: 'IdentifiedBirdInfo',
                component: IdentifiedBirdInfo,
                props: true
            },
            {
                path: 'explore/bird-info/:birdName',
                name: 'GeneralBirdInfo',
                component: GeneralBirdInfo,
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

router.beforeEach((to, from, next) => {
    const userStore = useUserStore();
    if (to.name !== 'Auth' && !userStore.isAuthenticated) {
        next({ name: 'Auth' });
    } else if (to.name === 'Auth' && userStore.isAuthenticated) {
        next({ name: 'Identify' });
    } else {
        next();
    }
});

export default router;