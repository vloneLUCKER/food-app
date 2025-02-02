import { Link } from "react-router-dom";
import styles from "./ProductCard.module.css";
import { ProductCardProps } from "./ProductCard.props";
import { MouseEvent } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { cartActions } from "../../store/cart.slice";

function ProductCard(props: ProductCardProps) {
  const dispatch = useDispatch<AppDispatch>();

  const addToCart = (e: MouseEvent) => {
    e.preventDefault();
    dispatch(cartActions.add(props.id));
  };

  return (
    <Link to={`/product/${props.id}`} className={styles["link"]}>
      <div className={styles["card"]}>
        <div
          className={styles["head"]}
          style={{ backgroundImage: `url("/pizza.png")` }}
        >
          <div className={styles["price"]}>
            {props.price} <span className={styles["currency"]}>$</span>
          </div>
          <button className={styles["add-to-cart"]} onClick={addToCart}>
            <img src="/to-cart-icon.svg" alt="" />
          </button>
          <div className={styles["rating"]}>
            {props.rating}&nbsp;
            <img src="/rating-icon.svg" alt="" />
          </div>
        </div>
        <div className={styles["footer"]}>
          <div className={styles["title"]}>{props.name}</div>
          <div className={styles["description"]}>{props.ingredients}</div>
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;
