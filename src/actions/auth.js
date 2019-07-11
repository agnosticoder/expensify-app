import { firebase, googleAuthProvider } from '../firebase/firebase';

//LOGIN
export const login = (uid) => {
    return {
        type: 'LOGIN',
        uid: uid
    }
};


export const startLogin = () => {
    return () => {
        return firebase.auth().signInWithPopup(googleAuthProvider).then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            // ...
        });
    };
};


//LOGOUT
export const logout = () => {
    return {
        type: 'LOGOUT'
    }
};

export const startLogout = () => {
    return () => {
        return firebase.auth().signOut();
    };
};
