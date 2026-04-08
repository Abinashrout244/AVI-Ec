import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeToast } from "../utilis/ToastSlice";

const TYPE_STYLES = {
  success: "border-emerald-400/40 text-emerald-200",
  error: "border-rose-400/40 text-rose-200",
  warning: "border-amber-400/40 text-amber-200",
  info: "border-sky-400/40 text-sky-200",
};

const ToastContainer = () => {
  const dispatch = useDispatch();
  const toasts = useSelector((store) => store?.toast?.items || []);
  const timersRef = useRef(new Map());

  useEffect(() => {
    toasts.forEach((toast) => {
      if (!timersRef.current.has(toast.id)) {
        const timer = setTimeout(() => {
          dispatch(removeToast({ id: toast.id }));
          timersRef.current.delete(toast.id);
        }, toast.duration || 2200);
        timersRef.current.set(toast.id, timer);
      }
    });
  }, [toasts, dispatch]);

  useEffect(() => {
    return () => {
      timersRef.current.forEach((timer) => clearTimeout(timer));
      timersRef.current.clear();
    };
  }, []);

  if (!toasts.length) return null;

  return (
    <div className="fixed top-24 right-4 md:right-10 z-[60] flex flex-col gap-3">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`lux-card px-4 py-3 rounded-2xl border ${TYPE_STYLES[toast.type] || TYPE_STYLES.info}`}
        >
          <p className="text-sm font-semibold">{toast.message}</p>
        </div>
      ))}
    </div>
  );
};

export default ToastContainer;
