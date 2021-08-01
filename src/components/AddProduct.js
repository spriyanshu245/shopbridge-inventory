import { Alert } from "bootstrap";
import React, { useState } from "react";
import FetchProduct from "../services/FetchProduct";

const AddProduct = () => {

    const initialProductState = {
        title: "",
        description: "",
        price: "",
        inStock: false
    };
    const [product, setProduct] = useState(initialProductState);
    const [submitted, setSubmitted] = useState(false);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setProduct({product, [name]: value });
  };

  const saveProduct = () => {
    var data = {
      title: product.title,
      description: product.description,
      price: product.price,
      inStock: false
    };

    FetchProduct.create(data)
      .then(() => {
        setSubmitted(true);
      })
      .then(() => {
        Alert.alert('Product Added !')
      })
      .catch(e => {
        console.log(e);
      });
  };

  const newProduct = () => {
    setProduct(initialProductState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>Product Added !</h4>
          <button className="btn btn-success" onClick={newProduct}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
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
              type="text"
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
              type="text"
              className="form-control"
              id="price"
              required
              value={product.price}
              onChange={handleInputChange}
              name="price"
            />
          </div>

          <button onClick={saveProduct} className="btn btn-success">
            Add
          </button>
        </div>
      )}
    </div>
  );
};

export default AddProduct;
