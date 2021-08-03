import React, { useState } from "react";
import FetchProduct from "../services/FetchProduct";
import {storage} from "../firebase"

const AddProduct = () => {
    const initialProductState = {
        title: "",
        description: "",
        price: "",
        imgUrl : "",
        inStock: true
    };
    const [product, setProduct] = useState(initialProductState);  
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
      return url
    }

  const handleInputChange = event => {
    const { name, value } = event.target;
    setProduct({...product, [name]: value });
  };

  const saveProduct = () => {
    var data = {
      title: product.title,
      description: product.description,
      price: product.price,
      imgUrl : url,
      inStock: true
    };
    console.log('image url', data.imgUrl)
    FetchProduct.create(data)
    .then(() => {
      setProduct(initialProductState);
    })
    .then(() => {
      alert('Product Added to Inventory !')
    })
    .catch(e => {
      console.log(e);
    });
    console.log('json data', JSON.stringify(data))
  }

  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{ height: "40vh" }}>
      <div className="submit-form">
            <div className="form-group">
              <label htmlFor="title">Product Name</label>
              <input
                type="string"
                className="form-control"
                id="title"
                required
                value={product.title}
                onChange={handleInputChange}
                name="title"
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="string"
                className="form-control"
                id="description"
                required
                value={product.description}
                onChange={handleInputChange}
                name="description"
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Price</label>
              <input
                type="number"
                className="form-control"
                id="price"
                required
                value={product.price}
                onChange={handleInputChange}
                name="price"
              />
            </div>
            <div className="form-group">
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
            <button disable={!product} onClick={saveProduct} className="btn btn-success">
              Add
            </button>
      </div>
    </div>
  );
};

export default AddProduct;
