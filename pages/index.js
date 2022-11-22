import Head from "next/head";
import { useState, useEffect } from "react";
import { NoteItem } from "../components/noteItem";

export default function Home() {
  // Creating notes state for storing notes as a array
  const [notes, setNotes] = useState([]);
  // Active state
  const [active, setActive] = useState(0);
  // Full text state
  const [text, setText] = useState("");

  // Load notes
  const loadNotes = () => {
    // Load notes if exists otherwise create blank array
    if (localStorage.getItem("notes")) {
      const data = JSON.parse(localStorage.getItem("notes"));
      setNotes(data);
      if (data.length > 0) {
        setActive(0);
        setText(data[0].text);
      }
    } else {
      localStorage.setItem("notes", "[]");
    }
  };

  // Change notes
  const changeNote = (id) => {
    // Set active note
    setActive(id);
    // Get note information from id
    const note = notes[id];
    // Update text
    setText(note.text);
  };

  // Add Note function
  const addNote = () => {
    if (!notes.length) {
      var newNotes = [{ id: 1, text: "" }];
    } else {
      var newNotes = [{ id: notes.at(-1).id + 1, text: "" }];
    }
    // Update notes
    localStorage.setItem("notes", JSON.stringify([...notes, ...newNotes]));
    // Loading notes
    loadNotes();
  };

  // Update note function
  const updateNote = (e) => {
    // Getting update text
    const newText = e.target.value;
    // Change text
    setText(newText);
    // Update in state
    notes[active].text = newText;
    // Update in local storage
    localStorage.setItem("notes", JSON.stringify(notes));
  };

  // Remove note function
  const removeNote = (index) => {
    // Remove note from array
    const newNotes = notes.filter((e, i) => i !== index);
    // Update notes in local storage
    localStorage.setItem("notes", JSON.stringify(newNotes));
    // Load notes
    loadNotes();
  };

  // useEffect
  useEffect(() => {
    // Loading notes
    loadNotes();
  }, []);

  return (
    <>
      <Head>
        <title>Notdem</title>
        <meta
          name="description"
          content="iNote is a way to store notes in local storage."
        />
      </Head>
      <main className="block">
        <div className="container-fluid mx-auto flex justify-between flex-wrap">
          <div className="lg:w-3/12 w-full p-4 lg:h-screen overflow-auto pr-3">
            <ul>
              <NoteItem
                text="Add New Note"
                onClick={addNote}
                removeButton={false}
                className="bg-gray-600 text-gray-50 hover:bg-gray-700"
              />
              {notes.map((res, key) => (
                <NoteItem
                  key={key}
                  active={active == key}
                  text={res.text}
                  onClick={() => {
                    changeNote(key);
                  }}
                  onRemove={() => {
                    removeNote(key);
                  }}
                />
              ))}
            </ul>
          </div>
          <textarea
            className="resize-none lg:w-9/12 w-full p-4 lg:h-screen overflow-auto pr-3 border-l bg-white text-xl text-gray-600 outline-none leading-8	text-justify"
            placeholder="Start Writing..."
            onChange={updateNote}
            value={text}
            disabled={!notes.length}
          />
        </div>
      </main>
    </>
  );
}
