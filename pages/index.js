import Head from 'next/head'
import Image from 'next/image'
import { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import { FaBars } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";
import NoteItem from '../components/noteItem'


export default function Home() {

  const [notes, setNotes] = useState([]);
  const [active, setActive] = useState(0);
  // const [isEmpty, setisEmpty] = useState(0);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [navbar, setNavbar] = useState(0);

  const loadNotes = () => {
    // Load notes if exists otherwise create blank array
    if (localStorage.getItem("notes")) {
      const data = JSON.parse(localStorage.getItem("notes"));
      setNotes(data);
      if (data.length > 0) {
        setActive(0);
        setTitle(data[0].title);
        setText(data[0].text);
      }
    } else {
      localStorage.setItem("notes", "[]");
    }
  };

  // Change notes
  const changeNote = (id) => {
    setActive(id);
    const note = notes[id];
    setTitle(note.title);
    setText(note.text);
  };

  // Add Note function
  const addNote = () => {
    if (!notes.length) {
      var newNotes = [{ id: 1, title: "", text: "" }];
    } else {
      var newNotes = [{ id: notes.at(-1).id + 1, title: "", text: "" }];
    }
    // Update notes
    localStorage.setItem("notes", JSON.stringify([...notes, ...newNotes]));
    // Loading notes
    loadNotes();
  };

  // Update note function
  const updateTitle = (e) => {
    // Getting update title
    const newTitle = e.target.value;
    setTitle(newTitle);
    notes[active].title = newTitle;
    localStorage.setItem("notes", JSON.stringify(notes));
  };

  const updateText = (e) => {
    // Getting update text
    const newText = e.target.value;
    setText(newText);
    notes[active].text = newText;
    localStorage.setItem("notes", JSON.stringify(notes));
  };

  // Remove note function
  const removeNote = (index) => {
    const newNotes = notes.filter((e, i) => i !== index);
    localStorage.setItem("notes", JSON.stringify(newNotes));
    loadNotes();
  };

  // useEffect
  useEffect(() => {
    // Loading notes
    loadNotes();
  }, []);

  return (
    <div className='lg:flex flex-row h-screen justify-start '>
      {/* Navbar */}
      <div className='bg-purple-800 text-white lg:hidden absolute top-0 inset-x-0 lg:relative'>
        <div className='flex justify-between items-center '>
          <div className='px-2' onClick={() => setNavbar(!navbar)}>
            {navbar ? (<FaTimes size={'3em'} className='p-2 items-center' />) : (<FaBars size={'3em'} className='p-2 items-center' />)}
          </div>
          <div className='font-extrabold text-3xl p-4'>Notdem</div>
          <button className='cursor-pointer p-1 m-4 rounded focus:outline-none border-gray-100 hover:border-2' onClick={addNote}>
            <FaPlus />
          </button>
        </div>
        <hr className="w-full border-10 border-gray-100 items-center" />
      </div>
      <div className='flex flex-col justify-items-start bg-purple-800 text-gray-100'>
          
          {navbar ? <div className=' h-screen flex flex-col w-full flex-auto gap-2 items-center p-4 overflow-y-auto transform translate-x-0 ease-in-out mt-16'>
              {notes.map((res, key) => (
                <NoteItem
                  key={key}
                  active={active == key}
                  title={res.title}
                  text={res.text}
                  onClick={() => {
                    changeNote(key);
                  }}
                  onRemove={() => {
                    removeNote(key);
                  }}
                />
              ))}
            </div> :
            <div className='flex flex-col w-full flex-auto items-center  transform -translate-x-full ' />}
        </div>


      {/* Sidebar */}
      <div className='flex bg-purple-800 text-white absolute inset-y-0 left-0 transform -translate-x-full transition duration-200 ease-in-out lg:relative lg:translate-x-0'>
        <div className='flex flex-col h-screen items-center'>
          <div className='flex flex-row justify-between p-5 pt-8 w-72 items-center' >
            <div className='font-extrabold text-3xl'>
              Notdem
            </div>
            <button className='text- cursor-pointer p-1 rounded border-gray-100 hover:border-2' onClick={addNote}>
              <FaPlus />
            </button>
          </div>
          <hr className="w-10/12 border-10 border-gray-100 " />
          <div className='flex flex-col w-full  flex-auto gap-2 items-center p-4 overflow-y-auto mb-4'>
            {notes.map((res, key) => (
              <NoteItem
                key={key}
                active={active == key}
                title={res.title}
                text={res.text}
                onClick={() => {
                  changeNote(key);
                }}
                onRemove={() => {
                  removeNote(key);
                }}
              />
            ))}
          </div>

          <hr className="w-10/12 border-10 border-gray-100 " />
          <div className='flex flex-col-reverse basis-1/12 items-center'>
            <div className='mb-6 text-gray-100'>Made with NextJS and TailwindCSS</div>
          </div>

        </div>
      </div>


      {/* <div className='bg-gray-100 w-screen h-screen flex justify-center items-center '>
        <div className='bg-gray-200 rounded-xl px-16 py-64 text-3xl font-bold text-center'>
          <div>Add new note by clicking at </div>
          <div>+</div> Button
          </div>
      </div> */}

      {/* Textbox area  */}
      <div className='flex flex-row w-full bg-gray-100'>
        <div className='flex flex-row w-full bg-gray-100'>
          <form action='' className='flex flex-col w-full pt-10'>
            <input type="text" className="flex mt-10 ml-5 mr-5 mb-5 font-extrabold text-3xl items-center bg-gray-100 content-wrap border-2 p-2 md:text-4xl lg:text-6xl"
              placeholder="Title"
              onChange={updateTitle}
              value={title}
              disabled={!notes.length}
            />
            <textarea className='bg-gray-100 flex mx-5 h-screen mb-4 border-2 overflow-auto text-2xl p-4'
              placeholder="Start Writing here..."
              onChange={updateText}
              value={text}
              disabled={!notes.length}

            />
          </form>
        </div>
      </div>


    </div>
  )
}
