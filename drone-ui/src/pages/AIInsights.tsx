import { useState } from "react";

export default function AIInsights() {
  const [showDialog, setShowDialog] = useState(false);

  const applyChanges = () => {
    setShowDialog(true);
    setTimeout(() => setShowDialog(false), 2000);
  };

  return (
    <div className="h-full relative overflow-y-auto p-8 bg-background text-white space-y-10">

      {/* SECTION 1 */}
      <Section title="Navigation and Sensing Suite">
        <Dropdown
          label="Sensor Fusion Mode"
          options={[
            "Sensor Fusion (Default)",
            "SLAM-Based",
            "IMU-Based",
          ]}
        />
        <BigSwitch label="GPS Redundancy" />
        <BigSwitch label="Barometer Backup" />
      </Section>

      {/* SECTION 2 */}
      <Section title="Obstacle Avoidance">
        <Dropdown
          label="Avoidance Algorithm"
          options={[
            "Sensor-Fusion Avoidance",
            "Camera-based Vision",
            "Traffic + Dynamic Task Allocation",
          ]}
        />
        <Slider label="Sensitivity Level" />
      </Section>

      {/* SECTION 3 */}
      <Section title="Path and Trajectory Planning">
        <Dropdown
          label="Path Planning"
          options={[
            "Path Planning + Allocation",
            "Drone Computation (Onboard)",
            "Real-Time Dynamic Allocation",
          ]}
        />
        <Dropdown
          label="Max Replanning Speed"
          options={["5m/s", "10m/s", "15m/s", "20m/s", "Unlimited"]}
        />
      </Section>

      {/* SECTION 4 */}
      <Section title="Decision Making">
        <Dropdown
          label="Mapping Engine"
          options={[
            "LiDAR + Camera Mapping",
            "Depth Awareness Mode",
            "Voxor / LiDAR Supported",
          ]}
        />
        <BigSwitch label="Depth Awareness" />
        <BigSwitch label="Voxor Supported" />
      </Section>

      {/* SECTION 5 */}
      <Section title="Autonomy Change">
        <Dropdown
          label="Flight Mode"
          options={[
            "Manual",
            "Assisted",
            "Semi-Autonomous",
            "AUTONOMOUS",
          ]}
        />
      </Section>

      {/* APPLY BUTTON */}
      <div className="flex justify-end pt-6">
        <button
          onClick={applyChanges}
          className="bg-accent hover:bg-blue-700 transition px-6 py-2 rounded text-sm font-semibold"
        >
          Apply Changes
        </button>
      </div>

      {/* DIALOG */}
      {showDialog && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
          <div className="bg-panel p-6 rounded-lg shadow-lg">
            <p className="text-accent font-semibold">
              Changes have been applied successfully.
            </p>
          </div>
        </div>
      )}

    </div>
  );
}

function Section({ title, children }: any) {
  return (
    <div className="bg-panel p-6 rounded-lg space-y-4 border border-gray-700">
      <h2 className="text-lg font-semibold text-accent">{title}</h2>
      {children}
    </div>
  );
}

function Dropdown({ label, options }: any) {
  return (
    <div>
      <label className="block text-sm text-gray-400 mb-1">{label}</label>
      <select className="w-full bg-background border border-gray-700 rounded px-3 py-2 text-sm">
        {options.map((opt: string) => (
          <option key={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );
}

function BigSwitch({ label }: any) {
  return (
    <div className="flex items-center justify-between py-2">
      <span className="text-sm">{label}</span>
      <input type="checkbox" className="w-5 h-5" />
    </div>
  );
}

function Slider({ label }: any) {
  const [value, setValue] = useState(5);

  return (
    <div>
      <label className="block text-sm text-gray-400 mb-2">
        {label}: {value}
      </label>
      <input
        type="range"
        min="0"
        max="10"
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
        className="w-full"
      />
    </div>
  );
}