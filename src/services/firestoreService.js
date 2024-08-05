import { auth, rtdb, firestore } from '@/firebase';
import { doc, getDoc, getDocs, collection, query, where } from 'firebase/firestore';

export const firestoreService = {
    /**
     * Fetches all birds in the given location from Firestore
     * 
     * @param {string} location - Location name
     * @returns {Promise<object[]>} - Array of bird objects
     */
    async fetchRegionalBirds(location) {
        console.log('Fetching regional birds...');
        const birdsRef = collection(firestore, "birds");
        const querySnapshot = await getDocs(birdsRef);
        const birds = querySnapshot.docs.map(doc => doc.data());
        return birds;
    },

    /**
     * Fetches birds by name from Firestore
     * 
     * @param {string[]} names - Array of bird names
     * @returns {Promise<object[]>} - Array of bird objects
     */
    async fetchBirdsByName(names) {
        const birdsRef = collection(firestore, "birds");
        // group all names in a single query to reduce calls to firestore
        const q = query(birdsRef, where("formattedComName", "in", names));
        const querySnapshot = await getDocs(q);
        const birds = querySnapshot.docs.map(doc => doc.data());
        return birds;
    }
};