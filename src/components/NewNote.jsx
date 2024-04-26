import React, { useState } from "react";

function NewNote(props) {
    const [note, setNote] = useState({
        title: "",
        content: "",
    });

    function handleChange(event) {
        const { name, value } = event.target;

        setNote((prevNote) => {
            if (name === "title") {
                return {
                    title: value,
                    content: prevNote.content,
                };
            } else if (name === "content") {
                return {
                    title: prevNote.title,
                    content: value,
                };
            }
        });
    }

    function handleClick(event) {
        props.onAdd(note.title, note.content);
        setNote({ title: "", content: "" });
        event.preventDefault();
    }

    return (
        <form onSubmit={handleClick} className="newNote">
            <input
                onChange={handleChange}
                name="title"
                type="text"
                placeholder="Title"
                value={note.title}
                className="font-bold text-xl p-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent border-2 mb-1"
            />
            <textarea
                onChange={handleChange}
                name="content"
                placeholder="Take a note..."
                value={note.content}
                className="text-lg p-2 mb-2 resize-none focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent border-2"
            />
            <button type="submit">Add</button>
        </form>
    );
}

export default NewNote;
