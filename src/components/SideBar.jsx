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
    <div className="bg-secondary h-screen flex flex-col justify-between items-center  p-6 w-full">
      <div className="w-full flex ">
        <h2 className="text-primary  text-2xl inline-flex font-medium font-nevera">
          Rental
          <img
            className="w-8"
            src="../../src/assets/images/wheel.webp"
            alt=""
          />
          X
        </h2>
      </div>
      <div className="flex flex-col items-center justify-center gap-2 w-full">
        <NavLink
          to="/Dashboard"
          className={({ isActive }) =>
            ` flex   w-full  items-center  gap-2 cursor-pointer  px-2 py-2 rounded-sm hover:bg-ternary transition-all duration-500 ease-linear hover:text-secondary ${isActive ? "bg-ternary text-secondary" : " text-ternary"}`
          }
        >
          <LayoutDashboard size={24} strokeWidth={1.5} />
          <span className="text-xs font-medium">Tableau de bord</span>
        </NavLink>
        <NavLink
          to="/Cars"
          className={({ isActive }) =>
            ` flex  w-full  items-center gap-2 cursor-pointer  px-2 py-2 rounded-sm hover:bg-ternary transition-all duration-500 ease-linear hover:text-secondary ${isActive ? "bg-ternary text-secondary" : " text-ternary"}`
          }
        >
          <CarFront size={24} strokeWidth={1.5} />
          <span className="text-xs font-medium">Flotte</span>
        </NavLink>

        <NavLink
          to="/Rentals"
          className={({ isActive }) =>
            ` flex  w-full  items-center gap-2 cursor-pointer  px-2 py-2 rounded-sm hover:bg-ternary transition-all duration-500 ease-linear hover:text-secondary ${isActive ? "bg-ternary text-secondary" : " text-ternary"}`
          }
        >
          {" "}
          <KeyRound size={24} strokeWidth={1.5} />
          <span className="text-xs font-medium">Reservations</span>
        </NavLink>
        <NavLink
          to="/Clients"
          className={({ isActive }) =>
            ` flex w-full  items-center gap-2 cursor-pointer  px-2 py-2 rounded-sm hover:bg-ternary transition-all duration-500 ease-linear hover:text-secondary ${isActive ? "bg-ternary text-secondary" : " text-ternary"}`
          }
        >
          {" "}
          <Users size={24} strokeWidth={1.5} />
          <span className="text-xs font-medium">Clients</span>
        </NavLink>
        <NavLink
          to="/Invoices"
          className={({ isActive }) =>
            ` flex  w-full  items-center gap-2 cursor-pointer  px-2 py-2 rounded-sm hover:bg-ternary transition-all duration-500 ease-linear hover:text-secondary ${isActive ? "bg-ternary text-secondary" : " text-ternary"}`
          }
        >
          {" "}
          <Receipt size={24} strokeWidth={1.5} />
          <span className="text-xs font-medium">Factures</span>
        </NavLink>
      </div>
      <div className="text-ternary w-full  flex  items-center gap-2   cursor-pointer  px-2 py-2 rounded-sm hover:bg-ternary transition-all duration-500 ease-linear hover:text-secondary">
        <LogOut size={24} strokeWidth={1.5} />
        <span className="text-xs font-medium">Deconnexion</span>
      </div>
    </div>
  );
}
export default SideBar;
