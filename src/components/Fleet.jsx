import { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { realtime } from "../firebase/firebase";

export default function Fleet() {
  const [trucks, setTrucks] = useState({});

  useEffect(() => {
    onValue(ref(realtime, "live/trucks"), snap => {
      setTrucks(snap.val() || {});
    });
  }, []);

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "15px" }}>
      {Object.entries(trucks).map(([id, t]) => (
        <div
          key={id}
          style={{
            width: "120px",
            padding: "10px",
            borderRadius: "12px",
            background: t.status === "IDLE"
              ? "linear-gradient(#064e3b,#022c22)"
              : "linear-gradient(#1e3a8a,#020617)",
            textAlign: "center",
            boxShadow: "0 0 15px rgba(56,189,248,0.5)",
            animation: "float 3s infinite"
          }}>
          🚚
          <br />
          <b>{id}</b>
          <br />
          {t.status}
        </div>
      ))}
    </div>
  );
}
