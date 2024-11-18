const db = require('./config/firebaseConfig');

const deleteWordsNodeInBatches = async (batchSize = 100) => {
    try {
        const wordsRef = db.ref('/words');
        let snapshot;

        do {
            snapshot = await wordsRef.limitToFirst(batchSize).once('value');
            const batchData = snapshot.val();

            if (batchData) {
                const updates = {};
                Object.keys(batchData).forEach(key => {
                    updates[key] = null;
                });

                await wordsRef.update(updates);
                console.log(`Deleted a batch of ${Object.keys(batchData).length} words.`);
            }
        } while (snapshot.exists()); 

        console.log('All data in the "words" node has been deleted successfully!');
    } catch (error) {
        console.error('Error deleting data in batches:', error);
    }
};

deleteWordsNodeInBatches(100);
