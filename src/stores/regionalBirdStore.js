import { defineStore } from 'pinia'

export const useRegionalBirdStore = defineStore('regionalBirds', {
    state: () => ({
        totalRegionalBirds: [],
        displayedRegionalBirds: [],
        currentSearchTerm: '',
        page: 1,
        birdsPerPage: 20,
        isLoading: false,
        fetchingBirds: true,
    }),
    actions: {
        setBirds(birds) {
            this.totalRegionalBirds = birds;
            this.generateInitialBirds();
            this.fetchingBirds = false;
        },
        clearBirds() {
            this.totalRegionalBirds = [];
            this.displayedRegionalBirds = [];
            this.currentSearchTerm = '';
            this.page = 1;
        },
        getAllBirds() {
            return this.totalRegionalBirds;
        },
        async getBirdByName(name) {
            this.isLoading = true;

            try {
                return this.totalRegionalBirds.find(bird => bird.formattedComName == name);

            } catch (error) {
                console.error('Error getting bird by id:', error);
                return null;

            } finally {
                this.isLoading = false;
            }
        },

        getDisplayedBirds() {
            return this.displayedRegionalBirds;
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
                const start = this.displayedRegionalBirds.length;
                const end = start + this.birdsPerPage;
                const newBirds = filteredBirds.slice(start, end);

                if (newBirds.length > 0) {
                    this.displayedRegionalBirds = [...this.displayedRegionalBirds, ...newBirds];
                    this.page++;
                }

                console.log('Total filtered birds: ', filteredBirds.length);
                console.log('Total displayed birds: ', this.displayedRegionalBirds.length);

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
            this.displayedRegionalBirds = filteredBirds.slice(0, this.birdsPerPage);
            this.page = 1;
        },
        filterBirds() {
            return this.currentSearchTerm
                ? this.totalRegionalBirds.filter(bird => bird.comName.toLowerCase().includes(this.currentSearchTerm.toLowerCase()))
                : this.totalRegionalBirds;
        },

        // dev functions
        checkForNullBirds() {
            return this.totalRegionalBirds.some(bird => bird.comName == null);
        },
        printBirds() {
            let count = 0;
            this.totalRegionalBirds.forEach(bird => {
                console.log(bird.comName, count);
                count++;
            });
            console.log('Total birds:', this.totalRegionalBirds.length);
        },
    },
});