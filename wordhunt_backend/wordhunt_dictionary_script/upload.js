const db = require('./config/firebaseConfig');
const fs = require('fs');

// Read the JSON file
const data = JSON.parse(fs.readFileSync('words_dictionary.json', 'utf8'));

const entries = Object.entries(data).slice(78620);

const uploadData = async () => {
    try {
        for (const [word, value] of entries){
            await db.ref(`/words/${word}`).set(value);
            console.log(`Uploaded word: ${word}`);
        }
        console.log('All words uploaded successfully!');
    } catch (error) {
        console.error('Error uploading data:', error);
    }
};

uploadData();
