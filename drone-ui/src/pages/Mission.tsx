import { useState, useEffect, useRef } from "react";

export default function Mission() {
  const [activeView, setActiveView] = useState("below");
  const [logs, setLogs] = useState<string[]>([]);
  const logEndRef = useRef<HTMLDivElement | null>(null);

  const [controlMode, setControlMode] = useState("Autonomous");
  const [algorithm, setAlgorithm] = useState("SLP-based");

  const handleAbort = () => {
    alert("⚠ Mission Aborted!");}
  const randomLog = () => {
    const messages = [
      "Autonomous navigation engaged",
      "Stabilizing altitude",
      "Obstacle detected - recalculating path",
      "Waypoint reached successfully",
      "Adjusting heading by 3°",
      "Battery nominal",
      "Maintaining altitude at 32m",
      "Wind correction applied",
      "Signal strength stable",
      "Scanning terrain below",
    ];

    const randomMsg =
      messages[Math.floor(Math.random() * messages.length)];

    const timestamp = new Date().toLocaleTimeString();

    return `[${timestamp}] ${randomMsg}`;
  };

  // Simulate live logs
  useEffect(() => {
    if (activeView !== "logs") return;

    const interval = setInterval(() => {
      setLogs((prev) => {
        const updated = [...prev, randomLog()];
        return updated.slice(-50); // Keep last 50 logs only
      });
    }, 1200);

    return () => clearInterval(interval);
  }, [activeView]);

  // Auto scroll
  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  const renderContent = () => {
    if (activeView === "logs") {
      return (
        <div className="h-full bg-black text-green-400 font-mono p-4 overflow-y-auto text-sm">
          {logs.map((log, index) => (
            <p key={index}>{log}</p>
          ))}
          <div ref={logEndRef} />
        </div>
      );
    }

    const videoSource =
      activeView === "below"
        ? "/below.mp4"
        : "/front.mp4";

    return (
      <video
        src={videoSource}
        autoPlay
        muted
        loop
        controls
        className="w-full h-full object-cover"
      />
    );
  };



  

  return (
    <div className="h-full flex relative">

      {/* Sidebar */}
      <div className="w-48 bg-panel border-r border-gray-700 flex flex-col">

        <button
          onClick={() => setActiveView("below")}
          className={`p-4 text-left ${
            activeView === "below"
              ? "bg-background text-accent"
              : "hover:bg-gray-800"
          }`}
        >
          Below POV
        </button>

        <button
          onClick={() => setActiveView("front")}
          className={`p-4 text-left ${
            activeView === "front"
              ? "bg-background text-accent"
              : "hover:bg-gray-800"
          }`}
        >
          Front POV
        </button>

        <button
          onClick={() => setActiveView("logs")}
          className={`p-4 text-left ${
            activeView === "logs"
              ? "bg-background text-accent"
              : "hover:bg-gray-800"
          }`}
        >
          Mission Logs
        </button>

      </div>

      {/* Main Content */}
      <div className="flex-1 bg-black">
        {renderContent()}
      </div>
      {/* Mission Control Panel */}
<div className="absolute bottom-6 right-6 w-80 bg-panel border border-gray-700 rounded-lg shadow-lg p-4">

  <h2 className="text-sm font-semibold text-accent mb-4">
    Mission Control Session
  </h2>

  {/* Control Mode */}
  <div className="mb-4">
    <label className="block text-xs text-gray-400 mb-1">
      Control System
    </label>
    <select
      value={controlMode}
      onChange={(e) => setControlMode(e.target.value)}
      className="w-full bg-background border border-gray-700 rounded px-2 py-1 text-sm"
    >
      <option>Autonomous</option>
      <option>Assisted</option>
      <option>Manual Override</option>
    </select>
  </div>

  {/* Algorithm Select */}
  <div className="mb-6">
    <label className="block text-xs text-gray-400 mb-1">
      Mission Algorithm
    </label>
    <select
      value={algorithm}
      onChange={(e) => setAlgorithm(e.target.value)}
      className="w-full bg-background border border-gray-700 rounded px-2 py-1 text-sm"
    >
      <option>SLP-based</option>
      <option>SLAM-based</option>
      <option>Manual Configured System</option>
    </select>
  </div>

  {/* Abort Button */}
  <button
    onClick={handleAbort}
    className="w-full bg-red-600 hover:bg-red-700 transition-colors text-white py-2 rounded text-sm font-semibold"
  >
    Abort Mission
  </button>

</div>
    </div>
  );
}