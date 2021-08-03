import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Card, Alert, Badge } from 'react-bootstrap';
import FetchProduct from "../services/FetchProduct";

const Product = (props) => {
  const initialProductState = {
    key: null,
    title: "",
    description: "",
    price: "",
    inStock: true,
  };
  const [currentProduct, setCurrentProduct] = useState(initialProductState);
  const [message, setMessage] = useState("");
  const [show, setShow] = useState(true);

  const { product } = props;
  if (currentProduct.id !== product.id) {
    setCurrentProduct(product);
    setMessage("");
  }

  const updateStock = (status) => {
    FetchProduct.update(currentProduct.id, { inStock: status })
      .then(() => {
        setCurrentProduct({ ...currentProduct, inStock: status });
        setMessage("The status was updated successfully!");
        setShow(true)
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentProduct ? (
        <div className="container" align="left">
          <br/>
          <h4>Details</h4>
          <Card style={{ width: "18rem" }}>
            <Card.Img variant="top" src="https://images.app.goo.gl/xHWoMjkM8hauyYPD8" />
            <Card.Body>
              <Card.Title>{currentProduct.title}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted"> ₹ {currentProduct.price}</Card.Subtitle>
              <Card.Text>{currentProduct.description}</Card.Text>
              <div className="form-group">
                <label>
                  <strong>Status : </strong>
                </label>
                {currentProduct.inStock ?
                 <Badge bg="success">In Stock</Badge>
                :
                  <Badge bg="warning">Out of Stock</Badge>
                }
              </div>
              {currentProduct.inStock ? (
                <Button
                  className="badge badge-primary mr-2"
                  onClick={() => updateStock(false)}>
                  Out of Stock
                </Button>
              ) : (
                <Button
                  className="badge badge-primary mr-2"
                  onClick={() => updateStock(true)}>
                  In Stock
                </Button>
              )}
              {message && show ? <Alert variant="success" onClose={() => setShow(false)} dismissible>{message}</Alert> : null}
            </Card.Body>
          </Card>
        </div>
      ) : (
        <div>
          <br/>
          <p>click on a Product to View...</p>
        </div>
      )}
    </div>
  );
};
export default Product;
