import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

function SignUp() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [currError, setError] = useState("");

    function handleEmailChange(event) {
        setEmail(event.target.value);
    }

    function handlePasswordChange(event) {
        setPassword(event.target.value);
    }

    function signUp(event) {
        event.preventDefault();
        setError("");

        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                console.log(user);
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
                if (errorCode === "auth/weak-password") {
                    setError("Password should be at least 6 characters");
                } else if (errorCode === "auth/email-already-in-use") {
                    setError("Email already registered");
                } else if (errorCode === "auth/invalid-email") {
                    setError("Invalid email");
                } else if (errorCode === "auth/missing-password") {
                    setError("Please enter password");
                } else if (errorCode === "auth/missing-email") {
                    setError("Please enter email");
                }
            });
    }

    return (
        <div className="">
            <form onSubmit={signUp}>
                <h1 className="mb-1 text-2xl font-bold text-center">
                    New User
                </h1>
                <h2 className="mb-10 text-base text-center">
                    Create an account
                </h2>
                <input
                    type="email"
                    value={email}
                    placeholder="Email"
                    onChange={handleEmailChange}
                    className="p-2 mb-5 rounded"
                />
                <input
                    type="password"
                    value={password}
                    placeholder="Password"
                    onChange={handlePasswordChange}
                    className="p-2 rounded mb-4"
                />
                <div className="absolute text-sm text-red-500">{currError}</div>
                <button
                    className="mt-8 yellow-bg py-3 w-full rounded-md font-bold"
                    type="submit"
                >
                    Sign Up
                </button>
            </form>
        </div>
    );
}

export default SignUp;
