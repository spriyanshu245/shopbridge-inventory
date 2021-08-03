import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button } from "react-bootstrap";
import { Switch, Route } from "react-router-dom";
import AddProduct from "./components/AddProduct";
import ProductList from "./components/ProductList";
import Product from "./components/ProductList";

function App() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/" className="navbar-brand">
          ShopBridge
        </a>
      </nav>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>ADD PRODUCT</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddProduct />
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>

      <div className="container mt-3" align="center">
        <div class="row">
          <div class="col">
            <h4>Product Inventory</h4>
          </div>
          <div class="col">
            <Button variant="secondary" onClick={handleShow}>
              Add Product
            </Button>
          </div>
        </div>
        <br/>

        <Switch>
          <Route exact path={["/"]} component={ProductList} />
          <Route exact path="/products" component={Product} />
        </Switch>
      </div>
    </div>
  );
}
export default App;
