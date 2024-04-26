import React, { useState, useEffect, useRef } from "react";

function Note(props) {
    const [isEditing, setEditing] = useState(false);
    const [updatedTitle, setUpdatedTitle] = useState(props.title);
    const [updatedContent, setUpdatedContent] = useState(props.content);
    const titleInputRef = useRef(null);

    useEffect(() => {
        if (isEditing) {
            titleInputRef.current.focus();
        }
    }, [isEditing]);

    function handleEdit() {
        setEditing(true);
    }

    function handleDoneEdit(event) {
        event.preventDefault();
        props.updateNote(props.id, updatedTitle, updatedContent);
        setEditing(false);
    }

    function handleClick() {
        props.onDelete(props.id);
    }

    return (
        <div className="note">
            {isEditing ? (
                <div>
                    <form onSubmit={handleDoneEdit}>
                        <input
                            ref={titleInputRef}
                            name="title"
                            type="text"
                            value={updatedTitle}
                            placeholder="Title"
                            onChange={(e) => setUpdatedTitle(e.target.value)}
                            className="font-bold text-lg px-1 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent border-2 mb-1"
                        />
                        <textarea
                            name="content"
                            type="text"
                            value={updatedContent}
                            placeholder="Your updated content here..."
                            onChange={(e) => setUpdatedContent(e.target.value)}
                            className="text-base px-1 resize-none focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent border-2"
                        />
                        <button
                            type="submit"
                            className="done rounded-md text-sm"
                        >
                            DONE
                        </button>
                    </form>
                </div>
            ) : (
                <div>
                    <h1 className="font-bold text-lg px-1 mb-1">
                        {props.title}
                    </h1>
                    <p className="text-base px-1">{props.content}</p>

                    <button
                        className="rounded-md text-sm"
                        onClick={handleClick}
                    >
                        DELETE
                    </button>
                    <button className="rounded-md text-sm" onClick={handleEdit}>
                        EDIT
                    </button>
                </div>
            )}
        </div>
    );
}

export default Note;
