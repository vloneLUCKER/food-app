import { useLoaderData } from "react-router-dom";
import { Product as ProductInterface } from "../../interfaces/product.interface";
import styles from "./Product.module.css";
import Headling from "../../Components/Headling/Headling";
import Button from "../../Components/Button/Button";
import { useDispatch } from "react-redux";
import { cartActions } from "../../store/cart.slice";
import { AppDispatch } from "../../store/store";
// import { Suspense } from "react";

export function Product() {
  const data = useLoaderData() as ProductInterface;
  console.log(data.ingredients);

  const ingr = data.ingredients;
  const dispatch = useDispatch<AppDispatch>();

  const add = () => {
    dispatch(cartActions.add(data.id));
  };

  return (
    <div className={styles["container"]}>
      <div className={styles["header"]}>
        <img src="/arrow.svg" alt="" />
        <Headling>{data.name}</Headling>
        <Button className={styles["btn"]} onClick={add}>
          <img src="/to-cart-icon.svg" alt="" className={styles["icon"]} />
          Add to Cart
        </Button>
      </div>
      <div className={styles["hero"]}>
        <div
          style={{ backgroundImage: `url("/pizza.png")` }}
          className={styles["img"]}
        />
        <div className={styles["wrapper"]}>
          <div className={styles["point"]}>
            <div className={styles["price"]}>Price</div>
            <div className={styles["amount"]}>
              {data.price} <span className={styles["sign"]}>$</span>
            </div>
          </div>
          <div className={styles["point"]}>
            <div className="rating">Rating</div>
            <div className="stars">
              {data.rating} <img src="/rating-icon.svg" alt="" />
            </div>
          </div>
          <div>
            <div className={styles["ingridients"]}>Ingridients:</div>
            <ul>
              {ingr.map((i) => {
                return (
                  <li key={i} className={styles["ingredient"]}>
                    {i}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

  //   return (
  //     <>
  //       <Suspense fallback={"Загружаю..."}>
  //         <Await resolve={data} errorElement={<div>can not load product</div>}>
  //           {(resolvedData: ProductInterface) => (
  //             <div>Product Name: {resolvedData.name}</div>
  //           )}
  //         </Await>
  //       </Suspense>
  //     </>
  //   );
}
