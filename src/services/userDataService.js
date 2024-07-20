import axios from 'axios';

const API_URL = 'http://localhost:5000/api/birds';

export const submitUserBirdData = async (birdData) => {
    try {
        const response = await axios.post(API_URL, birdData);
        return response.data;
    } catch (error) {
        console.error('Error submitting bird data:', error);
    }
};


export const fetchUserBirdData = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/birds`);
        return response.data;
    } catch (error) {
        console.error('Error fetching birds:', error);
        throw error;
    }
};


// --- Firebase version ---

// import firebase from 'firebase/app';
// import 'firebase/firestore';

// // Firebase configuration
// // Replace with your Firebase project configuration
// const firebaseConfig = {
//     apiKey: "YOUR_API_KEY",
//     authDomain: "YOUR_AUTH_DOMAIN",
//     projectId: "YOUR_PROJECT_ID",
//     storageBucket: "YOUR_STORAGE_BUCKET",
//     messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
//     appId: "YOUR_APP_ID"
// };

// // Initialize Firebase
// firebase.initializeApp(firebaseConfig);

// // Initialize Firestore and point to the Firestore emulator
// const db = firebase.firestore();
// if (window.location.hostname === "localhost") {
//     db.useEmulator("localhost", 8080);
// }

// const collectionRef = db.collection('UserBirdData');

// export const submitUserBirdData = async (birdData) => {
//     try {
//         const docRef = await collectionRef.add({
//             ListList: birdData // Assuming birdData is an array of Bird objects
//         });
//         return { id: docRef.id, ...birdData };
//     } catch (error) {
//         console.error('Error submitting bird data:', error);
//         throw error; // It's usually a good idea to re-throw the error so the calling function can handle it
//     }
// };

// export const fetchUserBirdData = async () => {
//     try {
//         const snapshot = await collectionRef.get();
//         const birdData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//         return birdData;
//     } catch (error) {
//         console.error('Error fetching birds:', error);
//         throw error;
//     }
// };