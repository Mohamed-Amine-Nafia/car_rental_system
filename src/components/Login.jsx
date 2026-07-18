import { useState } from "react";
import { useAuth } from "./AuthContext";
import { Lock, LogInIcon, MailCheck, UserKey } from "lucide-react";

import { API_URL } from "../config/api";

export default function Login({ language, translations }) {
  const { setUser } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${API_URL}/login.php`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (!res.ok) {
        throw new Error(
          data.message || translations?.loginFailed || "Login failed",
        );
      }

      const data = await res.json();

      console.log(data);

      // 🔥 THIS is the key integration
      setUser(data.user);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary  px-4">
      <div className="w-full max-w-md bg-slate-100 border border-gray-800 rounded-xl p-8 pt-4">
        <div className="flex items-center justify-center">
          <UserKey
            className="text-secondary  bg-slate-300 p-1.5 rounded-full"
            size={52}
            strokeWidth={1.5}
          />
        </div>

        {error && (
          <div className="bg-red-500/10 text-center text-xs text-red-400 p-2 my-4 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4 text-sm mt-4">
          <div className="relative">
            <input
              type="email"
              placeholder={translations?.email || "Email"}
              className="w-full py-2 px-7 rounded bg-slate-200"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <MailCheck
              size={18}
              className="absolute top-1/2 -translate-y-1/2 left-1.5"
            />
          </div>

          <div className="relative">
            <input
              type="password"
              placeholder={translations?.passwordPlaceholder || "Password"}
              className="w-full py-2 px-7 rounded bg-slate-200"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Lock
              size={18}
              className="absolute top-1/2 -translate-y-1/2 left-1.5"
            />
          </div>
          <div className="text-xs text-slate-500">
            <p>Email demo: demo@agency.com</p>
            <p>{translations?.demoPassword || "Demo password"}: 123456</p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-secondary py-2 px-3 h-10  rounded text-ternary text-base relative inline-flex items-center gap-1 justify-center cursor-pointer hover:bg-accent hover:text-secondary duration-200 ease-linear"
          >
            {loading ? (
              <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 h-6 w-6 rounded-full bg-transparent border-2 border-ternary border-r-secondary animate-spin "></div>
            ) : (
              translations?.loginButton || "Login"
            )}
            <LogInIcon
              size={19}
              strokeWidth={1.5}
              className={`${loading ? "hidden" : null} `}
            />
          </button>
        </form>
      </div>
    </div>
  );
}
