import { defineStore } from 'pinia'

export const useSeenBirdStore = defineStore('seenBirds', {
    state: () => ({
        totalSeenBirds: [],
        displayedSeenBirds: [],
        currentSearchTerm: '',
        page: 1,
        birdsPerPage: 20,
        isLoading: false,
        fetchingBirds: true,
    }),
    actions: {
        setBirds(birds) {
            this.totalSeenBirds = birds;
            this.generateInitialBirds();
            this.fetchingBirds = false;
        },
        clearBirds() {
            this.totalSeenBirds = [];
            this.displayedSeenBirds = [];
            this.currentSearchTerm = '';
            this.page = 1;
        },
        getAllBirds() {
            return this.totalSeenBirds;
        },
        async getBirdByName(name) {
            this.isLoading = true;

            try {
                return this.totalSeenBirds.find(bird => bird.formattedComName == name);

            } catch (error) {
                console.error('Error getting bird by id:', error);
                return null;

            } finally {
                this.isLoading = false;
            }
        },

        getDisplayedBirds() {
            return this.displayedSeenBirds;
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
                const start = this.displayedSeenBirds.length;
                const end = start + this.birdsPerPage;
                const newBirds = filteredBirds.slice(start, end);

                if (newBirds.length > 0) {
                    this.displayedSeenBirds = [...this.displayedSeenBirds, ...newBirds];
                    this.page++;
                }

                console.log('Total filtered birds: ', filteredBirds.length);
                console.log('Total displayed birds: ', this.displayedSeenBirds.length);

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
            this.displayedSeenBirds = filteredBirds.slice(0, this.birdsPerPage);
            this.page = 1;
        },
        filterBirds() {
            return this.currentSearchTerm
                ? this.totalSeenBirds.filter(bird => bird.comName.toLowerCase().includes(this.currentSearchTerm.toLowerCase()))
                : this.totalSeenBirds;
        },
        allBirdsLoaded() {
            return this.displayedSeenBirds.length >= this.totalSeenBirds.length;
        }
    },
});