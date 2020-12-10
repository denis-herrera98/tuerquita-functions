import firebase from 'firebase/app';
import * as admin from 'firebase-admin'

admin.initializeApp();

const firebaseConfig = {
  apiKey: process.env.DB_API_KEY,
  authDomain:process.env.DB_AUTH_DOMAIN,
  projectId: process.env.DB_PROJECT_ID,
  storageBucket:process.env.DB_STORAGE_BUCKET,
  messagingSenderId:process.env.DB_MESSAGING_SENDERID,
  appId: process.env.DB_APP_ID,
  measurementId:process.env.DB_MEASUREMENT_ID,
};

firebase.initializeApp(firebaseConfig);

const db = admin.firestore();

module.exports = {
  db,
  admin,
};





