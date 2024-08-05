import admin from 'firebase-admin';
import serviceAccount from './serviceAccountKey.json' assert { type: 'json' };

// Initialize Firebase Admin SDK
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();


// Function to fetch birds by formattedComName
async function getBirdsByNames(formattedComNames) {
    const birds = [];

    // Iterate through the list of formattedComNames
    for (const name of formattedComNames) {
        // Create a query for each name
        const query = db.collection('birds').where('formattedComName', '==', name);

        // Execute the query and get the results
        const snapshot = await query.get();

        // Add each matching bird to the birds list
        snapshot.forEach(doc => {
            birds.push(doc.data());
        });
    }

    // Return the list of birds
    return birds;
}

// Function to fetch birds by formattedComName
async function getBirdsByNames2(formattedComNames) {
    // Create a query using the 'in' clause
    const query = db.collection('birds').where('formattedComName', 'in', formattedComNames);

    // Execute the query and get the results
    const snapshot = await query.get();

    // Extract the bird data from the snapshot
    const birds = snapshot.docs.map(doc => doc.data());

    // Return the list of birds
    return birds;
}

// Example usage:
const namesToSearch = ['Canada_Goose'];

getBirdsByNames2(namesToSearch)
    .then(birds => {
        console.log('Found birds:', birds);
    })
    .catch(error => {
        console.error('Error fetching birds:', error);
    });