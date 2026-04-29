import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  InstagramIcon,
  TwitterIcon,
  Linkedin01Icon,
  GoogleIcon,
  Facebook01Icon,
} from "@hugeicons/core-free-icons";
import { AuthContext } from "../context/AuthProvider";
import { useDispatch } from "react-redux";
import { addToast } from "../utilis/ToastSlice";

const Login = () => {
  const [errMsg, setErrMsg] = useState("");
  const [email, setEmail] = useState("");
  const [remember, setRemember] = useState(false);
  const [resetting, setResetting] = useState(false);
  const { signUpWithEmail, login, resetPassword } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const from = location.state?.from?.pathname || "/profile";

  // Check for remembered email on mount
  useEffect(() => {
    const savedEmail = localStorage.getItem("remembered_email");
    if (savedEmail) {
      setEmail(savedEmail);
      setRemember(true);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const password = form.password.value;

    login(email, password)
      .then((result) => {
        if (remember) {
          localStorage.setItem("remembered_email", email);
        } else {
          localStorage.removeItem("remembered_email");
        }
        dispatch(addToast({ message: "Welcome back!", type: "success" }));
        navigate(from, { replace: true });
      })
      .catch((error) => {
        setErrMsg("Invalid Email or password");
        dispatch(addToast({ message: "Login failed. Please check your credentials.", type: "error" }));
      });
  };

  const handleForgotPassword = () => {
    const resetEmail = email.trim();

    if (!resetEmail) {
      setErrMsg("Please enter your email first");
      dispatch(addToast({ message: "Email required for reset", type: "error" }));
      return;
    }

    setErrMsg("");
    setResetting(true);

    resetPassword(resetEmail)
      .then(() => {
        dispatch(addToast({ message: "Password reset email sent!", type: "success" }));
        alert("Check your inbox for password reset instructions.");
      })
      .catch((error) => {
        setErrMsg("Failed to send reset email");
        dispatch(addToast({ message: error.message, type: "error" }));
      })
      .finally(() => {
        setResetting(false);
      });
  };

  const handleRegister = () => {
    signUpWithEmail()
      .then((result) => {
        dispatch(addToast({ message: "Logged in with Google!", type: "success" }));
        navigate(from, { replace: true });
      })
      .catch((error) => {
        setErrMsg(error.message);
      });
  };

  return (
    <div className="h-screen w-full flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-4 overflow-hidden">
      <div className="max-w-md w-full glass-panel rounded-[2rem] p-6 md:p-10 transition-all duration-500 border border-white/5 shadow-2xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
            Welcome Back
          </h2>
          <p className="text-slate-400 text-sm font-medium mt-1">
            Sign in to continue to ShopCart
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-amber-300 focus:ring-1 focus:ring-amber-300 transition-all text-sm text-white placeholder:text-slate-500"
              placeholder="you@example.com"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-amber-300 focus:ring-1 focus:ring-amber-300 transition-all text-sm text-white placeholder:text-slate-500"
              placeholder="********"
            />
          </div>

          {errMsg && (
            <div className="text-rose-400 text-[11px] font-bold text-center animate-pulse tracking-wide">
              {errMsg}
            </div>
          )}

          <div className="flex items-center justify-between text-[11px] px-1 font-bold">
            <label className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                checked={remember}
                onChange={() => setRemember(!remember)}
                className="h-4 w-4 rounded border-white/20 bg-transparent text-amber-300 focus:ring-amber-300 transition-all cursor-pointer"
              />
              <span className="text-slate-400 group-hover:text-white transition-colors uppercase tracking-widest">
                Remember me
              </span>
            </label>
            <button
              type="button"
              onClick={handleForgotPassword}
              disabled={resetting}
              className="text-amber-300 hover:text-amber-200 uppercase tracking-widest hover:underline underline-offset-4 transition-all"
            >
              {resetting ? "Sending..." : "Forgot password?"}
            </button>
          </div>

          <button
            type="submit"
            className="w-full py-4 mt-2 rounded-xl bg-amber-400 text-slate-950 text-sm font-black uppercase tracking-widest hover:bg-amber-300 shadow-[0_0_20px_rgba(251,191,36,0.2)] hover:shadow-[0_0_30px_rgba(251,191,36,0.4)] transition-all active:scale-95"
          >
            Sign In
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">
            New here?{" "}
            <Link
              to="/signup"
              className="text-amber-300 hover:text-amber-200 transition-all"
            >
              Create Account
            </Link>
          </p>
        </div>

        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/5"></div>
          </div>
          <div className="relative flex justify-center text-[9px] uppercase font-black tracking-[0.3em]">
            <span className="bg-slate-900 px-4 text-slate-500">
              Social Connect
            </span>
          </div>
        </div>

        <div className="flex items-center justify-center gap-4">
          {[
            { icon: GoogleIcon, color: "#EA4335", action: handleRegister },
            { icon: Facebook01Icon, color: "#1877F2" },
            { icon: TwitterIcon, color: "#1DA1F2" },
            { icon: InstagramIcon, color: "#E4405F" },
            { icon: Linkedin01Icon, color: "#0A66C2" },
          ].map((social, idx) => (
            <button
              key={idx}
              onClick={social.action}
              className="p-3 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:-translate-y-1 transition-all"
            >
              <HugeiconsIcon icon={social.icon} color={social.color} size={20} />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Login;
