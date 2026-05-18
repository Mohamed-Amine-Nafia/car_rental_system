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
    <div className="bg-secondary h-full flex flex-col justify-between items-center rounded-md  p-6 w-full">
      <div className="">
        <h2 className="text-accent text-2xl font-medium font-nevera">
          RentalX
        </h2>
      </div>
      <div className="flex flex-col items-center justify-center gap-2 w-full">
        <NavLink
          to="/Dashboard"
          className={({ isActive }) =>
            ` flex   w-full  items-center  gap-2 cursor-pointer  px-2 py-1.5 rounded-sm hover:bg-ternary transition-all duration-500 ease-linear hover:text-secondary ${isActive ? "bg-ternary text-secondary" : " text-ternary"}`
          }
        >
          <LayoutDashboard size={24} strokeWidth={1.5} />
          <span className="text-xs font-medium">Dashboard</span>
        </NavLink>
        <NavLink
          to="/Cars"
          className={({ isActive }) =>
            ` flex  w-full  items-center gap-2 cursor-pointer  px-2 py-1.5 rounded-sm hover:bg-ternary transition-all duration-500 ease-linear hover:text-secondary ${isActive ? "bg-ternary text-secondary" : " text-ternary"}`
          }
        >
          <CarFront size={24} strokeWidth={1.5} />
          <span className="text-xs font-medium">Cars</span>
        </NavLink>

        <NavLink
          to="/Rentals"
          className={({ isActive }) =>
            ` flex  w-full  items-center gap-2 cursor-pointer  px-2 py-1.5 rounded-sm hover:bg-ternary transition-all duration-500 ease-linear hover:text-secondary ${isActive ? "bg-ternary text-secondary" : " text-ternary"}`
          }
        >
          {" "}
          <KeyRound size={24} strokeWidth={1.5} />
          <span className="text-xs font-medium">Rentals</span>
        </NavLink>
        <NavLink
          to="/Clients"
          className={({ isActive }) =>
            ` flex w-full  items-center gap-2 cursor-pointer  px-2 py-1.5 rounded-sm hover:bg-ternary transition-all duration-500 ease-linear hover:text-secondary ${isActive ? "bg-ternary text-secondary" : " text-ternary"}`
          }
        >
          {" "}
          <Users size={24} strokeWidth={1.5} />
          <span className="text-xs font-medium">Clients</span>
        </NavLink>
        <NavLink
          to="/Invoices"
          className={({ isActive }) =>
            ` flex  w-full  items-center gap-2 cursor-pointer  px-2 py-1.5 rounded-sm hover:bg-ternary transition-all duration-500 ease-linear hover:text-secondary ${isActive ? "bg-ternary text-secondary" : " text-ternary"}`
          }
        >
          {" "}
          <Receipt size={24} strokeWidth={1.5} />
          <span className="text-xs font-medium">Invoices</span>
        </NavLink>
      </div>
      <div className="text-ternary w-full  flex  items-center gap-2   cursor-pointer  px-2 py-1.5 rounded-sm hover:bg-ternary transition-all duration-500 ease-linear hover:text-secondary">
        <LogOut size={24} strokeWidth={1.5} />
        <span className="text-xs font-medium">Log out</span>
      </div>
    </div>
  );
}
export default SideBar;
