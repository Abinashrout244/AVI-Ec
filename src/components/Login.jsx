import React, { useContext, useState } from "react";
import { Link, Navigate, useNavigate, useLocation } from "react-router-dom";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  InstagramIcon,
  TwitterIcon,
  Linkedin01Icon,
  GoogleIcon,
  Facebook01Icon,
} from "@hugeicons/core-free-icons";
import { AuthContext } from "../context/AuthProvider";

const Login = () => {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [remember, setRemember] = useState(false);
  const { signUpWithEmail, login } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/cart-page";

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password);

    login(email, password)
      .then((result) => {
        alert("Login success!");
        navigate(from, { replace: true });
      })
      .catch((error) => {
        const errormsg = error.message;
        setErrMsg("Please provide valid Email & password");
      });
  };

  const handleRegister = () => {
    signUpWithEmail()
      .then((result) => {
        navigate(from, { replace: true });
      })
      .catch((error) => {
        setErrMsg(error.message);
      });
  };

  return (
    <div className="md:min-h-screen md:mt-0 mt-[60px] flex items-center justify-center bg-gray-50 md:p-6">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Email */}
          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="email"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm px-4 py-2 focus:ring-2 focus:ring-indigo-300"
              placeholder="you@example.com"
            />
          </div>

          {/* Password */}
          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="password"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm px-4 py-2 focus:ring-2 focus:ring-indigo-300"
              placeholder="Enter your password"
            />
          </div>
          <div>
            {errMsg && <div className="text-red-500 p-2">{errMsg}</div>}
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={remember}
                onChange={() => setRemember(!remember)}
                className="h-4 w-4 rounded"
              />
              <span>Remember me</span>
            </label>

            <a href="#" className="text-indigo-600 hover:underline">
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full py-2 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition"
          >
            Log in
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-[16px] space-x-1 text-gray-600">
            Don't have any account?
            <Link to="/signup" className="text-lg hover:text-indigo-500">
              Signup
            </Link>
          </p>
        </div>

        <div className="mt-6 flex justify-center items-center pt-1.5">
          <div className="flex justify-center items-center p-1.5 rounded-full border-2 border-indigo-500">
            <p className="flex justify-center items-center w-12 h-12 rounded-full bg-indigo-500 text-white font-semibold">
              OR
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center gap-6 text-xl pt-6">
          <h2 className="text-2xl font-semibold text-center">
            Login with SocialMedia
          </h2>
          <div className="flex items-center justify-center gap-4 text-xl">
            <button
              className="p-2 rounded-full bg-orange-500"
              onClick={() => {
                handleRegister();
              }}
            >
              <HugeiconsIcon icon={GoogleIcon} color="white" />
            </button>
            <button className="p-2 rounded-full bg-indigo-900">
              <HugeiconsIcon icon={Facebook01Icon} color="white" />
            </button>
            <button className="p-2 rounded-full bg-sky-500">
              <HugeiconsIcon icon={TwitterIcon} color="white" />
            </button>
            <button className="p-2 rounded-full bg-rose-600">
              <HugeiconsIcon icon={InstagramIcon} color="white" />
            </button>
            <button className="p-2 rounded-full bg-indigo-600">
              <HugeiconsIcon icon={Linkedin01Icon} color="white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
