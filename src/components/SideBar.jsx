import {
  Bell,
  CarFront,
  KeyRound,
  LayoutDashboard,
  LogOut,
  Receipt,
  Road,
  Scroll,
  Settings,
  Users,
} from "lucide-react";

import Setting from "./Setting.jsx";
import { useState } from "react";
import { NavLink } from "react-router-dom";

import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext"; // adjust path if needed

function SideBar({ onClick, language, onLanguageChange }) {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const handleLogout = async () => {
    try {
      await fetch("http://localhost/car_rental/logout.php", {
        method: "POST",
        credentials: "include",
      });

      setUser(null);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-between items-center px-6 py-3 w-full ">
      <div className="flex items-center">
        <img
          src="../../src/assets/images/logo.svg"
          alt="logo"
          className="w-32"
        />
      </div>
      <div className="flex items-center justify-between gap-4 ">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            ` flex items-center  gap-2 cursor-pointer  px-5 py-2 rounded-full hover:bg-accent transition-all duration-300 ease-linear hover:text-secondary ${isActive ? "bg-accent text-ternary" : " text-ternary bg-secondary"}`
          }
        >
          <LayoutDashboard size={20} strokeWidth={1.5} />
          <span className="text-xs font-medium">
            {language === "ar" ? "لوحة التحكم" : "Dashboard"}
          </span>
        </NavLink>
        <NavLink
          to="/cars"
          className={({ isActive }) =>
            ` flex items-center gap-2 cursor-pointer  px-5 py-2 rounded-full hover:bg-accent transition-all duration-300 ease-linear hover:text-secondary ${isActive ? "bg-accent text-ternary" : " text-ternary bg-secondary"}`
          }
        >
          <CarFront size={20} strokeWidth={1.5} />
          <span className="text-xs font-medium">
            {language === "ar" ? "السيارات" : "Cars"}
          </span>
        </NavLink>

        <NavLink
          to="/rentals"
          className={({ isActive }) =>
            ` flex  items-center gap-2 cursor-pointer  px-5 py-2 rounded-full hover:bg-accent transition-all duration-300 ease-linear hover:text-secondary ${isActive ? "bg-accent text-ternary" : " text-ternary bg-secondary"}`
          }
        >
          {" "}
          <KeyRound size={20} strokeWidth={1.5} />
          <span className="text-xs font-medium">
            {language === "ar" ? "الحجوزات" : "Reservations"}
          </span>
        </NavLink>
        <NavLink
          to="/clients"
          className={({ isActive }) =>
            ` flex items-center gap-2 cursor-pointer  px-5 py-2 rounded-full hover:bg-accent transition-all duration-300 ease-linear hover:text-secondary ${isActive ? "bg-accent text-ternary" : " text-ternary bg-secondary"}`
          }
        >
          {" "}
          <Users size={20} strokeWidth={1.5} />
          <span className="text-xs font-medium">
            {language === "ar" ? "العملاء" : "Clients"}
          </span>
        </NavLink>
        <NavLink
          to="/invoices"
          className={({ isActive }) =>
            ` flex  items-center gap-2 cursor-pointer  px-5 py-2 rounded-full hover:bg-accent transition-all duration-300 ease-linear hover:text-secondary ${isActive ? "bg-accent text-ternary" : " text-ternary bg-secondary"}`
          }
        >
          {" "}
          <Scroll size={20} strokeWidth={1.5} />
          <span className="text-xs font-medium">
            {language === "ar" ? "العقود" : "Contracts"}
          </span>
        </NavLink>
      </div>
      <div className="flex items-center gap-2.5">
        <div className="flex items-center  cursor-pointer text-sm">
          <button
            type="button"
            onClick={() => onLanguageChange("en")}
            className={`inline-flex items-center gap-1.5 rounded-full px-2 py-1 `}
          >
            <img
              className="w-4"
              src="../../src/assets/images/english.png"
              alt="English"
            />
            EN
          </button>
          <button
            type="button"
            onClick={() => onLanguageChange("ar")}
            className={`inline-flex items-center gap-1.5 rounded-full px-2 py-1 `}
          >
            <img
              className="w-5"
              src="../../src/assets/images/morocco.png"
              alt="Arabic"
            />
            AR
          </button>
        </div>
        <button
          onClick={handleLogout}
          className="text-xs font-medium inline-flex items-center gap-1.5 text-ternary bg-secondary cursor-pointer px-5 py-2 rounded-full hover:bg-accent transition-all duration-300 ease-linear hover:text-secondary"
        >
          <LogOut size={20} strokeWidth={1.5} />
          {language === "ar" ? "تسجيل الخروج" : "Logout"}
        </button>
        <Settings
          onClick={() => onClick(true)}
          size={32}
          strokeWidth={1.5}
          className="cursor-pointer hover:bg-accent hover:text-ternary p-1 rounded-full duration-200 ease-linear"
        />
      </div>
    </div>
  );
}
export default SideBar;
