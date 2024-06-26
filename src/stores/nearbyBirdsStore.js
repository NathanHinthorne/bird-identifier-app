import { defineStore } from 'pinia'

export const useNearbyBirdsStore = defineStore('nearbyBirds', {
    state: () => ({
        nearbyBirds: [],
    }),
    actions: {
        setNearbyBirds(birds) {
            this.nearbyBirds = birds;
            console.log('Nearby birds set from nearbyBirdsStore:', birds);
        },
    },
});
