import Headling from "../../Components/Headling/Headling";
import Button from "../../Components/Button/Button";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../Components/Input/Input";
import styles from "./Login.module.css";
import { FormEvent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { login, userActions } from "../../store/user.slice";

export type LoginForm = {
  email: {
    value: string;
  };
  password: {
    value: string;
  };
};

export function Login() {
  //   const [error, setError] = useState<string | null>();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { jwt, loginErrorMessage } = useSelector((s: RootState) => s.user);

  useEffect(() => {
    if (jwt) {
      navigate("/");
    }
  }, [jwt, navigate]);

  //   useEffect(() => {
  //     navigate("/");
  //   }, [loginErrorMessage, navigate]);

  const sendLogin = async (email: string, password: string) => {
    dispatch(login({ email, password }));
    // try {
    //   const { data } = await axios.post<LoginResponce>(`${PREFIX}/auth/login`, {
    //     email,
    //     password,
    //   });
    //   dispatch(userActions.login(data.access_token));
    //   navigate("/");
    // } catch (e) {
    //   if (e instanceof AxiosError) {
    //     console.log(e);
    //     setError(e.response?.data.message);
    //   }
    // }
  };

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    dispatch(userActions.clearLoginError());
    const target = e.target as typeof e.target & LoginForm;
    const { email, password } = target;
    await sendLogin(email.value, password.value);
  };

  return (
    <div className={styles["login"]}>
      <Headling>Login</Headling>
      {loginErrorMessage && (
        <div className={styles["error"]}>{loginErrorMessage}</div>
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
        <Button appearence="big">Login</Button>
      </form>
      <div className={styles["links"]}>
        <div>don't have account?</div>
        <div>
          <Link to="/auth/register" className="link">
            Registration
          </Link>
        </div>
      </div>
    </div>
  );
}
