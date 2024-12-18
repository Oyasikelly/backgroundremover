/** @format */
import { NavLink } from "react-router-dom";
export default function SavedImages({savedImage, onRemoveImage}) {


  return (
    <div className="Wrap_savedImages">
      <div className="saved_images">
        {savedImage.map((item, index)=>(
          <div>
            {<img src={item} alt={`image ${index+1}`}/>}
            <button style={{backgroundColor:""}}>delete</button>
          </div>
        ))}
       
 
      </div>
      <NavLink to="/">
        <button>Back To Home</button>
      </NavLink>
    </div>
  );
}
