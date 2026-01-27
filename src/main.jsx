import ReactDOM from "react-dom/client";
import React, { lazy, Suspense } from "react";

import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Home/Home.jsx";
import Blog from "./Blog/Blog.jsx";
//import Shop from "./Shop/Shop.jsx";
import Singleproduct from "./Shop/Singleproduct.jsx";
import { Provider } from "react-redux";
import Store from "./utilis/Store.jsx";
import CartPage from "./Shop/CartPage.jsx";
import BlogPage from "./Blog/BlogPage.jsx";
import About from "./components/About.jsx";
import Contact from "./Contact/Contact.jsx";
import AuthProvider from "./context/AuthProvider.jsx";
import PrivateRoute from "./privateRoute/PrivateRoute.jsx";
import Login from "./components/Login.jsx";
import Signup from "./components/Signup.jsx";

const Shop = lazy(() => import("./Shop/Shop.jsx"));
import Shimmer from "./components/Shimmer.jsx";

const approuter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/blog", element: <Blog /> },
      { path: "/blog/:id", element: <BlogPage /> },
      {
        path: "/shop",
        element: (
          <Suspense fallback={<Shimmer />}>
            <Shop />
          </Suspense>
        ),
      },
      { path: "shop/:id", element: <Singleproduct /> },
      {
        path: "/cart-page",
        element: (
          <PrivateRoute>
            <CartPage />
          </PrivateRoute>
        ),
      },
      { path: "/about", element: <About /> },
      { path: "/contact", element: <Contact /> },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <Provider store={Store}>
      <RouterProvider router={approuter}></RouterProvider>
    </Provider>
  </AuthProvider>,
);
