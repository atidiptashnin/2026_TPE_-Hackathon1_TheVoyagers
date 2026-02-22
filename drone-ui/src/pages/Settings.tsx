import { useState } from "react";

export default function Settings() {
  const [activeSection, setActiveSection] = useState("general");

  const renderContent = () => {
    switch (activeSection) {
      case "general":
        return <GeneralSettings />;
      case "fly":
        return <FlyViewSettings />;
      case "plan":
        return <PlanViewSettings />;
      case "video":
        return <VideoSettings />;
      default:
        return null;
    }
  };

  return (
    <div className="h-full flex">

      {/* Sidebar */}
      <div className="w-56 bg-panel border-r border-gray-700 flex flex-col">
        <button onClick={() => setActiveSection("general")}
          className="p-4 text-left hover:bg-gray-800">
          General
        </button>
        <button onClick={() => setActiveSection("fly")}
          className="p-4 text-left hover:bg-gray-800">
          Fly View
        </button>
        <button onClick={() => setActiveSection("plan")}
          className="p-4 text-left hover:bg-gray-800">
          Plan View
        </button>
        <button onClick={() => setActiveSection("video")}
          className="p-4 text-left hover:bg-gray-800">
          Video
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-8 bg-background">
        {renderContent()}
      </div>

    </div>
  );
}

function GeneralSettings() {
  return (
    <div className="space-y-8">

      <h2 className="text-xl font-semibold text-accent">General</h2>

      <Section title="General">
        <Dropdown label="Language" options={["English", "Spanish", "French", "German", "Japanese"]} />
        <Dropdown label="Color Scheme" options={["Indoor", "Outdoor", "B/W"]} />
        <Switch label="Mute All Audio Input" />
        <Switch label="Clear All Settings on Next Start" />
        <Dropdown label="UI Scaling" options={["0%", "25%", "50%", "75%", "100%"]} />
      </Section>

      <Section title="Units">
        <Dropdown label="Horizontal Distance" options={["Feet", "Metre"]} />
        <Dropdown label="Vertical Distance" options={["Feet", "Metre"]} />
        <Dropdown label="Area" options={["SquareFeet", "SquareMetres", "SquareMiles"]} />
        <Dropdown label="Speed" options={["Miles/hr", "Km/hr", "m/s"]} />
        <Dropdown label="Temperature" options={["Fahrenheit", "Celsius", "Kelvin"]} />
      </Section>

    </div>
  );
}

function FlyViewSettings() {
  return (
    <div className="space-y-8">

      <h2 className="text-xl font-semibold text-accent">Fly View</h2>

      <Section title="General">
        <Switch label="Use Preflight Checklist" />
        <Switch label="Enable Multi-vehicle Panel" />
        <Switch label="Enable Preflight Checklist" />
        <Switch label="Keep Map Centered on Vehicle" />
        <Switch label="Show Simple Camera Controls (DIGICAM_CONTROL)" />
        <Switch label="Update Return to Home Based on Device Location" />
      </Section>

      <Section title="Guided Commands">
        <NumericInput label="Minimum Altitude (ft)" />
        <NumericInput label="Maximum Altitude (ft)" />
        <NumericInput label="Go To Location Max Distance (ft)" />
        <NumericInput label="Loiter Radius (ft)" />
        <Switch label="Require Confirmation for Go To Location" />
      </Section>

    </div>
  );
}

function PlanViewSettings() {
  return (
    <div className="space-y-8">

      <h2 className="text-xl font-semibold text-accent">Plan View</h2>

      <NumericInput label="Default Mission Altitude (ft)" />
      <NumericInput label="VTOL Transition Distance (ft)" />
      <Switch label="Missions Do Not Require Takeoff Item" />
      <Switch label="Allow Configuring Multiple Landing Sequences" />

    </div>
  );
}

function VideoSettings() {
  return (
    <div className="space-y-8">

      <h2 className="text-xl font-semibold text-accent">Video</h2>

      <Dropdown label="Record File Format" options={["mp4", "mvx", "vid"]} />
      <Switch label="Auto-delete Saved Recordings" />
      <NumericInput label="Max Storage Usage (MB)" />

    </div>
  );
}

function Section({ title, children }: any) {
  return (
    <div className="bg-panel p-6 rounded-lg space-y-4">
      <h3 className="font-semibold text-gray-300">{title}</h3>
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

function Switch({ label }: any) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm">{label}</span>
      <input type="checkbox" className="toggle-checkbox" />
    </div>
  );
}

function NumericInput({ label }: any) {
  return (
    <div>
      <label className="block text-sm text-gray-400 mb-1">{label}</label>
      <input
        type="number"
        className="w-full bg-background border border-gray-700 rounded px-3 py-2 text-sm"
      />
    </div>
  );
}