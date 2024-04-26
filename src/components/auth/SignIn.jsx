import React, { useState } from "react";
import {
    getAuth,
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
} from "firebase/auth";
import Modal from "react-modal";

Modal.setAppElement("#root");

function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [currError, setError] = useState("");
    const [modalIsOpen, setModalIsOpen] = useState(false);

    function resetPassword() {
        setError("");
        const auth = getAuth();
        sendPasswordResetEmail(auth, email)
            .then(() => {
                setModalIsOpen(true);
            })
            .catch((error) => {
                const errorCode = error.code;
                if (errorCode === "auth/invalid-credential") {
                    setError("Wrong email/password");
                } else if (errorCode === "auth/invalid-email") {
                    setError("Invalid email");
                }
            });
    }

    function handleEmailChange(event) {
        setEmail(event.target.value);
    }

    function handlePasswordChange(event) {
        setPassword(event.target.value);
    }

    function signIn(event) {
        event.preventDefault();
        setError("");

        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password).catch((error) => {
            const errorCode = error.code;
            if (errorCode === "auth/invalid-credential") {
                setError("Wrong email/password");
            } else if (errorCode === "auth/invalid-email") {
                setError("Invalid email");
            } else if (errorCode === "auth/missing-password") {
                setError("Please enter password");
            }
            // console.log(errorCode);
        });
    }

    return (
        <div className="relative">
            <form onSubmit={signIn}>
                <h1 className="mb-1 text-2xl font-bold text-center">
                    Welcome Back
                </h1>
                <h2 className="mb-10 text-base text-center">
                    Enter your credentials to login
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
                <div
                    className="absolute text-sm text-yellow-500 text-right w-full"
                    onClick={resetPassword}
                >
                    <p className="cursor-pointer inline-block">
                        Reset Password
                    </p>
                </div>
                <button
                    className="mt-8 yellow-bg py-3 w-full rounded-md font-bold"
                    type="submit"
                >
                    Login
                </button>
            </form>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                contentLabel="Password Reset Modal"
                style={{
                    content: {
                        width: "400px",
                        height: "180px",
                        margin: "auto",
                        borderColor: "#f5ba13",
                    },
                }}
            >
                <h2 className="text-lg font-bold">Password Reset</h2>
                <p>Password reset email sent to {email} if it's registered.</p>
                <button
                    className="yellow-bg p-2 w-full rounded-md mt-5"
                    onClick={() => setModalIsOpen(false)}
                >
                    Close
                </button>
            </Modal>
        </div>
    );
}

export default SignIn;
