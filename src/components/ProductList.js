import React, { useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import FetchProduct from "../services/FetchProduct";
import Product from "./Product";

const ProductsList = () => {
  const [currentProduct, setCurrentProduct] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [products, error] = useCollection(FetchProduct.getAll().orderBy("title", "asc"));

  const refreshList = () => {
    setCurrentProduct(null);
    setCurrentIndex(-1);
  };
  console.log('new console log');

  const setActiveProduct = (product, index) => {
    const { title, description, price, inStock } = product.data();

    setCurrentProduct({
      id: product.id,
      title,
      description,
      price,
      inStock,
    });

    setCurrentIndex(index);
  };

  const deleteProduct = () => {
    FetchProduct.remove(currentProduct.id)
      .then(() => {
        refreshList();
      })
      .catch((e) => {
        console.log(e);
      });
  };
  
  return (
    <div className="list">
    <div className="col-md-6">
      <ul className="list-group">
      {error && <strong>Error: {error}</strong>}
      {console.log('products list', products)}
        { products ?
          products.docs.map((product, index) =>(
            <li 
            className={"list-group-item " + (index === currentIndex ? "active" : "")}
            onClick={() => setActiveProduct(product, index)}
            key={product.id}
            >
              { product.data().title }
              { product.data().price }
            </li>
          )):<p>Loading...</p>
        }
      </ul>
    </div>
    <div className="col-md-6">
      {currentProduct ? (
        <Product product={currentProduct} refreshList={refreshList}/>
      ) : (
        <div>
          <br />
          <p>click on a Product to View...</p>
        </div>
      )}
    </div>
  </div>
  );
};

export default ProductsList;
