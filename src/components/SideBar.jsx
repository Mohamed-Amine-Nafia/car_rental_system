import {
  Bell,
  CarFront,
  KeyRound,
  LayoutDashboard,
  LogOut,
  Receipt,
  Road,
  Settings,
  Users,
} from "lucide-react";
import { useState } from "react";
import { NavLink } from "react-router-dom";

import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext"; // adjust path if needed

function SideBar() {
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
          src="../../src/assets/images/logo.png"
          alt="logo"
          className="w-32"
        />
      </div>
      <div className="flex items-center justify-between gap-4 ">
        <NavLink
          to="/Dashboard"
          className={({ isActive }) =>
            ` flex items-center  gap-2 cursor-pointer  px-5 py-2 rounded-full hover:bg-accent transition-all duration-300 ease-linear hover:text-secondary ${isActive ? "bg-accent text-secondary" : " text-ternary bg-secondary"}`
          }
        >
          <LayoutDashboard size={20} strokeWidth={1.5} />
          <span className="text-xs font-medium">Tableau de bord</span>
        </NavLink>
        <NavLink
          to="/Cars"
          className={({ isActive }) =>
            ` flex items-center gap-2 cursor-pointer  px-5 py-2 rounded-full hover:bg-accent transition-all duration-300 ease-linear hover:text-secondary ${isActive ? "bg-accent text-secondary" : " text-ternary bg-secondary"}`
          }
        >
          <CarFront size={20} strokeWidth={1.5} />
          <span className="text-xs font-medium">Flotte</span>
        </NavLink>

        <NavLink
          to="/Rentals"
          className={({ isActive }) =>
            ` flex  items-center gap-2 cursor-pointer  px-5 py-2 rounded-full hover:bg-accent transition-all duration-300 ease-linear hover:text-secondary ${isActive ? "bg-accent text-secondary" : " text-ternary bg-secondary"}`
          }
        >
          {" "}
          <KeyRound size={20} strokeWidth={1.5} />
          <span className="text-xs font-medium">Résérvations</span>
        </NavLink>
        <NavLink
          to="/Clients"
          className={({ isActive }) =>
            ` flex items-center gap-2 cursor-pointer  px-5 py-2 rounded-full hover:bg-accent transition-all duration-300 ease-linear hover:text-secondary ${isActive ? "bg-accent text-secondary" : " text-ternary bg-secondary"}`
          }
        >
          {" "}
          <Users size={20} strokeWidth={1.5} />
          <span className="text-xs font-medium">Clients</span>
        </NavLink>
        <NavLink
          to="/Invoices"
          className={({ isActive }) =>
            ` flex  items-center gap-2 cursor-pointer  px-5 py-2 rounded-full hover:bg-accent transition-all duration-300 ease-linear hover:text-secondary ${isActive ? "bg-accent text-secondary" : " text-ternary bg-secondary"}`
          }
        >
          {" "}
          <Receipt size={20} strokeWidth={1.5} />
          <span className="text-xs font-medium">Factures</span>
        </NavLink>
      </div>
      <div className="flex items-center gap-2.5">
        <Bell size={25} strokeWidth={1.5} />
        <Settings size={25} strokeWidth={1.5} />
        <button
          onClick={handleLogout}
          className="text-xs font-medium inline-flex items-center gap-1.5 text-ternary bg-secondary cursor-pointer px-5 py-2 rounded-full hover:bg-accent transition-all duration-300 ease-linear hover:text-secondary"
        >
          <LogOut size={20} strokeWidth={1.5} />
          Deconnexion
        </button>
      </div>
    </div>
  );
}
export default SideBar;
