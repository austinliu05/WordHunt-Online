const admin = require('firebase-admin');
const serviceAccount = require('./firebase_admin_private_key.json');

// Initialize Firebase Admin SDK
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://wordhunt-be669-default-rtdb.firebaseio.com"
});

const db = admin.database();

module.exports = db;
