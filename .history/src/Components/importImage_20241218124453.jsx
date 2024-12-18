import { motion } from "framer-motion";

export default function ImportImage({handleRemoveBackground_ImportedImg, handleImportedURL}){
    return  <main className="content_container imported-img">
    <p>Import image from your device</p>
    <form onSubmit={handleRemoveBackground_ImportedImg}>
      <input
        name="importedURL"
        className="import-img"
        type="file"
        accept="image/*"
        onChange={handleImportedURL}
      />
      <button type="submit">Remove</button>
    </form>
    
  </main>
}