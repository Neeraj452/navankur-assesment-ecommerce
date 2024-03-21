// ProductCard.js

import { useNavigate } from "react-router-dom";
import style from "./productCard.module.css";
import PropTypes from "prop-types";
const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const navigateProductDetails = () => {
    navigate(`/product-detailed?query=${product.id}`);
  };

  return (
    <div className={style.card} onClick={() => navigateProductDetails()}>
      <div className={style.label}>
        <span className={style.labelText}>Name:</span>
        <span className={style.value}>{product.title}</span>
      </div>
      <div className={style.label}>
        <span className={style.labelText}>Price:</span>
        <span className={style.value}>{product.price}</span>
      </div>
      <button className={style.detailsButton}>More Details</button>
    </div>
  );
};

ProductCard.propTypes = {
  product: PropTypes.object.isRequired,
};

export default ProductCard;
