import { useEffect, useState } from "react";

type Status = "healthy" | "warning" | "critical";

type ComponentType = {
  name: string;
  status: Status;
};

export default function SystemHealth() {
  const [components, setComponents] = useState<ComponentType[]>([]);
  const [systemStatus, setSystemStatus] = useState<Status>("healthy");
  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    generateHealthState();
  }, []);

  const generateHealthState = () => {
    const baseComponents = [
      "Rotor 1",
      "Rotor 2",
      "Rotor 3",
      "Rotor 4",
      "Battery Module",
      "IMU",
      "GPS",
      "Barometer",
      "Telemetry Link",
      "CPU Core",
    ];

    const everythingHealthy = Math.random() > 0.5;

    const generated = baseComponents.map((name) => {
      if (everythingHealthy) {
        return { name, status: "healthy" as Status };
      } else {
        const rand = Math.random();
        let status: Status =
          rand > 0.8
            ? "critical"
            : rand > 0.5
            ? "warning"
            : "healthy";
        return { name, status };
      }
    });

    setComponents(generated);

    const hasCritical = generated.some((c) => c.status === "critical");
    const hasWarning = generated.some((c) => c.status === "warning");

    if (hasCritical) setSystemStatus("critical");
    else if (hasWarning) setSystemStatus("warning");
    else setSystemStatus("healthy");
  };

  const handleAbort = () => {
    setShowDialog(true);
    setTimeout(() => setShowDialog(false), 2000);
  };

  const hasIssues = systemStatus !== "healthy";

  return (
    <div className="h-full relative overflow-y-auto p-8 bg-background text-white space-y-8">

      <StatusBanner status={systemStatus} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {components.map((comp) => (
          <HealthCard
            key={comp.name}
            name={comp.name}
            status={comp.status}
          />
        ))}
      </div>

      <PerformancePanel />

      {/* Abort Button */}
      {hasIssues && (
        <button
          onClick={handleAbort}
          className="fixed bottom-8 right-8 bg-red-600 hover:bg-red-700 transition px-6 py-3 rounded-lg font-semibold shadow-lg"
        >
          Abort Mission
        </button>
      )}

      {/* Dialog */}
      {showDialog && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
          <div className="bg-panel p-6 rounded-lg shadow-lg">
            <p className="text-red-500 font-semibold">
              ⚠ Emergency Abort Triggered
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

function StatusBanner({ status }: { status: string }) {
  const color =
    status === "healthy"
      ? "bg-green-600"
      : status === "warning"
      ? "bg-yellow-600"
      : "bg-red-600";

  return (
    <div className={`${color} p-4 rounded-lg text-center font-semibold`}>
      Overall System Status: {status.toUpperCase()}
    </div>
  );
}

function HealthCard({ name, status }: { name: string; status: string }) {
  const color =
    status === "healthy"
      ? "bg-green-500"
      : status === "warning"
      ? "bg-yellow-500"
      : "bg-red-500";

  return (
    <div className="bg-panel border border-gray-700 rounded-lg p-6 space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold">{name}</h3>
        <span className={`w-4 h-4 rounded-full ${color}`} />
      </div>

      <div className="text-sm text-gray-400">
        Status: {status.toUpperCase()}
      </div>

      <div className="h-2 bg-gray-800 rounded overflow-hidden">
        <div
          className={`h-full ${color}`}
          style={{
            width:
              status === "healthy"
                ? "90%"
                : status === "warning"
                ? "60%"
                : "30%",
          }}
        />
      </div>
    </div>
  );
}

function PerformancePanel() {
  return (
    <div className="bg-panel border border-gray-700 rounded-lg p-6 space-y-4">
      <h2 className="text-lg font-semibold text-accent">
        Performance Metrics
      </h2>

      <Metric label="Battery Usage" value={`${Math.floor(Math.random() * 40 + 50)}%`} />
      <Metric label="Temperature" value={`${Math.floor(Math.random() * 20 + 40)}°C`} />
      <Metric label="Battery Health" value={`${Math.floor(Math.random() * 10 + 85)}%`} />
      <Metric label="Signal Strength" value={`${Math.floor(Math.random() * 20 + 70)}%`} />
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between text-sm">
      <span className="text-gray-400">{label}</span>
      <span>{value}</span>
    </div>
  );
}