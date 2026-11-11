import ReactDOM from "react-dom/client";
import React, { lazy, Suspense } from "react";

import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import Store from "./utilis/Store.jsx";
import AuthProvider from "./context/AuthProvider.jsx";
import PrivateRoute from "./privateRoute/PrivateRoute.jsx";
import Shimmer from "./components/Shimmer.jsx";
const Home = lazy(() => import("./Home/Home.jsx"));
const Blog = lazy(() => import("./Blog/Blog.jsx"));
const Singleproduct = lazy(() => import("./Shop/Singleproduct.jsx"));
const CartPage = lazy(() => import("./Shop/CartPage.jsx"));
const LikePage = lazy(() => import("./Shop/LikePage.jsx"));
const BlogPage = lazy(() => import("./Blog/BlogPage.jsx"));
const About = lazy(() => import("./components/About.jsx"));
const Contact = lazy(() => import("./Contact/Contact.jsx"));
const Login = lazy(() => import("./components/Login.jsx"));
const Signup = lazy(() => import("./components/Signup.jsx"));
const Checkout = lazy(() => import("./Shop/Checkout.jsx"));
const OrderSuccess = lazy(() => import("./Shop/OrderSuccess.jsx"));
const OrdersPage = lazy(() => import("./Shop/OrdersPage.jsx"));
const ProfilePage = lazy(() => import("./Shop/ProfilePage.jsx"));
const Shop = lazy(() => import("./Shop/Shop.jsx"));

const withFallback = (Component) => (
  <Suspense fallback={<Shimmer />}>
    <Component />
  </Suspense>
);

const approuter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: withFallback(Home) },
      { path: "/blog", element: withFallback(Blog) },
      { path: "/blog/:id", element: withFallback(BlogPage) },
      { path: "/shop", element: withFallback(Shop) },
      { path: "shop/:id", element: withFallback(Singleproduct) },
      {
        path: "/cart-page",
        element: (
          <PrivateRoute>
            {withFallback(CartPage)}
          </PrivateRoute>
        ),
      },
      {
        path: "/like-page",
        element: (
          <PrivateRoute>
            {withFallback(LikePage)}
          </PrivateRoute>
        ),
      },
      { path: "/about", element: withFallback(About) },
      { path: "/contact", element: withFallback(Contact) },
      {
        path: "/checkout",
        element: (
          <PrivateRoute>
            {withFallback(Checkout)}
          </PrivateRoute>
        ),
      },

      {
        path: "/orders",
        element: (
          <PrivateRoute>
            {withFallback(OrdersPage)}
          </PrivateRoute>
        ),
      },
      {
        path: "/profile",
        element: (
          <PrivateRoute>
            {withFallback(ProfilePage)}
          </PrivateRoute>
        ),
      },
      {
        path: "/profile",
        element: (
          <PrivateRoute>
            {withFallback(ProfilePage)}
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/order-success",
    element: (
      <PrivateRoute>
        {withFallback(OrderSuccess)}
      </PrivateRoute>
    ),
  },
  {
    path: "/login",
    element: withFallback(Login),
  },
  {
    path: "/signup",
    element: withFallback(Signup),
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <Provider store={Store}>
      <RouterProvider router={approuter}></RouterProvider>
    </Provider>
  </AuthProvider>,
);
