import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

import SideBar from "./components/SideBar";
import Dashboard from "./components/Dashboard";
import Cars from "./components/Cars";
import Rentals from "./components/Rentals";
import Clients from "./components/Clients";
import Invoices from "./components/Invoices";
import Login from "./components/Login";

import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider, useAuth } from "./components/AuthContext";

function Layout({ children }) {
  return (
    <div className="flex flex-col w-screen h-screen font-Poppins bg-primary overflow-hidden">
      <SideBar />
      <div className="w-full h-4/5">{children}</div>
    </div>
  );
}

function AppRoutes() {
  const { user } = useAuth();

  return (
    <Routes>
      {/* PUBLIC */}
      <Route
        path="/"
        element={user ? <Navigate to="/dashboard" /> : <Login />}
      />

      {/* PROTECTED */}
      <Route element={<ProtectedRoute />}>
        <Route
          path="/dashboard"
          element={
            <Layout>
              <Dashboard />
            </Layout>
          }
        />

        <Route
          path="/cars"
          element={
            <Layout>
              <Cars />
            </Layout>
          }
        />

        <Route
          path="/rentals"
          element={
            <Layout>
              <Rentals />
            </Layout>
          }
        />

        <Route
          path="/clients"
          element={
            <Layout>
              <Clients />
            </Layout>
          }
        />

        <Route
          path="/invoices"
          element={
            <Layout>
              <Invoices />
            </Layout>
          }
        />
      </Route>

      {/* fallback */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}
