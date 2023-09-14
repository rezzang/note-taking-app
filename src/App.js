import { useState, useEffect } from "react";
import { collection, getDocs, addDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "./services/firebase.config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "./services/firebase.config";
import "./App.css";
import CardItem from "./components/CardItem";
import OldCardItem from "./components/OldCardItem";
import { nanoid } from "nanoid";
import { v4 } from "uuid";

const App = () => {
  const [notes, setNotes] = useState([]);

  const collectionRef = collection(db, "notes");
  useEffect(() => {
    const getNotes = async () => {
      await getDocs(collectionRef).then((note) => {
        let notesData = note.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        setNotes(notesData);
      });
    };
    getNotes();
  }, []);

  console.log("notes", notes);

  const addCard = async (title, description, imageurl, url) => {
    try {
      const imageRef = ref(storage, "images/" + v4());
      const snapshot = await uploadBytes(imageRef, imageurl);
      const path = snapshot.metadata.fullPath;
      const url = await getDownloadURL(imageRef);
      console.log(url);

      await addDoc(collectionRef, {
        id: nanoid(),
        notetitle: title,
        notedescription: description,
        noteimgurl: url,
      });

      window.location.reload();
    } catch (err) {
      console.log(err);
    }
    console.log(title);
    console.log(description);
    console.log(url);
  };

  const deleteCard = async (id) => {
    try {
      if (window.confirm("Are you sure you want to delete?")) {
        const documentRef = doc(db, "notes", id);
        await deleteDoc(documentRef);
        window.location.reload();
      }
    } catch (err) {
      console.log(err);
    }
    console.log(id);
  };

  return (
    <div className="App">
      <div className="cards-container">
        <div className="cards-list">
          <CardItem handleAddCard={addCard} />
          {notes.map(({ id, notetitle, notedescription, noteimgurl }) => (
            <OldCardItem
              key={id}
              title={notetitle}
              description={notedescription}
              imageurl={noteimgurl}
              handleDeleteCard={() => deleteCard(id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
