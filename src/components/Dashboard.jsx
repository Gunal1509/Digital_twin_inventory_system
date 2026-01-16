import Simulator from "./Simulator";
import Inventory from "./Inventory";
import Orders from "./Orders";
import Trucks from "./Trucks";
import AddTruck from "./AddTruck";
import Fleet from "./Fleet";
import TruckMap from "./TruckMap";



export default function Dashboard() {
  return (
    <div className="dashboard">
      <div className="card"><h3>Simulation</h3><Simulator/></div>
      <div className="card"><h3>Inventory</h3><Inventory/></div>
      <div className="card"><h3>Orders</h3><Orders/></div>
      <div className="card"><h3>Trucks</h3><Trucks/></div>
      <div className="card">
  <h3>Add New Truck</h3>
  <AddTruck />
</div>

<div className="card">
  <h3>Fleet View</h3>
  <Fleet />
</div>
<div classame="card">
  <h3>Truck Map</h3>
</div>
    </div>
  );
}
