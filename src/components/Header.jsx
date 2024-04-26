import React from "react";

function Header(props) {
    const user = props.user;

    return (
        <header>
            <div className="flex items-center justify-between">
                <h1 className="text-3xl">Keeper</h1>
                {user ? (
                    <div className="flex place-items-center">
                        <p className="mr-2">Hi, {user.email}</p>
                        <button
                            className="rounded-md px-4"
                            onClick={props.logOut}
                        >
                            Log Out
                        </button>
                    </div>
                ) : null}
            </div>
        </header>
    );
}

export default Header;
