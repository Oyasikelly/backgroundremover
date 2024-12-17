export default function UrlImage({webURL,handleRemoveBackground,handleWebURL}){
    return  <main className="content_container">
    <p>Input the URL of the image</p>
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
  </main>
}