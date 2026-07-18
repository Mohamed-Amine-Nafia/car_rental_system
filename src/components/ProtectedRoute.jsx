import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { API_URL } from "../config/api";

export default function ProtectedRoute() {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/me.php`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setAuth(data.authenticated))
      .catch(() => setAuth(false));
  }, []);

  if (auth === null) return <div>Loading...</div>;

  return auth ? <Outlet /> : <Navigate to="/" />;
}
