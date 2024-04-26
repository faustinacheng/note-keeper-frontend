import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import Registration from "./auth/Registration";
import Notes from "./Notes";
import { useAuthState } from "react-firebase-hooks/auth";

// console.log(process.env);

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.REACT_APP_APIKEY,
    authDomain: process.env.REACT_APP_AUTHDOMAIN,
    projectId: process.env.REACT_APP_PROJECTID,
    storageBucket: process.env.REACT_APP_STORAGEBUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
    appId: process.env.REACT_APP_APPID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

function App() {
    const [user, loading] = useAuthState(auth);

    function logOut() {
        auth.signOut()
            .then(() => {
                console.log("Logged out");
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <div>
            <Header user={user} logOut={logOut} />
            {loading ? null : user ? <Notes user={user} /> : <Registration />}
            <Footer />
        </div>
    );
}

export default App;
