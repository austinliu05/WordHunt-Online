import { getAuth, signInAnonymously, onAuthStateChanged } from "firebase/auth";
import { app } from "./firebaseConfig";

const auth = getAuth(app);

const getAuthPromise = (): Promise<void> => {
    return new Promise((resolve, reject) => {
        if (auth.currentUser) {
            resolve(); // User is already signed in
        } else {
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    resolve(); 
                } else {
                    signInAnonymously(auth)
                        .then(() => resolve())
                        .catch((error) => reject(error));
                }
            });
        }
    });
};

export { getAuthPromise };
