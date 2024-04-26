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
            .get(`https://note-backend-chi.vercel.app/notes/${authUser.uid}`, {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                },
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
    }, [authUser.uid]);

    function addNote(title, content) {
        axios
            .post(
                "https://note-backend-chi.vercel.app/notes",
                {
                    title,
                    content,
                    uid: authUser.uid,
                },
                {
                    headers: {
                        "Access-Control-Allow-Origin": "*",
                    },
                }
            )
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
            .delete(`https://note-backend-chi.vercel.app/notes/${id}`, {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                },
            })
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
            .patch(
                `https://note-backend-chi.vercel.app/notes/${id}`,
                {
                    title: updatedTitle,
                    content: updatedContent,
                },
                {
                    headers: {
                        "Access-Control-Allow-Origin": "*",
                    },
                }
            )
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
