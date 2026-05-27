import { useState } from "react";
import axios from "axios";
import { trackEvent } from "./AnalyticsTracker";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function WaitlistForm({ idPrefix = "hero" }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  const handleFocus = () => {
    trackEvent("form_focus", { form: idPrefix });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus("loading");
    trackEvent("form_submit", { form: idPrefix });
    try {
      const res = await axios.post(`${API}/waitlist`, { email, source: idPrefix });
      if (res.data.success) {
        setStatus("success");
        setMessage(res.data.message);
        trackEvent("form_success", { form: idPrefix, email });
      } else {
        setStatus("error");
        setMessage(res.data.message);
      }
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Try again.");
    }
  };

  if (status === "success") {
    return (
      <div data-testid={`${idPrefix}-waitlist-success`} className="flex items-center gap-3 font-mono text-[#00E5FF] text-sm sm:text-base">
        <span className="inline-block w-2 h-2 bg-[#00E5FF] rounded-full animate-pulse" />
        {message}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row w-full max-w-md gap-2 sm:gap-0">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="engineer@company.com"
        required
        data-testid={`${idPrefix}-waitlist-input`}
        onFocus={handleFocus}
        className="bg-[#050A0F] border border-[#00E5FF]/30 text-[#F0F4F8] focus:border-[#00E5FF] focus:ring-1 focus:ring-[#00E5FF] focus:outline-none sm:rounded-l-md sm:rounded-r-none rounded-md px-4 py-3 h-12 w-full font-mono text-sm placeholder:text-[#8B9EB0]/60"
      />
      <button
        type="submit"
        disabled={status === "loading"}
        data-testid={`${idPrefix}-waitlist-submit`}
        className="bg-[#00E5FF] text-[#050A0F] font-bold px-6 py-3 h-12 sm:rounded-r-md sm:rounded-l-none rounded-md hover:bg-[#00E5FF]/85 transition-all duration-300 uppercase font-mono tracking-wide text-sm whitespace-nowrap disabled:opacity-50 hover:shadow-[0_0_20px_rgba(0,229,255,0.4)]"
      >
        {status === "loading" ? "Sending..." : "Join the waitlist"}
      </button>
      {status === "error" && (
        <p data-testid={`${idPrefix}-waitlist-error`} className="text-[#FFB300] text-xs font-mono mt-1 sm:hidden">{message}</p>
      )}
    </form>
  );
}
