import firebase from "firebase";

const config = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: ""
};

export const firebaseLogin = (email, password) => {
    return new Promise(resolve => {
        if (!firebase.apps.length) {
            firebase.initializeApp(config); //initiate first time only
        }
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .catch(error => {
                resolve(error);
            })
            .then(user => {
                if (user) {
                    resolve(user);
                }
            });
    });
};

export const firebaseCreateAccount = (name, email, password) => {
    return new Promise(resolve => {
        if (!firebase.apps.length) {
            firebase.initializeApp(config); //initiate first time only
        }
        firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .catch(error => {
                resolve(error);
            })
            .then(info => {
                if (info) {
                    firebase.auth().currentUser.updateProfile({
                        displayName: name
                    });
                    resolve(true);
                }
            });
    });
};
