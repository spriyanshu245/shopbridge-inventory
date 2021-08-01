import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import AddProduct from "./components/AddProduct";
import ProductList from "./components/ProductList";

function App() {
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/products" className="navbar-brand">
          ShopBridge Inventory
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/products"} className="nav-link">
              Inventory
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/add"} className="nav-link">
              Add Product
            </Link>
          </li>
        </div>
      </nav>

      <div className="container mt-3">
        <h2>ShopBridge</h2>
        <Switch>
          <Route exact path={["/", "/products"]} component={ProductList} />
          <Route exact path="/add" component={AddProduct} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
