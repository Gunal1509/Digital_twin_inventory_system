import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { realtime } from "../firebase/firebase";
import L from "leaflet";

// fix marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png"
});

export default function TruckMap() {
  const [trucks, setTrucks] = useState({});

  useEffect(() => {
    onValue(ref(realtime, "live/trucks"), snap => {
      setTrucks(snap.val() || {});
    });
  }, []);

  return (
    <MapContainer
  center={[13.0827, 80.2707]}
  zoom={12}
  style={{
    height: "350px",
    width: "100%",
    borderRadius: "15px"
  }}
>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {Object.entries(trucks).map(([id, t]) => (
        <Marker key={id} position={[t.lat, t.lng]}>
          <Popup>
            🚚 {id}<br />
            Status: {t.status}<br />
            Load: {t.load}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
