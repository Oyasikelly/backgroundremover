/** @format */
import { useState } from "react";
import { NavLink } from "react-router-dom";
export default function SavedImages({savedImage,onRemoveImage}) {


  return (
    <div className="Wrap_savedImages">
      <div className="saved_images">
        <div></div>
       
 
      </div>
      <NavLink to="/">
        <button>Back To Home</button>
      </NavLink>
    </div>
  );
}
