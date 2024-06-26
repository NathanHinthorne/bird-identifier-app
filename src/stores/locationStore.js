import { defineStore } from 'pinia';

export const useLocationStore = defineStore('location', {
    state: () => ({
        currentLocation: null,
    }),
    actions: {
        setLocation(location) {
            this.currentLocation = location;
            console.log('Location set from locationStore:', location);
        },
    },
});