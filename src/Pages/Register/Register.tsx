import Headling from "../../Components/Headling/Headling";
import Button from "../../Components/Button/Button";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../Components/Input/Input";
import styles from "./Register.module.css";
import { FormEvent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { register, userActions } from "../../store/user.slice";

export type RegisterForm = {
  email: {
    value: string;
  };
  password: {
    value: string;
  };
  name: {
    value: string;
  };
};

export function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { jwt, registerErrorMessage } = useSelector((s: RootState) => s.user);

  useEffect(() => {
    if (jwt) {
      navigate("/");
    }
  }, [jwt, navigate]);

  // const sendLogin = async (email: string, password: string) => {
  //   dispatch(login({ email, password }));
  // };

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    dispatch(userActions.clearRegisterError());
    const target = e.target as typeof e.target & RegisterForm;
    const { email, password, name } = target;
    // await sendLogin(email.value, password.value);
    dispatch(
      register({
        email: email.value,
        password: password.value,
        name: name.value,
      })
    );
  };

  return (
    <div className={styles["login"]}>
      <Headling>Registration</Headling>
      {registerErrorMessage && (
        <div className={styles["error"]}>{registerErrorMessage}</div>
      )}
      <form action="" className={styles["form"]} onSubmit={submit}>
        <div className={styles["field"]}>
          <label htmlFor="email">Your Email</label>
          <Input type="" id="email" placeholder="email" name="email" />
        </div>
        <div className={styles["field"]}>
          <label htmlFor="password">Your Password</label>
          <Input
            type="password"
            id="password"
            placeholder="password"
            name="password"
          />
        </div>
        <div className={styles["field"]}>
          <label htmlFor="name">Your Name</label>
          <Input type="" id="name" placeholder="name" name="name" />
        </div>
        <Button appearence="big">Register</Button>
      </form>
      <div className={styles["links"]}>
        <div>Already have account?</div>
        <div>
          <Link to="/auth/login" className="link">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
