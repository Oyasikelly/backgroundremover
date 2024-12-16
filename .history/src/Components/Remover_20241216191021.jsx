/** @format */
import { useState } from "react";
import axios from "axios";
import chair from "../assets/chair.jpeg";
import { NavLink } from "react-router-dom";

export default function Remover({
  menu,
  setMenu,
  webURL,
  setWebURL,
  importedURL,
  setImportedURL,
}) {
  const apiKey = "0eaf034066ed7e5c243f379b2274ee09d9f82867"; // Replace with your actual API key
  const apiEndpoint = "https://sdk.photoroom.com/v1/segment";

  // Toggle Menu
  function handleMenu() {
    setMenu(() => true);
  }
  function handleCloseMenu() {
    setMenu(() => false);
  }

  // Handle URL Input
  function handleWebURL(e) {
    setWebURL(e.target.value);
  }

  // Handle File Input
  function handleImportedURL(e) {
    const file = e.target.files[0];
    setImportedURL(file);
  }

  // Remove Background from Image URL
  const removeBackground = async (imageUrl) => {
    try {
      const response = await axios.post(
        apiEndpoint,
        { url: imageUrl },
        {
          headers: {
            "x-api-key": apiKey,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Error removing background:", error);
    }
  };

  // Handle URL Submit
  const handleRemoveBackground = async (e) => {
    e.preventDefault();
    if (webURL) {
      const result = await removeBackground(webURL);
      console.log(result);
    } else {
      console.error("No URL provided");
    }
  };

  // Remove Background from Imported File
  const handleRemoveBackground_ImportedImg = async (e) => {
    e.preventDefault();
    if (!importedURL) {
      console.error("No file imported");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("image_file", importedURL);

      const response = await axios.post(apiEndpoint, formData, {
        headers: {
          "x-api-key": apiKey,
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Error removing background:", error);
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
      <header>
        <h2>Background Remover</h2>
        <nav>
          <i className="fa-solid fa-bars" onClick={handleMenu}></i>
        </nav>
      </header>
      <main className="content_container">
        <p>Type the URL of the image</p>
        <form onSubmit={handleRemoveBackground}>
          <input
            name="webURL"
            value={webURL}
            type="text"
            placeholder="Enter image URL"
            onChange={handleWebURL}
          />
          <button type="submit">Remove</button>
        </form>
        <div className="image">
          <img src={chair} alt="chair" />
        </div>
      </main>
      <main className="content_container imported-img">
        <p>Import image from your device</p>
        <form onSubmit={handleRemoveBackground_ImportedImg}>
          <input
            name="importedURL"
            className="import-img"
            type="file"
            onChange={handleImportedURL}
          />
          <button type="submit">Remove</button>
        </form>
        <div className="image">
          <img src={chair} alt="chair" />
        </div>
      </main>
    </div>
  );
}
