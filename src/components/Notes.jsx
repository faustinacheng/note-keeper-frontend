import React, { useState, useEffect } from "react";
import Note from "./Note";
import NewNote from "./NewNote";
import axios from "axios";

function Notes(props) {
    const [currNotes, setNotes] = useState([]);
    const authUser = props.user;

    useEffect(() => {
        const source = axios.CancelToken.source();

        axios
            .get(`http://localhost:5001/notes/${authUser.uid}`, {
                cancelToken: source.token,
            })
            .then((res) => {
                setNotes(res.data);
            })
            .catch((err) => {
                if (!axios.isCancel(err)) {
                    console.log(err);
                }
            });

        return () => {
            source.cancel();
        };
    });

    function addNote(title, content) {
        axios
            .post("http://localhost:5001/notes", {
                title,
                content,
                uid: authUser.uid,
            })
            .then((res) => {
                // console.log(res.data.createdNote);
                setNotes([...currNotes, res.data.createdNote]);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function deleteNote(id) {
        axios
            .delete(`http://localhost:5001/notes/${id}`)
            .then((res) => {
                // console.log(res.data);
                setNotes(currNotes.filter((note) => note._id !== id));
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function updateNote(id, updatedTitle, updatedContent) {
        // Optimistically update state
        setNotes(
            currNotes.map((note) => {
                if (note._id === id) {
                    note.title = updatedTitle;
                    note.content = updatedContent;
                }
                return note;
            })
        );

        axios
            .patch(`http://localhost:5001/notes/${id}`, {
                title: updatedTitle,
                content: updatedContent,
            })
            .catch((err) => {
                console.log(err);
                setNotes(currNotes);
            });
    }

    return (
        <div>
            <NewNote onAdd={addNote} />
            {currNotes &&
                currNotes.map((note) => {
                    return (
                        <Note
                            key={note._id}
                            id={note._id}
                            title={note.title}
                            content={note.content}
                            onDelete={deleteNote}
                            updateNote={updateNote}
                        />
                    );
                })}
        </div>
    );
}

export default Notes;
