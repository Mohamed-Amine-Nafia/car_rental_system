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
      <div className="bg-primary w-screen h-screen flex font-Poppins">
        <div className="w-1/5">
          <SideBar />
        </div>

        <div className="w-4/5">
          <Routes>
            <Route path="/Dashboard" element={<Dashboard />}></Route>
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
