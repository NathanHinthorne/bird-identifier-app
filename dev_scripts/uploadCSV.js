import admin from 'firebase-admin';
import csv from 'csv-parser';
import fs from 'fs';
import serviceAccount from './serviceAccountKey.json' assert { type: 'json' };

// Initialize Firebase Admin SDK
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

const csvFilePath = './birds.csv';

fs.createReadStream(csvFilePath)
    .pipe(csv())
    .on('data', async (row) => {
        try {
            await db.collection('birds').add(row);
            console.log('Document successfully written!', row);
        } catch (error) {
            console.error('Error writing document: ', error);
        }
    })
    .on('end', () => {
        console.log('CSV file successfully processed.');
    });