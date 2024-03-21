// ProductDetailed.js

import { useDispatch, useSelector } from "react-redux";
import style from "./productDetailed.module.css";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { productDetailedAction } from "../../store/products/productDetailed";
import { addItemToCart } from "../../store/cart/cart";
import { ShowtoastSuccess } from "../../utils";
import Loading from "../Loading/Loading";

const ProductDetailed = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("query");

  useEffect(() => {
    dispatch(productDetailedAction(id));
  }, [dispatch, id]);

  const data = useSelector((state) => state.productDetailedReducer);

  const handleAddToCart = (data) => {
    dispatch(addItemToCart(data));
    ShowtoastSuccess("Item added to cart");
  };

  return (
    <div className={style.container}>
      {data.isLoading && <Loading />}
      {data.isError && <h2>Error...</h2>}

      {data.isSuccess && (
        <div className={style.card}>
          <img
            src={data?.product?.image}
            alt={data?.product?.title}
            className={style.image}
          />
          <div className={style.details}>
            <div className={style.text_box}>
              <h2>{data?.product?.title}</h2>
              <p>
                <b>Description: </b>
                {data?.product?.description}
              </p>
              <p>
                <b>Category:</b> {data?.product?.category}
              </p>
              <p>
                <b>Price:</b> ${data?.product?.price}
              </p>
              <p>
                <b>Rating:</b> {data?.product?.rating.rate} (
                {data?.product?.rating.count} reviews)
              </p>
              <div className={style.btn_container}>
                <button
                  onClick={() => handleAddToCart(data?.product)}
                  className={style.addToCart}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetailed;
