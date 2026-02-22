import { useEffect, useRef, useState } from "react";
import MapView from "../components/MapView";

export default function Dashboard() {
  const [mode, setMode] = useState<"Autonomous" | "Manual">("Autonomous");
  const [autoSystem, setAutoSystem] = useState("Sensor Fusion");
  const [logs, setLogs] = useState<string[]>([]);
  const logRef = useRef<HTMLDivElement | null>(null);

  const [position, setPosition] = useState({
    lat: 20.5937,
    lng: 78.9629,
  });

  const [droneStatus, setDroneStatus] = useState<
    "flying" | "landed"
  >("landed");

  // Random autonomous system
  useEffect(() => {
    if (mode === "Autonomous") {
      const systems = ["Sensor Fusion", "SLAM", "IMU"];
      const random = systems[Math.floor(Math.random() * systems.length)];
      setAutoSystem(random);
    }
  }, [mode]);

  // Logs
  useEffect(() => {
    const initialLogs = [
      "Connecting to Drone......",
      "Connection Active!",
      "Running Protocols....",
      "Mission Protocol Active",
      "Initiating Flight Decisions",
    ];

    setLogs(initialLogs);

    const interval = setInterval(() => {
      setLogs((prev) => [...prev, "Mission Status: Good"]);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    logRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  // Movement controls
  const move = (direction: string) => {
    if (droneStatus !== "flying") return;

    const step = 0.01;

    setPosition((prev) => {
      switch (direction) {
        case "up":
          return { ...prev, lat: prev.lat + step };
        case "down":
          return { ...prev, lat: prev.lat - step };
        case "left":
          return { ...prev, lng: prev.lng - step };
        case "right":
          return { ...prev, lng: prev.lng + step };
        default:
          return prev;
      }
    });
  };

  return (
    <div className="h-full flex flex-col">

      {/* MAIN */}
      <div className="flex flex-1 overflow-hidden">

        {/* MAP */}
        <div className="flex-1 bg-black">
          <MapView position={position} status={droneStatus} />
        </div>

        {/* RIGHT PANEL */}
        <div className="w-96 bg-panel border-l border-gray-700 flex flex-col">

          {/* TELEMETRY */}
          <div className="p-4 flex flex-col flex-1">

            <h2 className="text-lg font-semibold mb-4">
              Telemetry
            </h2>

            {/* Mode Switch */}
            <div className="flex gap-2 mb-4">
              <button
                onClick={() => setMode("Autonomous")}
                className={`px-3 py-1 rounded text-sm ${
                  mode === "Autonomous"
                    ? "bg-accent"
                    : "bg-gray-700"
                }`}
              >
                Autonomous
              </button>
              <button
                onClick={() => setMode("Manual")}
                className={`px-3 py-1 rounded text-sm ${
                  mode === "Manual"
                    ? "bg-accent"
                    : "bg-gray-700"
                }`}
              >
                Manual
              </button>
            </div>

            {mode === "Manual" ? (
              <div className="flex flex-col items-center gap-6 flex-1">

                <div className="grid grid-cols-3 gap-2 w-40 text-center">
                  <div></div>
                  <button
                    onClick={() => move("up")}
                    className="bg-gray-700 hover:bg-gray-600 p-3 rounded"
                  >
                    ↑
                  </button>
                  <div></div>

                  <button
                    onClick={() => move("left")}
                    className="bg-gray-700 hover:bg-gray-600 p-3 rounded"
                  >
                    ←
                  </button>

                  <button
                    onClick={() => move("down")}
                    className="bg-gray-700 hover:bg-gray-600 p-3 rounded"
                  >
                    ↓
                  </button>

                  <button
                    onClick={() => move("right")}
                    className="bg-gray-700 hover:bg-gray-600 p-3 rounded"
                  >
                    →
                  </button>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setDroneStatus("flying")}
                    className="bg-green-600 px-3 py-1 rounded text-sm"
                  >
                    Takeoff
                  </button>

                  <button
                    onClick={() => setDroneStatus("landed")}
                    className="bg-yellow-600 px-3 py-1 rounded text-sm"
                  >
                    Land
                  </button>

                  <button className="bg-gray-700 px-3 py-1 rounded text-sm">
                    Hover
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex-1">
                <div className="bg-background p-4 rounded-lg border border-gray-700">
                  <p className="text-sm text-gray-400">
                    Active System
                  </p>
                  <p className="text-xl font-semibold text-accent mt-1">
                    {autoSystem}
                  </p>
                </div>
              </div>
            )}

            <div className="mt-auto pt-4 border-t border-gray-700 text-sm space-y-1">
              <p>Battery: 82%</p>
              <p>Signal: 91%</p>
              <p>Status: {droneStatus.toUpperCase()}</p>
            </div>

          </div>

          {/* VIDEO BELOW TELEMETRY */}
          <div className="border-t border-gray-700 p-3">
            <div className="aspect-video bg-black rounded overflow-hidden">
              <video
                src="/sample.mp4"
                autoPlay
                muted
                loop
                className="w-full h-full object-cover"
              />
            </div>
          </div>

        </div>
      </div>

      {/* LOGS */}
      <div className="h-32 bg-panel border-t border-gray-700 p-3 text-sm text-green-400 font-mono overflow-y-auto">
        {logs.map((log, index) => (
          <p key={index}>{log}</p>
        ))}
        <div ref={logRef} />
      </div>

    </div>
  );
}