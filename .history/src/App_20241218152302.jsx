/** @format */

// import { useState } from "react";
import { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Remover from "./Components/Remover";
import SavedImages from "./Components/SavedImages";
export default function App() {
  const [menu, setMenu] = useState(false);
  const [webURL, setWebURL] = useState("");
  const [importedURL, setImportedURL] = useState("");
  const [outputImage, setOutputImage] = useState(""); // State to store the output image URL
  const [savedImage, setSavedImage]=useState([])

    // Ensure localStorage is only accessed in the browser
    useEffect(() => {
      if (typeof window !== "undefined") {
        const saved = localStorage.getItem("savedImage");
        setSavedImage(saved ? JSON.parse(saved) : []);
      }
    }, []);

     // Update localStorage when shortUrl changes
  useEffect(() => {
    if (outputImage) {
      setSavedImage((prevImage) => {
        if (!prevImage.includes(outputImage)) {
          const updatedImages = [...prevImage, outputImage];
          localStorage.setItem("savedImage", JSON.stringify(updatedImages));
          return updatedImages;
        }
        return prevImage; // Avoid unnecessary state updates
      });
    }
  }, [outputImage])


    // Remove URL from localStorage and state
    const handleRemove = (imageToRemove) => {
      const updatedImage = storedUrls.filter((image) => image !== imageToRemove);
      setSavedImage(updatedImage);
      if (typeof window !== "undefined") {
        localStorage.setItem("savedImage", JSON.stringify(updatedImage));
      }
    };


  // Download localStorage data as a file
  const downloadData = () => {
    const userData = localStorage.getItem('savedImage');
    if (userData) {
      const blob = new Blob([userData], { type: 'application/json' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'userData.json';
      link.click();
    } else {
      alert('No data found in localStorage to download!');
    }
  };

  return (
    <BrowserRouter>
      <div className="wrapper">
        <Routes>
          <Route
            path="/"
            element={
              <Remover
                menu={menu}
                setMenu={setMenu}
                webURL={webURL}
                setWebURL={setWebURL}
                importedURL={importedURL}
                setImportedURL={setImportedURL}
                outputImage={outputImage}
                setOutputImage={setOutputImage}
              />
            }
          />
          <Route path="/SavedImages" element={<SavedImages savedImage={savedImage} onRemoveImage={handleRemove} Ondownload={downloadData} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
