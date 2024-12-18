/** @format */
import { NavLink } from "react-router-dom";
export default function SavedImages({savedImage, onRemoveImage, Ondownload}) {


  return (
    <div className="Wrap_savedImages">
      <div className="saved_images">
        {savedImage.map((item, index)=>(
          <div>
            {<img src={item} alt={`image ${index+1}`}/>}
            <div>
            <button onClick={onRemoveImage} className="deleteBtn">delete</button>
            <span onClick={Ondownload} className="downloadbtn">download</span>
            </div>
          </div>
        ))}
       
 
      </div>
      <NavLink to="/">
        <button>Back To Home</button>
      </NavLink>
    </div>
  );
}
