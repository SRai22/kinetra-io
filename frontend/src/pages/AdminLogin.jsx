import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Lock } from "lucide-react";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await axios.post(`${API}/admin/login`, { email, password });
      localStorage.setItem("kinetra_admin_token", res.data.token);
      localStorage.setItem("kinetra_admin_user", JSON.stringify(res.data.user));
      navigate("/admin");
    } catch (err) {
      const detail = err.response?.data?.detail;
      setError(typeof detail === "string" ? detail : "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050A0F] flex items-center justify-center px-6" data-testid="admin-login-page">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2.5 mb-10">
          <svg viewBox="0 0 28 28" width="24" height="24" fill="none" className="text-[#00E5FF]">
            <circle cx="14" cy="14" r="3" fill="currentColor" opacity="0.9" />
            <circle cx="14" cy="14" r="8" stroke="currentColor" strokeWidth="1" opacity="0.4" />
            <circle cx="14" cy="14" r="13" stroke="currentColor" strokeWidth="0.5" opacity="0.2" strokeDasharray="3 3" />
          </svg>
          <span className="font-mono text-sm font-bold tracking-[0.15em] text-[#F0F4F8]">KINETRA</span>
          <span className="font-mono text-xs text-[#8B9EB0] ml-1">ADMIN</span>
        </div>

        <div className="glass-card rounded-lg p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-[#00E5FF]/10 border border-[#00E5FF]/20 flex items-center justify-center">
              <Lock className="w-4 h-4 text-[#00E5FF]" />
            </div>
            <div>
              <h1 className="text-lg font-semibold tracking-tight text-[#F0F4F8]">Admin Access</h1>
              <p className="text-xs text-[#8B9EB0] font-mono">Mission control login</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs text-[#8B9EB0] font-mono mb-1.5 uppercase tracking-wider">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                data-testid="admin-email-input"
                className="w-full bg-[#050A0F] border border-[#00E5FF]/20 text-[#F0F4F8] rounded-md px-3 py-2.5 text-sm font-mono focus:border-[#00E5FF] focus:ring-1 focus:ring-[#00E5FF] focus:outline-none placeholder:text-[#8B9EB0]/40"
                placeholder="admin@kinetra.io"
              />
            </div>
            <div>
              <label className="block text-xs text-[#8B9EB0] font-mono mb-1.5 uppercase tracking-wider">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                data-testid="admin-password-input"
                className="w-full bg-[#050A0F] border border-[#00E5FF]/20 text-[#F0F4F8] rounded-md px-3 py-2.5 text-sm font-mono focus:border-[#00E5FF] focus:ring-1 focus:ring-[#00E5FF] focus:outline-none placeholder:text-[#8B9EB0]/40"
                placeholder="password"
              />
            </div>

            {error && (
              <p data-testid="admin-login-error" className="text-[#FFB300] text-xs font-mono">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              data-testid="admin-login-submit"
              className="w-full bg-[#00E5FF] text-[#050A0F] font-bold py-2.5 rounded-md font-mono uppercase tracking-wide text-sm hover:bg-[#00E5FF]/85 transition-all disabled:opacity-50 hover:shadow-[0_0_20px_rgba(0,229,255,0.3)]"
            >
              {loading ? "Authenticating..." : "Login"}
            </button>
          </form>

          <a href="/" className="block text-center mt-6 text-xs text-[#8B9EB0] font-mono hover:text-[#00E5FF] transition-colors">
            Back to landing page
          </a>
        </div>
      </div>
    </div>
  );
}
