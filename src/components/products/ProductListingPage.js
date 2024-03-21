import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { productAction } from "../../store/products/product";
import style from "./productList.module.css";
import ProductCard from "../productCard/ProductCard";
import Loading from "../Loading/Loading";

const ProductListingPage = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.productReducer);
  console.log(products);

  useEffect(() => {
    dispatch(productAction());
  }, [dispatch]);

  return (
    <div className={style.container}>
      {products.isLoading && <Loading />}
      {products.isError && <h1>Something went wrong...</h1>}
      {products.isSuccess &&
        products.products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
    </div>
  );
};

export default ProductListingPage;
