import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

const OldCardItem = ({ id, title, description, imageurl, handleDeleteCard }) => {
  return (
    <div>
      <div className="old-carditem">
        <div className="card-form">
          <input type="text" className="title" value={title} readOnly />
          <textarea className="description" value={description} readOnly></textarea>
          <div className="image-box">
            <img src={imageurl} alt="" />
          </div>
        </div>
        <div className="card-footer">
          <IconButton className="card-button" onClick={() => handleDeleteCard(id)} aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default OldCardItem;
