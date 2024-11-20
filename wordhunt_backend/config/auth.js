const { getAuth, signInAnonymously, onAuthStateChanged } = require("firebase/auth");
const { app } = require("./firebaseConfig");

const auth = getAuth(app);

/**
 * Ensures a user is authenticated before proceeding.
 * If no user is signed in, it will sign in anonymously.
 * @returns {Promise<void>} Resolves when authentication is confirmed.
 */
const getAuthPromise = () => {
    return new Promise((resolve, reject) => {
        if (auth.currentUser) {
            resolve();
        } else {
            const unsubscribe = onAuthStateChanged(auth, (user) => {
                if (user) {
                    unsubscribe()
                    resolve();
                } else {
                    // Sign in anonymously if no user is signed in
                    signInAnonymously(auth)
                        .then(() => {
                            unsubscribe(); // Clean up listener
                            resolve();
                        })
                        .catch((error) => {
                            unsubscribe(); // Clean up listener
                            reject(error);
                        });
                }
            });
        }
    });
};

module.exports = { getAuthPromise };
