import { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { realtime } from "../firebase/firebase";

export default function Orders() {
  const [orders, setOrders] = useState({});

  useEffect(() => {
    onValue(ref(realtime, "live/orders"), s => {
      setOrders(s.val() || {});
    });
  }, []);

  return (
    <div>
      {Object.entries(orders).map(([id,o]) => (
  <div
    key={id}
    style={{
      background: o.status==="DELIVERED" ? "#064e3b" :
                  o.status==="DELIVERING" ? "#1e3a8a" : "#78350f",
      padding:"10px",
      marginBottom:"8px",
      borderRadius:"8px",
      animation:"pulse 2s infinite"
    }}>
    📦 {o.productId} ({o.qty}) → <b>{o.status}</b> {o.truck && `🚚 ${o.truck}`}
  </div>
))}

    </div>
  );
}
