/** @format */
import { useState } from "react";
import axios from "axios";

// import chair from "../assets/chair.jpeg";
// components
import Header from "./Header";
// import UrlImage from "./urlImage";
import ImportImage from "./importImage";
import Loading from "./Loading";
import Menu from "../Menu";

export default function Remover({
  menu,
  setMenu,
  // webURL,
  // setWebURL,
  importedURL,
  setImportedURL,
}) {
  const [outputImage, setOutputImage] = useState(""); // State to store the output image URL
  const [loading,setLoading]= useState(false)
  function handleMenu() {
    setMenu(() => true);
  }
  function handleCloseMenu() {
    setMenu(() => false);
  }
  // function handleWebURL(e) {
  //   setWebURL(e.target.value);
  // }
  function handleImportedURL(e) {
    setImportedURL(e.target.files[0]); // Update importedURL state with the selected file
  }

  const apiKey = "0eaf034066ed7e5c243f379b2274ee09d9f82867"; // Replace with your actual API key
  const apiEndpoint = "https://sdk.photoroom.com/v1/segment";

  // Function to remove background for URL
  // const removeBackgroundFromURL = async (imageUrl) => {
  //   try {
  //     const response = await axios.post(
  //       apiEndpoint,
  //       { image_url: imageUrl }, // API expects 'image_url', not 'url'
  //       {
  //         headers: {
  //           "x-api-key": apiKey,
  //           "Content-Type": "application/json",
  //         },
  //         responseType: "blob", // Get the response as a Blob
  //       }
  //     );
  
  //     const imageUrlBlob = URL.createObjectURL(response.data);
  //     console.log(imageUrlBlob);
  //     setOutputImage(imageUrlBlob);
  //   } catch (error) {
  //     console.error("Error removing background (URL):", error.response?.data || error.message);
  //   }
  // };
  // Function to remove background for imported image
  const removeBackgroundFromFile = async (file) => {
    try {
      setLoading(true)
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
    }finally{
      setLoading(false)
    }
  };

  // const handleRemoveBackground = async (e) => {
  //   e.preventDefault();
  //   if (webURL) {
  //     await removeBackgroundFromURL(webURL);
  //   } else {
  //     alert("Please provide an image URL.");
  //   }
  // };

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
        <Menu handleCloseMenu={handleCloseMenu} />
      )}
     <Header handleMenu={handleMenu}/>

      {/* Remove Background via URL */}
     {/* <UrlImage webURL={webURL} handleRemoveBackground={handleRemoveBackground} handleWebURL={handleWebURL} /> */}

      {/* Remove Background via Imported File */}
     <ImportImage handleRemoveBackground_ImportedImg={handleRemoveBackground_ImportedImg} handleImportedURL={handleImportedURL}  />


      {/* Output Image */}
          
        <div className="output_container">
        {loading &&  <Loading />}
      {outputImage && (
        <>
          {/* <h3>Background Removed Image:</h3> */}
         <div className="outputWrap">
          <img src={outputImage} alt="Output" />
          </div> 
        </>
        )}
        </div>
    </div>
  );
}

