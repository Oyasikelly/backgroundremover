/** @format */
import { useState } from "react";
import axios from "axios";

// import chair from "../assets/chair.jpeg";
import { NavLink } from "react-router-dom";

// components
import Header from "./Header";
import UrlImage from "./urlImage";
import ImportImage from "./importImage";

export default function Remover({
  menu,
  setMenu,
  webURL,
  setWebURL,
  importedURL,
  setImportedURL,
}) {
  const [outputImage, setOutputImage] = useState(""); // State to store the output image URL

  function handleMenu() {
    setMenu(() => true);
  }
  function handleCloseMenu() {
    setMenu(() => false);
  }
  function handleWebURL(e) {
    setWebURL(e.target.value);
  }
  function handleImportedURL(e) {
    setImportedURL(e.target.files[0]); // Update importedURL state with the selected file
  }

  const apiKey = "0eaf034066ed7e5c243f379b2274ee09d9f82867"; // Replace with your actual API key
  const apiEndpoint = "https://sdk.photoroom.com/v1/segment";

  // Function to remove background for URL
  const removeBackgroundFromURL = async (imageUrl) => {
    try {
      const response = await axios.post(
        apiEndpoint,
        { url: imageUrl }, // JSON body with the URL
        {
          headers: {
            "x-api-key": apiKey,
            "Content-Type": "application/json",
          },
          responseType: "blob", // Get response as Blob for the image
        }
      );

      const imageUrlBlob = URL.createObjectURL(response.data);
      console.log(imageUrlBlob)
      setOutputImage(imageUrlBlob);
    } catch (error) {
      console.error("Error removing background (URL):", error);
    }
  };

  // Function to remove background for imported image
  const removeBackgroundFromFile = async (file) => {
    try {
      const formData = new FormData();
      formData.append("image_file", file); // Append file to FormData

      const response = await axios.post(apiEndpoint, formData, {
        headers: {
          "x-api-key": apiKey,
          "Content-Type": "multipart/form-data",
        },
        responseType: "blob", // Ensure response is a Blob
      });

      const imageUrlBlob = URL.createObjectURL(response.data);
      setOutputImage(imageUrlBlob);
    } catch (error) {
      console.error("Error removing background (File):", error);
    }
  };

  const handleRemoveBackground = async (e) => {
    e.preventDefault();
    if (webURL) {
      console.log(webURL)
      await removeBackgroundFromURL(webURL);
    } else {
      alert("Please provide an image URL.");
    }
  };

  const handleRemoveBackground_ImportedImg = async (e) => {
    e.preventDefault();
    if (importedURL) {
      await removeBackgroundFromFile(importedURL);
    } else {
      alert("Please import an image.");
    }
  };

  return (
    <div className="container">
      {menu && (
        <div className="Menu" onClick={handleCloseMenu}>
          <span style={{ fontSize: "24px" }}>&#10006;</span>
          <NavLink to="/SavedImages">
            <p>See Saved Images</p>
          </NavLink>
        </div>
      )}
     <Header handleMenu={handleMenu}/>

      {/* Remove Background via URL */}
     <UrlImage webURL={webURL} handleRemoveBackground={handleRemoveBackground} handleWebURL={handleWebURL} />

      {/* Remove Background via Imported File */}
     <ImportImage handleRemoveBackground_ImportedImg={handleRemoveBackground_ImportedImg} handleImportedURL={handleImportedURL}  />

      {/* Output Image */}
      {outputImage && (
        <div className="output_container">
          <h3>Background Removed Image:</h3>
         <div className="outputWrap">
          <img src={outputImage} alt="Output" />
          </div> 
        </div>
      )}
    </div>
  );
}