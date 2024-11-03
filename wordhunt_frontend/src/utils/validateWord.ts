import { app } from "./config/firebaseConfig"; 
import { getDatabase, ref, get } from "firebase/database";
import { getAuthPromise } from "./config/auth"; 

const db = getDatabase(app);

/**
 * Utility function to check if the passed-in word is valid in the Realtime Database dictionary.
 * @param {string} word - The word to validate.
 * @returns {Promise<boolean>} - A promise that resolves to true if the word is valid, false otherwise.
 */
export const validateWord = async (word: string): Promise<boolean> => {
    try {
        await getAuthPromise();
        const wordRef = ref(db, `words/${word.toLowerCase()}`);
        const snapshot = await get(wordRef);
        return snapshot.exists();
    } catch (error) {
        console.error("Error validating word:", error);
        return false;
    }
};