import React, { useState } from "react";
import Button from "@mui/material/Button";

const CardItem = ({ handleAddCard }) => {
  const [newTitle, setNewTitle] = useState("New Title");
  const [newDescription, setNewDescription] = useState("New description");

  const changeTitle = (e) => {
    setNewTitle(e.target.value);
  };
  let changeDescription = (e) => {
    setNewDescription(e.target.value);
  };
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileInput = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  let imgContainer;
  if (selectedFile === null) {
    imgContainer = (
      <div className="image-box">
        <input id="file" type="file" onChange={handleFileInput} accept="image/jpeg image/png image/jpg" />
        <label className="add-image-button" htmlFor="file">
          <span className="plus">+</span>
        </label>
      </div>
    );
  } else {
    imgContainer = (
      <div className="image-box">
        <img src={selectedFile === null ? "" : URL.createObjectURL(selectedFile)} alt="" />
      </div>
    );
  }

  const handleSaveCard = () => {
    if (
      newTitle.trim().length + newDescription.trim().length > 0 &&
      newTitle !== "New Title" &&
      newDescription !== "New description" &&
      selectedFile !== null
    ) {
      handleAddCard(newTitle, newDescription, selectedFile);
      setNewTitle("New Title");
      setNewDescription("New description");
      setSelectedFile(null);
    } else alert("error: Default value for a required field. Please make sure you filled out all fields.");
  };

  return (
    <div className="carditem">
      <div className="card-form">
        <input
          type="text"
          className="title"
          onChange={changeTitle}
          value={newTitle}
          onFocus={(event) => event.target.select()}
          name="titleName"
        />
        <textarea
          name="descriptionarea"
          id="description_area"
          className="description"
          onFocus={(event) => event.target.select()}
          onChange={changeDescription}
          value={newDescription}
        />
        <div className="image-box">{imgContainer}</div>
      </div>
      <div className="card-footer">
        <Button className="card-button" onClick={handleSaveCard} size="medium" sx={{ color: "#899d73" }}>
          SAVE
        </Button>
      </div>
    </div>
  );
};

export default CardItem;
