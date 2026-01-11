import { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { realtime } from "../firebase/firebase";

export default function Trucks() {
  const [trucks, setTrucks] = useState({});

  useEffect(() => {
    onValue(ref(realtime, "live/trucks"), s => {
      setTrucks(s.val() || {});
    });
  }, []);

  return (
    <div>
      {Object.entries(trucks).map(([id,t]) => (
  <div
    key={id}
    style={{
      background: t.status==="DELIVERING" ? "#1e3a8a" : "#020617",
      padding:"10px",
      marginBottom:"8px",
      borderRadius:"8px",
      transform: t.status==="DELIVERING" ? "translateX(20px)" : "none",
      transition:"0.5s"
    }}>
    🚚 {id} → {t.status} | Load: {t.load}
  </div>
))}

    </div>
  );
}
