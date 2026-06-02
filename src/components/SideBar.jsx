import {
  CarFront,
  KeyRound,
  LayoutDashboard,
  LogOut,
  Receipt,
  Road,
  Users,
} from "lucide-react";
import { useState } from "react";
import { NavLink } from "react-router-dom";

function SideBar() {
  return (
    <div className="flex justify-between items-center px-6 py-3 w-full ">
      <div className="flex items-center">
        <h2 className="text-secondary text-3xl inline-flex font-medium font-gibed">
          OUZLAF DRIVE
        </h2>
      </div>
      <div className="flex items-center justify-between gap-4 ">
        <NavLink
          to="/"
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
          <span className="text-xs font-medium">Reservations</span>
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
      <div className="text-ternary bg-secondary flex  items-center gap-2 cursor-pointer px-5 py-2 rounded-full hover:bg-accent transition-all duration-300 ease-linear hover:text-secondary">
        <LogOut size={20} strokeWidth={1.5} />
        <span className="text-xs font-medium">Deconnexion</span>
      </div>
    </div>
  );
}
export default SideBar;
