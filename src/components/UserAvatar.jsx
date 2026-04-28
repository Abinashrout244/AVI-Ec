/**
 * UserAvatar — Reusable dynamic avatar component.
 * Shows user.photoURL when present; falls back to a gold-gradient
 * circle containing the first letter of the display name / email.
 */
import React from "react";

const UserAvatar = ({
  user,
  size = "md", // "sm" | "md" | "lg" | "xl"
  className = "",
}) => {
  const sizeMap = {
    sm: { outer: "size-9", text: "text-sm" },
    md: { outer: "size-12", text: "text-lg" },
    lg: { outer: "size-20", text: "text-3xl" },
    xl: { outer: "size-28", text: "text-4xl" },
  };

  const { outer, text } = sizeMap[size] || sizeMap.md;

  const initial =
    user?.displayName?.charAt(0)?.toUpperCase() ||
    user?.email?.charAt(0)?.toUpperCase() ||
    "?";

  return (
    <div
      className={`${outer} rounded-full flex-shrink-0 ring-2 ring-[#e0b96a]/60 hover:ring-[#e0b96a] transition-all duration-300 overflow-hidden ${className}`}
    >
      {user?.photoURL ? (
        <img
          src={user.photoURL}
          alt={user.displayName || "User"}
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      ) : (
        <div
          className={`w-full h-full flex items-center justify-center font-black ${text} select-none`}
          style={{
            background:
              "linear-gradient(135deg, #e0b96a 0%, #c8973a 50%, #a87630 100%)",
            color: "#0a0603",
          }}
        >
          {initial}
        </div>
      )}
    </div>
  );
};

export default UserAvatar;
