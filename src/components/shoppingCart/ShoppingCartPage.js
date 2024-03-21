import React from "react";
import { useSelector, useDispatch } from "react-redux";
import style from "./shoppingCartPage.module.css";
import {
  decreaseQuantityCart,
  increaseQuantityCart,
} from "../../store/cart/cart";
import { buyItemsAction } from "../../store/webhook/buyItems";
import { useNavigate } from "react-router-dom";

const ShoppingCartPage = () => {
  const cartItems = useSelector((state) => state.cartReducer.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const decreaseQuantity = (item) => {
    dispatch(decreaseQuantityCart(item?.id));
  };

  const increaseQuantity = (item) => {
    dispatch(increaseQuantityCart(item?.id));
  };

  const handleBuyNow = () => {
    const userData = JSON.parse(localStorage.getItem("user"));
    const purchaseData = {
      user: userData?.username,
      items: cartItems,
      totalPrice: cartItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      ),
    };

    dispatch(buyItemsAction(purchaseData, navigate));
  };

  return (
    <div className={style.container}>
      {cartItems.length === 0 && <h2>No items in the cart</h2>}
      {cartItems.length > 0 && (
        <>
          <h2 className={style.heading}>Shopping Cart</h2>
          {cartItems.map((item) => (
            <div className={style.card} key={item?.id}>
              <img
                src={item?.image}
                alt={item?.title}
                className={style.image}
              />
              <div className={style.details}>
                <div className={style.text_box}>
                  <h2>{item?.title}</h2>
                  <p>
                    <b>Description: </b>
                    {item?.description}
                  </p>
                  <p>
                    <b>Category:</b> {item?.category}
                  </p>
                  <p>
                    <b>Price:</b> ${item?.price}
                  </p>
                  <p>
                    <b>Rating:</b> {item?.rating.rate} ({item?.rating.count}{" "}
                    reviews)
                  </p>
                  <p>
                    <b>Quantity:</b> {item?.quantity}
                  </p>
                  <div className={style.btn_container}>
                    <div className={style.quantityControls}>
                      <button onClick={() => decreaseQuantity(item)}>-</button>
                      <span>{item?.quantity}</span>
                      <button onClick={() => increaseQuantity(item)}>+</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div className={style.total_container}>
            <div className={style.total}>
              <p>
                <b>Total Price:</b> $
                {cartItems.reduce(
                  (acc, item) => acc + item.price * item.quantity,
                  0
                )}
              </p>
              <button
                className={style.addToCart}
                onClick={() => handleBuyNow()}
              >
                Buy Now
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ShoppingCartPage;
