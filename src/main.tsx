import { lazy, StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { createBrowserRouter } from "react-router-dom";
import { Cart } from "./Pages/Cart/Cart";
import { ErrorPage } from "./Pages/ErrorPage/ErrorPage";
import { Layout } from "./layout/Menu/Layout.tsx";
import { Product } from "./Pages/Product/Product.tsx";
import axios from "axios";
import { AuthLayout } from "./layout/Auth/AuthLayout.tsx";
import { Login } from "./Pages/Login/Login.tsx";
import { Register } from "./Pages/Register/Register.tsx";
import { PREFIX } from "./helpers/api.ts";
import { RequireAuth } from "./helpers/RequireAuth.tsx";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";
import { Checkout } from "./Pages/Checkout/Checkout.tsx";

const Menu = lazy(() => import("./Pages/Menu/Menu.tsx"));

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <RequireAuth>
        <Layout />
      </RequireAuth>
    ),
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={<>Loading...</>}>
            <Menu />
          </Suspense>
        ),
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/product/:id",
        element: <Product />,
        errorElement: <>Error</>,
        loader: async ({ params }) => {
          // return axios
          //   .get(`${PREFIX}/products/${params.id}`)
          //   .then((res) => res.data);
          const { data } = await axios.get(`${PREFIX}/products/${params.id}`);
          return data;
        },
      },
      {
        path: "/checkout",
        element: <Checkout />,
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
  {
    path: "/cart",
    element: <Cart />,
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
