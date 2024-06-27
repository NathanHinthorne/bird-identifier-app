import { defineStore } from 'pinia'

// -- Bird object --
// speciesCode: string;
// comName: string;
// sciName: string;
// smallImg: string;
// largeImg: string;
// learnMoreLink: string;
// description: string;

export const useNearbyBirdsStore = defineStore('nearbyBirds', {
    state: () => ({
        totalNearbyBirds: [],
        displayedNearbyBirds: [],
        currentSearchTerm: '',
        page: 1,
        birdsPerPage: 15,
    }),
    actions: {
        setBirds(birds) {
            this.totalNearbyBirds = birds;
        },
        clearBirds() {
            this.totalNearbyBirds = [];
            this.displayedNearbyBirds = [];
            this.currentSearchTerm = '';
            this.page = 1;
        },
        getAllBirds() {
            return this.totalNearbyBirds;
        },

        getDisplayedBirds() {
            if (this.displayedNearbyBirds.length === 0) {
                this.generateMoreBirds();
            }
            return this.displayedNearbyBirds;
        },
        applyNewSearch(searchTerm) {
            this.currentSearchTerm = searchTerm;

            // Use filter on TOTAL birds to avoid losing birds when searching
            const totalBirdsFiltered = this.totalNearbyBirds.filter(bird => bird.comName.toLowerCase().includes(searchTerm.toLowerCase()));

            // Refresh display list
            this.page = 1;
            this.displayedNearbyBirds = totalBirdsFiltered.slice(0, this.birdsPerPage);
        },
        generateMoreBirds() {
            // Filter totalNearbyBirds using currentSearchTerm before slicing
            const filteredBirds = this.currentSearchTerm
                ? this.totalNearbyBirds.filter(bird => bird.comName.toLowerCase().includes(this.currentSearchTerm.toLowerCase()))
                : this.totalNearbyBirds;

            const start = this.page * this.birdsPerPage;
            const end = start + this.birdsPerPage;
            this.displayedNearbyBirds = [...this.displayedNearbyBirds, ...filteredBirds.slice(start, end)];
            this.page++;
        },
    },
});