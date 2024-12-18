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
  const [savedImage, setSavedImage]=useState([])

    // Ensure localStorage is only accessed in the browser
    useEffect(() => {
      if (typeof window !== "undefined") {
        const saved = localStorage.getItem("savedImage");
        setSavedImage(saved ? JSON.parse(saved) : []);
      }
    }, []);

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
              />
            }
          />
          <Route path="/SavedImages" element={<SavedImages savedImage={savedImage} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
