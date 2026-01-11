import { ref, set, push } from "firebase/database";
import { realtime } from "../firebase/firebase";
import { v4 as uuid } from "uuid";

const products = ["P001","P002","P003","P004","P005"];

export default function Simulator() {

  function runSimulation() {
    const p = products[Math.floor(Math.random() * products.length)];
    const qty = Math.floor(Math.random() * 5) + 1;

    set(ref(realtime, "live/stock/" + p), Math.floor(Math.random() * 100));

    push(ref(realtime, "live/orders"), {
      id: uuid(),
      productId: p,
      qty,
      status: "PLACED",
      time: Date.now()
    });
  }

  function setupTrucks() {
    set(ref(realtime, "live/trucks"), {
      truck1: { lat:13.0827, lng:80.2707, load:0, status:"IDLE" },
      truck2: { lat:13.06, lng:80.24, load:0, status:"IDLE" }
    });
    alert("Trucks added");
  }

  return (
    <>
      <button onClick={runSimulation}>Run Simulation</button>
      <br/><br/>
      <button onClick={setupTrucks}>Setup Trucks</button>
    </>
  );
}
