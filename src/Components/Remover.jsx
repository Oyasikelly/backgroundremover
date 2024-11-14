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
    setImportedURL(e.target.value);
  }

  const removeBackground = async (imageUrl) => {
    // const apiKey = "0eaf034066ed7e5c243f379b2274ee09d9f82867"; // Replace with your actual API key
    const apiKey = "sandbox_0eaf034066ed7e5c243f379b2274ee09d9f82867"; // Replace with your actual API key
    const apiEndpoint = `https://image-api.photoroom.com/v2/edit?background.color=ffffff&maxHeight=500&maxWidth=500&imageUrl=${imageUrl}`;

    try {
      const response = await axios.post(
        apiEndpoint,
        {
          url: imageUrl, // URL of the image to remove the background
        },
        {
          headers: {
            "x-api-key": apiKey,
            "Content-Type": "application/json",
          },
        }
      );

      // Process response data
      console.log(response.data);
      return response.data; // This will contain the background-removed image URL or data
    } catch (error) {
      console.error("Error removing background:", error);
    }
  };

  const handleRemoveBackground = async (e) => {
    e.preventDefault();
    await removeBackground(webURL);
  };

  const handleRemoveBackground_ImportedImg = async (e) => {
    e.preventDefault();
    await removeBackground(importedURL);
  };
  return (
    <div className="container">
      {menu === true && (
        <div className="Menu" onClick={handleCloseMenu}>
          <span style={{ fontSize: "24px" }}>&#10006;</span>
          {/* <span style={{font-size: "24px"}}>&#10006;</span> */}
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
          <button>Remove</button>
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
            value={importedURL}
            className="import-img"
            type="file"
            placeholder="Enter image URL"
            onChange={handleImportedURL}
          />
          <button>Remove</button>
        </form>
        <div className="image">
          <img src={chair} alt="chair" />
        </div>
      </main>
    </div>
  );
}
