import { useEffect, useRef } from "react";
import L from "leaflet";

type Props = {
  position: { lat: number; lng: number };
  status: "flying" | "landed";
};

export default function MapView({ position, status }: Props) {
  const mapRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);

  useEffect(() => {
    if (!mapRef.current) {
      const map = L.map("map").setView([position.lat, position.lng], 6);

      L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      ).addTo(map);

      mapRef.current = map;

      const droneIcon = createDroneIcon(status);

      const marker = L.marker([position.lat, position.lng], {
        icon: droneIcon,
      }).addTo(map);

      markerRef.current = marker;
    }
  }, []);

  // Update marker position
  useEffect(() => {
    if (markerRef.current) {
      markerRef.current.setLatLng([position.lat, position.lng]);
      mapRef.current?.panTo([position.lat, position.lng]);
    }
  }, [position]);

  // Update marker color when status changes
  useEffect(() => {
    if (markerRef.current) {
      markerRef.current.setIcon(createDroneIcon(status));
    }
  }, [status]);

  return <div id="map" className="w-full h-full" />;
}

function createDroneIcon(status: "flying" | "landed") {
  const color = status === "flying" ? "#16a34a" : "#eab308"; // green / yellow

  return L.divIcon({
    className: "",
    html: `
      <div style="
        width: 20px;
        height: 20px;
        background: ${color};
        border-radius: 50%;
        border: 2px solid white;
        box-shadow: 0 0 10px ${color};
      "></div>
    `,
    iconSize: [20, 20],
    iconAnchor: [10, 10],
  });
}