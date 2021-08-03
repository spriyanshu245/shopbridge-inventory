import React, { useState } from "react";
import FetchProduct from "../services/FetchProduct";
import ImgUpload from "../services/ImgUpload";

const AddProduct = () => {
    const initialProductState = {
        title: "",
        description: "",
        price: "",
        // imgUrl : "",
        inStock: true
    };
    const [product, setProduct] = useState(initialProductState);
    // const [url, setURL] = useState("ImgUpload");

  const handleInputChange = event => {
    const { name, value } = event.target;
    setProduct({...product, [name]: value });
  };

  const saveProduct = () => {
    var data = {
      title: product.title,
      description: product.description,
      price: product.price,
      // imgUrl : product.imgUrl,
      inStock: true
    };

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
              <ImgUpload />
            </div>
            <button onClick={saveProduct} className="btn btn-success">
              Add
            </button>
      </div>
    </div>
  );
};

export default AddProduct;
