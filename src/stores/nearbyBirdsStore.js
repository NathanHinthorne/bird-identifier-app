import { defineStore } from 'pinia'

// -- Bird object --
// id: number;
// speciesCode: string;
// comName: string;
// formattedComName: string;
// sciName: string;
// smallImg: string;
// largeImg: string;
// sound: string;
// shortDescription: string;
// longDescription: string;
// howToFind: string;
// habitat: string;
// map: string;
// learnMoreLink: string;

export const useNearbyBirdsStore = defineStore('nearbyBirds', {
    state: () => ({
        totalNearbyBirds: [],
        displayedNearbyBirds: [],
        currentSearchTerm: '',
        page: 1,
        birdsPerPage: 20,
        isLoading: false,
    }),
    actions: {
        setBirds(birds) {
            this.totalNearbyBirds = birds;
            this.generateInitialBirds();
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
        async getBirdByName(name) {
            this.isLoading = true;

            try {
                return this.totalNearbyBirds.find(bird => bird.formattedComName == name);

            } catch (error) {
                console.error('Error getting bird by id:', error);
                return null;

            } finally {
                this.isLoading = false;
            }
        },

        getDisplayedBirds() {
            return this.displayedNearbyBirds;
        },
        applyNewSearch(searchTerm) {
            this.currentSearchTerm = searchTerm;
            this.page = 1;
            this.generateInitialBirds();
        },
        async generateMoreBirds() {
            this.isLoading = true;
            try {
                const filteredBirds = this.filterBirds();
                const start = this.displayedNearbyBirds.length;
                const end = start + this.birdsPerPage;
                const newBirds = filteredBirds.slice(start, end);

                if (newBirds.length > 0) {
                    this.displayedNearbyBirds = [...this.displayedNearbyBirds, ...newBirds];
                    this.page++;
                }

                console.log('Total filtered birds: ', filteredBirds.length);
                console.log('Total displayed birds: ', this.displayedNearbyBirds.length);

                return newBirds.length > 0;
            } catch (error) {
                console.error('Error generating more birds:', error);
                return false;
            } finally {
                this.isLoading = false;
            }
        },
        generateInitialBirds() {
            const filteredBirds = this.filterBirds();
            this.displayedNearbyBirds = filteredBirds.slice(0, this.birdsPerPage);
            this.page = 1;
        },
        filterBirds() {
            return this.currentSearchTerm
                ? this.totalNearbyBirds.filter(bird => bird.comName.toLowerCase().includes(this.currentSearchTerm.toLowerCase()))
                : this.totalNearbyBirds;
        },
    },
});