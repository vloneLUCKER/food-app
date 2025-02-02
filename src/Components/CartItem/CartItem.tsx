import styles from "./CartItem.module.css";
import { MouseEvent } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { cartActions } from "../../store/cart.slice";
import { CartItemProps } from "./CartItem.props";

export function CartItem(props: CartItemProps) {
  const dispatch = useDispatch<AppDispatch>();

  const addToCart = (e: MouseEvent) => {
    e.preventDefault();
    dispatch(cartActions.add(props.id));
  };

  const remove = (e: MouseEvent) => {
    e.preventDefault();
    dispatch(cartActions.remove(props.id));
  };

  const removeAll = (e: MouseEvent) => {
    e.preventDefault();
    dispatch(cartActions.removeAll(props.id));
  };

  return (
    <div className={styles["item"]}>
      <div
        className={styles["image"]}
        style={{ backgroundImage: `url("/pizza.png")` }}
      ></div>
      <div className={styles["description"]}>
        <div className={styles["name"]}>{props.name}</div>
        <div className={styles["currency"]}>{props.price}&nbsp;$</div>
      </div>
      <div className={styles["actions"]}>
        <button className={styles["remove"]} onClick={remove}>
          <img src="/remove.svg" alt="" />
        </button>
        <div className={styles["amount"]}>{props.counter}</div>
        <button className={styles["add"]} onClick={addToCart}>
          <img src="/add.svg" alt="" />
        </button>
        <button className={styles["remove-all"]} onClick={removeAll}>
          <img src="/cross.svg" alt="" />
        </button>
      </div>
    </div>
  );
}
