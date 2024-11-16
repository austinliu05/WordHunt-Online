const db = require('./config/firebaseConfig');
const fs = require('fs');

const isValidWord = (word) => {
    const invalidCharacters = /[.#$[\]]/; 
    return !invalidCharacters.test(word); 
};

const uploadDataFromTxt = async () => {
    try {
        const data = fs.readFileSync('words.txt', 'utf8').split('\n');
        
        for (let i = 0; i < data.length; i++) {
            const word = data[i].trim(); // Remove any extra spaces or line breaks
            if (!isValidWord(word)) {
                console.log(`Skipped invalid word: ${word}`);
                continue; 
            }
            await db.ref(`/words/${word}`).set(word); 
            console.log(`Uploaded word: ${word}`);
        }
        console.log('All words uploaded successfully!');
    } catch (error) {
        console.error('Error uploading data:', error);
    }
};

uploadDataFromTxt();
