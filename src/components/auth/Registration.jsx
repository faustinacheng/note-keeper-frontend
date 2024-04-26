import React from "react";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

function Registration() {
    return (
        <div className="flex w-full place-content-center mt-20">
            <div className="border-solid border-yellow-400 border-2 p-7 rounded-2xl">
                <SignIn />
            </div>
            <div className="flex items-center mx-8">
                <div>or</div>
            </div>
            <div className="border-solid border-yellow-400 border-2 p-7 rounded-2xl">
                <SignUp />
            </div>
        </div>
    );
}

export default Registration;
