import { NavLink, Outlet, useNavigate } from "react-router-dom";
import styles from "./Layout.module.css";
import Button from "../../Components/Button/Button";
import cn from "classNames";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { getProfile, userActions } from "../../store/user.slice";
import { useEffect } from "react";
// import { CartItem } from "../../store/cart.slice";

export function Layout() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const profile = useSelector((s: RootState) => s.user.profile);
  const items = useSelector((s: RootState) => s.cart.items);

  const logout = () => {
    // localStorage.removeItem("jwt");
    dispatch(userActions.logout());
    navigate("/auth/login");
    return;
  };

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  return (
    <div className={styles["layout"]}>
      <div className={styles["sidebar"]}>
        <div className={styles["user"]}>
          <img
            className={styles["avatar"]}
            src="/avatar.png"
            alt="avatar.png"
          />
          <div className={styles["name"]}>{profile?.name}</div>
          <div className={styles["mail"]}>{profile?.email}</div>
        </div>

        <div className={styles["menu"]}>
          <NavLink
            to="/"
            className={({ isActive }) =>
              cn(styles["link"], { [styles.active]: isActive })
            }
          >
            <img src="/menu-icon.svg" alt="" />
            Menu
          </NavLink>
          <NavLink
            to="/cart"
            className={({ isActive }) =>
              cn(styles["link"], { [styles.active]: isActive })
            }
          >
            <img src="/cart-icon.svg" alt="" />
            Cart{" "}
            <span className={styles["cart-count"]}>
              {items.reduce((acc, item) => (acc += item.count), 0)}
            </span>
          </NavLink>
        </div>
        <Button className={styles["exit"]} onClick={logout}>
          <img src="/logout-icon.svg" alt="" />
          Logout
        </Button>
      </div>
      <div className={styles["content"]}>
        <Outlet />
      </div>
    </div>
  );
}
