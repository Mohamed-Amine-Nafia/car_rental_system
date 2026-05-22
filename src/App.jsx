import SideBar from "./components/SideBar";
import Dashboard from "./components/Dashboard";
import Cars from "./components/Cars";
import Rentals from "./components/Rentals";
import Clients from "./components/Clients";
import Invoices from "./components/Invoices";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
function App() {
  return (
    <BrowserRouter>
      <div className="bg-primary w-screen h-screen flex flex-col font-Poppins overflow-hidden">
        <div className="w-full">
          <SideBar />
        </div>

        <div className="w-full h-4/5">
          <Routes>
            <Route path="/" element={<Dashboard />}></Route>
            <Route path="/Cars" element={<Cars />}></Route>
            <Route path="/Rentals" element={<Rentals />}></Route>
            <Route path="/Clients" element={<Clients />}></Route>
            <Route path="/Invoices" element={<Invoices />}></Route>
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}
export default App;
