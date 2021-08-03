import React, { useState } from "react";
import { Button } from 'react-bootstrap';
import { useCollection } from "react-firebase-hooks/firestore";
import FetchProduct from "../services/FetchProduct";
import Product from "./Product";

const ProductsList = () => {
  const [currentProduct, setCurrentProduct] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [products] = useCollection(FetchProduct.getAll().orderBy("title", "asc"));

  const refreshList = () => {
    setCurrentProduct(null);
    setCurrentIndex(-1);
  };

  const setActiveProduct = (product, index) => {
    const { title, description, price, imgUrl, inStock } = product.data();

    setCurrentProduct({
      id: product.id,
      title,
      description,
      price,
      imgUrl,
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
        { products ?
          products.docs.map((product, index) =>(
            <li 
            className={"list-group-item " + (index === currentIndex ? "active" : "")}
            onClick={() => setActiveProduct(product, index)}
            key={product.id}
            >
              <div horizontal class="d-flex justify-content-between mb-3">
                <div style = {{width: 200, flexShrink: 0}}>{ product.data().title }</div>
                <div> ₹ { product.data().price }</div>
                <div>
                <Button variant="danger"
                    onClick={() => deleteProduct(product.id)}>
                    Delete
                </Button>
                </div>
              </div>
                
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
