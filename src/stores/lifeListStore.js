import { defineStore } from 'pinia'

// -- IdentifiedBird object --
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
// learnMoreLink: string;
// userNote: string;
// observationDate: string;
// location: string;


export const useLifeListStore = defineStore('lifeList', {
    state: () => ({
        totalLifeList: [],
        displayedLifeList: [],
        currentSearchTerm: '',
        page: 1,
        birdsPerPage: 20,
        isLoading: false,
    }),
    actions: {
        setBirds(birds) {
            this.totalLifeList = birds;
            this.generateInitialBirds();
        },
        clearBirds() {
            this.totalLifeList = [];
            this.displayedLifeList = [];
            this.currentSearchTerm = '';
            this.page = 1;
        },
        getAllBirds() {
            return this.totalLifeList;
        },

        getDisplayedBirds() {
            return this.displayedLifeList;
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
                const start = this.displayedLifeList.length;
                const end = start + this.birdsPerPage;
                const newBirds = filteredBirds.slice(start, end);

                if (newBirds.length > 0) {
                    this.displayedLifeList = [...this.displayedLifeList, ...newBirds];
                    this.page++;
                }

                console.log('Total filtered birds: ', filteredBirds.length);
                console.log('Total displayed birds: ', this.displayedLifeList.length);

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
            this.displayedLifeList = filteredBirds.slice(0, this.birdsPerPage);
            this.page = 1;
        },
        filterBirds() {
            return this.currentSearchTerm
                ? this.totalLifeList.filter(bird => bird.comName.toLowerCase().includes(this.currentSearchTerm.toLowerCase()))
                : this.totalLifeList;
        },
    },
});