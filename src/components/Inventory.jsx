import { useEffect, useState } from "react";
import { listenStock } from "../api/warehouseApi";

export default function Inventory() {
  const [stock, setStock] = useState({});

  useEffect(() => {
    listenStock(setStock);
  }, []);

  return (
    <div className="inventory-grid">
      {Object.entries(stock).map(([id, qty]) => (
        <div key={id} className={`stock-item ${qty < 5 ? "low" : ""}`}>
          <h4>{id}</h4>
          <p>{qty} units</p>
        </div>
      ))}
    </div>
  );
}
