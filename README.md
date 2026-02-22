# 🚁 Edge Autonomy Module – Frontend UI

A professional operator-grade frontend interface for an autonomous drone edge autonomy system.

This UI simulates:

- 🗺 Live drone map tracking
- 🎮 Manual & Autonomous control modes
- 🧠 AI Insights tuning panel
- 🩺 System Health diagnostics
- 🎥 Mission control & video feeds
- ⚙ Settings management console

Built using:

- React (Vite + TypeScript)
- Tailwind CSS
- Leaflet (Map Rendering)

---

# 📦 Prerequisites

Make sure you have:

- Node.js (v18+ recommended)
- npm (comes with Node)

Check versions:

```bash
node -v
npm -v
```

---

# 🚀 Installation & Running the Project

## 1️⃣ Navigate to Project Folder

```bash
cd drone-ui
```

## 2️⃣ Install Dependencies

```bash
npm install
```

## 3️⃣ Start Development Server

```bash
npm run dev
```

You should see something like:

```
VITE ready in ...
➜ Local: http://localhost:5173/
```

Open your browser and go to:

```
http://localhost:5173/
```

---

# 📁 Project Structure

```
drone-ui/
│
├── public/
│   ├── logo.png
│   ├── sample.mp4
│
├── src/
│   ├── components/
│   │   ├── Layout.tsx
│   │   ├── MapView.tsx
│   │
│   ├── pages/
│   │   ├── Dashboard.tsx
│   │   ├── Mission.tsx
│   │   ├── AIInsights.tsx
│   │   ├── SystemHealth.tsx
│   │   ├── Settings.tsx
│   │
│   ├── App.tsx
│   ├── main.tsx
│
├── tailwind.config.js
├── postcss.config.js
├── package.json
```

---

# 🎮 Features Overview

## 🗺 Dashboard
- Interactive map with controllable drone marker
- Manual arrow controls
- Takeoff / Land state control
- Mini video preview
- Auto-scrolling live logs

## 🎯 Mission
- POV switching
- Dynamic mission logs
- Mission control panel
- Abort mission functionality

## 🧠 AI Insights
- Sensor configuration
- Obstacle avoidance tuning
- Path planning configuration
- Apply changes confirmation dialog

## 🩺 System Health
- 50% randomized health simulation
- Rotor and system status visualization
- Performance metrics
- Emergency abort button

## ⚙ Settings
- General preferences
- Fly view controls
- Plan view configuration
- Video settings

---

# 🛠 Production Build

To build for production:

```bash
npm run build
```

Optimized output will be generated in:

```
dist/
```

You can deploy the `dist` folder to:

- Vercel
- Netlify
- AWS S3
- Any static hosting provider

---

# 🔧 Troubleshooting

### Port already in use?
Run on another port:

```bash
npm run dev -- --port=3000
```

### Node not recognized?
Reinstall Node.js and restart your terminal.

---

# 🚀 Future Integration

This frontend is structured and ready to integrate with:

- WebSocket telemetry streams
- RTSP / WebRTC live feeds
- REST APIs
- Real-time drone control systems

---

Built as a startup-grade autonomous drone edge control interface.
