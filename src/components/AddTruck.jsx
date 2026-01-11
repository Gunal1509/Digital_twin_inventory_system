import { useState } from "react";
import { ref, set } from "firebase/database";
import { realtime } from "../firebase/firebase";

export default function AddTruck() {
  const [name, setName] = useState("");

  function addTruck() {
    if (!name) return alert("Enter truck name");

    set(ref(realtime, "live/trucks/" + name), {
      lat: 13.05 + Math.random() * 0.1,
      lng: 80.25 + Math.random() * 0.1,
      load: 0,
      status: "IDLE"
    });

    setName("");
  }

  return (
    <div>
      <input
        placeholder="Truck ID (e.g. truck3)"
        value={name}
        onChange={e => setName(e.target.value)}
        style={{ padding: "8px", marginRight: "8px" }}
      />
      <button onClick={addTruck}>Add Truck</button>
    </div>
  );
}
