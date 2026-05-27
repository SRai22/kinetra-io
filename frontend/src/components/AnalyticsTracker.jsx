import { useEffect, useRef, useCallback } from "react";
import axios from "axios";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

function getSessionId() {
  let sid = sessionStorage.getItem("kinetra_sid");
  if (!sid) {
    sid = `s_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
    sessionStorage.setItem("kinetra_sid", sid);
  }
  return sid;
}

function trackEvent(eventType, metadata = {}) {
  const payload = {
    event_type: eventType,
    session_id: getSessionId(),
    metadata,
    page_url: window.location.href,
  };
  // Use sendBeacon for reliability, fallback to axios
  if (navigator.sendBeacon) {
    const blob = new Blob([JSON.stringify(payload)], { type: "application/json" });
    navigator.sendBeacon(`${API}/analytics/event`, blob);
  } else {
    axios.post(`${API}/analytics/event`, payload).catch(() => {});
  }
}

export { trackEvent, getSessionId };

export default function AnalyticsTracker() {
  const tracked = useRef(new Set());

  const handleSectionView = useCallback((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !tracked.current.has(entry.target.id)) {
        tracked.current.add(entry.target.id);
        trackEvent("section_view", { section: entry.target.id });
      }
    });
  }, []);

  useEffect(() => {
    // Track page view
    trackEvent("page_view");

    // Observe sections
    const observer = new IntersectionObserver(handleSectionView, {
      threshold: 0.3,
    });

    const sections = document.querySelectorAll("section[id]");
    sections.forEach((s) => observer.observe(s));

    return () => observer.disconnect();
  }, [handleSectionView]);

  return null;
}
