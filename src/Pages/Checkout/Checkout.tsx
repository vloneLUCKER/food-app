import { useNavigate } from "react-router-dom";
import Button from "../../Components/Button/Button";
import styles from "./Checkout.module.css";

export function Checkout() {
  const navigate = useNavigate();

  const newOrder = () => {
    navigate("/");
  };

  return (
    <div className={styles["container"]}>
      <img src="checkout.png" alt="" className={styles["image"]} />
      <div className={styles["header"]}>
        Your order is successfully checkouted!
      </div>
      <Button appearence="big" className={styles["button"]} onClick={newOrder}>
        Create new order
      </Button>
    </div>
  );
}
