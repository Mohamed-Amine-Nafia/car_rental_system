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
    <div className="bg-secondary h-full flex flex-col justify-between items-center overflow-hidden p-6 w-full">
      <div className="">
        <h2 className="text-accent text-2xl font-semibold font-nevera">
          RentalX
        </h2>
      </div>
      <div className="flex flex-col items-center justify-center gap-2 w-full">
        <NavLink
          to="/Dashboard"
          className={({ isActive }) =>
            ` flex   w-full  items-center  gap-2 cursor-pointer  p-2 rounded-sm hover:bg-ternary transition-all duration-500 ease-linear hover:text-secondary ${isActive ? "bg-ternary text-secondary" : " text-ternary"}`
          }
        >
          <LayoutDashboard size={25} strokeWidth={1.5} />
          <span className="text-xs font-semibold">Dashboard</span>
        </NavLink>
        <NavLink
          to="/Cars"
          className={({ isActive }) =>
            ` flex  w-full  items-center gap-2 cursor-pointer  p-2 rounded-sm hover:bg-ternary transition-all duration-500 ease-linear hover:text-secondary ${isActive ? "bg-ternary text-secondary" : " text-ternary"}`
          }
        >
          <CarFront size={25} strokeWidth={1.5} />
          <span className="text-xs font-semibold">Cars</span>
        </NavLink>

        <NavLink
          to="/Rentals"
          className={({ isActive }) =>
            ` flex  w-full  items-center gap-2 cursor-pointer  p-2 rounded-sm hover:bg-ternary transition-all duration-500 ease-linear hover:text-secondary ${isActive ? "bg-ternary text-secondary" : " text-ternary"}`
          }
        >
          {" "}
          <KeyRound size={25} strokeWidth={1.5} />
          <span className="text-xs font-semibold">Rentals</span>
        </NavLink>
        <NavLink
          to="/Clients"
          className={({ isActive }) =>
            ` flex w-full  items-center gap-2 cursor-pointer  p-2 rounded-sm hover:bg-ternary transition-all duration-500 ease-linear hover:text-secondary ${isActive ? "bg-ternary text-secondary" : " text-ternary"}`
          }
        >
          {" "}
          <Users size={25} strokeWidth={1.5} />
          <span className="text-xs font-semibold">Clients</span>
        </NavLink>
        <NavLink
          to="/Invoices"
          className={({ isActive }) =>
            ` flex  w-full  items-center gap-2 cursor-pointer  p-2 rounded-sm hover:bg-ternary transition-all duration-500 ease-linear hover:text-secondary ${isActive ? "bg-ternary text-secondary" : " text-ternary"}`
          }
        >
          {" "}
          <Receipt size={25} strokeWidth={1.5} />
          <span className="text-xs font-semibold">Invoices</span>
        </NavLink>
      </div>
      <div className="text-ternary w-full  flex  items-center gap-2   cursor-pointer  p-2 rounded-sm hover:bg-ternary transition-all duration-500 ease-linear hover:text-secondary">
        <LogOut size={25} strokeWidth={1.5} />
        <span className="text-xs font-semibold">Log out</span>
      </div>
    </div>
  );
}
export default SideBar;
