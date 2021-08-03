import React, { useState } from "react";
import {storage} from "../firebase"

const ImgUpload = (props) => {
  const [file, setFile] = useState(null);
  const [url, setURL] = useState("");

  function handleChange(e) {
    setFile(e.target.files[0]);
  }

  async function handleUpload(e) {
    e.preventDefault();
    const ref = storage.ref(`/images/${file.name}`);
    const uploadTask =  ref.put(file);
    uploadTask.on("state_changed", console.log, console.error, () => {
      ref
        .getDownloadURL()
        .then((url) => {
          setFile(null);
          setURL(url);
        });
    });
    props.handleUrl(url);
    return url
  }

    return (
      <div>
        <form onSubmit={handleUpload}>
          <img style= {{height: 40, wdth: 40}} src={url} alt="" />
          <input
            className="form-control"
            id="image"
            required
            type="file"
            onChange={handleChange}
            name="image"
            />
            <button disabled={!file}>Upload</button>
          </form>
      </div>

      );
}
export default ImgUpload;
