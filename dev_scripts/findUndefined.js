import admin from 'firebase-admin';
import serviceAccount from './serviceAccountKey.json' assert { type: 'json' };

// Initialize Firebase Admin SDK
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

const birdsRef = firestore.collection('birds');

// Query for documents where 'comName' does not exist
const query = birdsRef.where('comName', '==', null);

// Fetch the documents
query.get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        console.log(doc.id, '=>', doc.data());
    });
}).catch((error) => {
    console.error('Error getting documents: ', error);
});
