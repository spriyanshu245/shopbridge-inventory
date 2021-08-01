import React, { useState, useEffect } from "react";
import FetchProduct from "../services/FetchProduct";
import Product from "./Product";

const TutorialsList = () => {
  const [products, setProducts] = useState([]);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);

  const onDataChange = (items) => {
    let products = [];

    items.docs.forEach((item) => {
      let id = item.id;
      let data = item.data();
      products.push({
        id: id,
        title: data.title,
        description: data.description,
        price: data.price,
        inStock: data.inStock,
      });
    });

    setProducts(products);
  };

  useEffect(() => {
    const unsubscribe = FetchProduct.getAll().orderBy("title", "asc").onSnapshot(onDataChange);

    return () => unsubscribe();
  }, []);


  const refreshList = () => {
    setCurrentProduct(null);
    setCurrentIndex(-1);
  };

  const setActiveProduct = (product, index) => {
    const { title, price, inStock } = product;

    setCurrentProduct({
      id: product.id,
      title,
      price,
      inStock,
    });

    setCurrentIndex(index);
  };
  
  return (
    null
  );
};

export default ProductsList;
