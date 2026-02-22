import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Mission from "./pages/Mission";
import Settings from "./pages/Settings";
import AIInsights from "./pages/AIInsights";
import SystemHealth from "./pages/SystemHealth";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="mission" element={<Mission />} />
        <Route path="settings" element={<Settings />} />
        <Route path="ai" element={<AIInsights />} />
        <Route path="health" element={<SystemHealth />} />
      </Route>
    </Routes>
  );
}