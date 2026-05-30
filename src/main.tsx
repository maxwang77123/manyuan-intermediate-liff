import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { initSentry } from "./lib/sentry";

// Swallow LIFF SDK internal MessagePort errors so they do not crash the app
window.addEventListener("error", (e) => {
  if (e.message && e.message.includes("bg")) {
    e.preventDefault();
    e.stopPropagation();
  }
});
window.addEventListener("unhandledrejection", (e) => {
  if (e.reason && String(e.reason).includes("bg")) {
    e.preventDefault();
  }
});

initSentry();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
