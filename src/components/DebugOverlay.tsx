import { useEffect, useState } from "react";

const MAX_LINES = 30;

export default function DebugOverlay() {
  const [lines, setLines] = useState<string[]>([]);

  const add = (prefix: string, args: unknown[]) => {
    const msg = args.map(a => {
      try { return typeof a === "object" ? JSON.stringify(a) : String(a); }
      catch { return "[unserializable]"; }
    }).join(" ");
    setLines(prev => [...prev.slice(-MAX_LINES), `[${prefix}] ${msg}`]);
  };

  useEffect(() => {
    const origLog = console.log.bind(console);
    const origWarn = console.warn.bind(console);
    const origError = console.error.bind(console);

    console.log = (...args) => { origLog(...args); add("LOG", args); };
    console.warn = (...args) => { origWarn(...args); add("WARN", args); };
    console.error = (...args) => { origError(...args); add("ERR", args); };

    const onError = (e: ErrorEvent) => {
      add("UNCAUGHT", [e.message, e.filename?.split("/").pop(), e.lineno]);
    };
    const onUnhandled = (e: PromiseRejectionEvent) => {
      add("REJECT", [String(e.reason)]);
    };

    window.addEventListener("error", onError);
    window.addEventListener("unhandledrejection", onUnhandled);

    add("LOG", ["DebugOverlay ready, LIFF init starting..."]);

    return () => {
      console.log = origLog;
      console.warn = origWarn;
      console.error = origError;
      window.removeEventListener("error", onError);
      window.removeEventListener("unhandledrejection", onUnhandled);
    };
  }, []);

  if (lines.length === 0) return null;

  return (
    <div style={{
      position: "fixed", bottom: 0, left: 0, right: 0,
      maxHeight: "40vh", overflowY: "auto",
      background: "rgba(0,0,0,0.85)", color: "#0f0",
      fontSize: 10, fontFamily: "monospace",
      padding: "4px 8px", zIndex: 9999,
      borderTop: "2px solid #0f0"
    }}>
      {lines.map((l, i) => (
        <div key={i} style={{ color: l.startsWith("[ERR]") || l.startsWith("[UNCAUGHT]") || l.startsWith("[REJECT]") ? "#f55" : l.startsWith("[WARN]") ? "#ff0" : "#0f0" }}>
          {l}
        </div>
      ))}
    </div>
  );
}
