import { useEffect, useState } from "react";
import Headling from "../../Components/Headling/Headling";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { Product } from "../../interfaces/product.interface";
import axios from "axios";
import { PREFIX } from "../../helpers/api";
import { CartItem } from "../../Components/CartItem/CartItem";
import styles from "./Cart.module.css";
import Button from "../../Components/Button/Button";
import { useNavigate } from "react-router-dom";
import { cartActions } from "../../store/cart.slice";

const DELIVERY_FEE = 1.69;

export function Cart() {
  const navigate = useNavigate();
  const items = useSelector((s: RootState) => s.cart.items);
  const jwt = useSelector((s: RootState) => s.user.jwt);
  const [cartProducts, setCartProducts] = useState<Product[]>();
  const dispatch = useDispatch<AppDispatch>();

  const order = async () => {
    const { data } = await axios.post(
      `${PREFIX}/order`,
      { products: items },
      { headers: { Authorization: `Bearer ${jwt}` } }
    );
    navigate("/checkout");
    console.log(data);
    dispatch(cartActions.clean());
  };

  const getItem = async (id: number) => {
    const { data } = await axios.get<Product>(`${PREFIX}/products/${id}`);
    return data;
  };

  const loadAllItems = async () => {
    const res = await Promise.all(items.map((i) => getItem(i.id)));
    setCartProducts(res);
  };

  useEffect(() => {
    loadAllItems();
  }, [items]);

  return (
    <div className={styles["contain"]}>
      <Headling className={styles["headling"]}>Cart</Headling>
      {items.map((i) => {
        const product = cartProducts?.find((p) => p.id === i.id);
        if (product) {
          return <CartItem counter={i.count} {...product} key={product.id} />;
        }
      })}
      <div className={styles["container"]}>
        <div>Total:</div>
        <div>
          {items
            .map((i) => {
              const product = cartProducts?.find((p) => p.id === i.id);
              if (!product) {
                return 0;
              }
              return i.count * product.price;
            })
            .reduce((acc, bdd) => (acc += bdd), 0)}{" "}
          <span className={styles["accuracy"]}>$</span>
        </div>
      </div>
      <hr className={styles["separate"]} />
      <div className={styles["container"]}>
        <div>Delivery fee:</div>
        <div>
          {DELIVERY_FEE} <span className={styles["accuracy"]}>$</span>
        </div>
      </div>
      <hr className={styles["separate"]} />
      <div className={styles["container"]}>
        <div>
          Total:{" "}
          <span className={styles["amount"]}>
            (
            {items.reduce((acc, bdd) => {
              return (acc += bdd.count);
            }, 0)}
            )
          </span>
        </div>
        <div>
          {DELIVERY_FEE +
            items
              .map((i) => {
                const product = cartProducts?.find((p) => p.id === i.id);
                if (!product) {
                  return 0;
                }
                return i.count * product.price;
              })
              .reduce((acc, bdd) => (acc += bdd), 0)}{" "}
          <span className={styles["accuracy"]}>$</span>
        </div>
      </div>
      <div className={styles["button-container"]}>
        <Button appearence="big" className={styles["button"]} onClick={order}>
          Order
        </Button>
      </div>
    </div>
  );
}
