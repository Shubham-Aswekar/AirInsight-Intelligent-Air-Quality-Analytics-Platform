# Decentralized Smart Air Quality Monitoring & Predictive Analytics System

## Overview

This project is a Smart City solution that simulates a decentralized air quality monitoring network across multiple regions of Maharashtra.

The system collects real-time pollution data from distributed virtual sensors, estimates current AQI using machine learning, predicts future AQI using time-series modeling, stores the data, and provides actionable insights for citizens and city authorities.

The architecture supports:

* Real-time monitoring
* Predictive analytics
* Decision support
* Health advisory
* Future scalability

---

# System Architecture Flow

```
Virtual Sensors (Multi-Region)
        ↓
FastAPI (/predict)
        ↓
CatBoost AQI Model (Real-time AQI)
        ↓
PostgreSQL Storage
        ↓
Analytics APIs
        ↓
Dashboard
        ↓
Time-Series Model (/forecast)
```

---

# Preparation Phase (Completed)

## Task Status

| Task   | Description                           | Status |
| ------ | ------------------------------------- | ------ |
| Task 1 | Dataset cleaning & preprocessing      | ✔      |
| Task 2 | AQI model training (CatBoost)         | ✔      |
| Task 3 | Prediction API + database storage     | ✔      |
| Task 4 | Multi-region sensor simulator         | ✔      |
| Task 5 | Dashboard data APIs                   | ✔      |
| Task 6 | Time-series forecasting model         | ✔      |
| Task 7 | Database optimization & schema backup | ✔      |
| Task 8 | Admin Authentication & Security       | ✔      |

Preparation level: **~95%**

Backend system is fully functional end-to-end.

---

# Implemented Components

## 1. Data Processing

* Indian AQI dataset cleaned and structured
* Feature engineering:

  * PM2.5, PM10, NO2, CO, SO2, O3, NH3
  * hour, day, month, year

---

## 2. Real-Time AQI Model

**Model:** CatBoost Regressor
**Input:** Pollutant values + time features
**Output:**

* Current AQI estimate
* AQI Category

Purpose:
Convert raw sensor pollution data into actionable air quality information.

---

## 3. Time-Series Forecast Model

**Approach:** Lag-based CatBoost forecasting
**Input:** Previous AQI values (last few hours)
**Output:** Next-hour AQI prediction

API:

```
GET /forecast/{sensor_id}
```

Purpose:
Enable proactive pollution warning.

---

## 4. Virtual Sensor Network

* 20 sensors across Maharashtra
* Region-wise pollution profiles:

  * Low
  * Good
  * Moderate
  * High (Poor)
  * Very High
  * Severe
* Sends data every 5 seconds

Purpose:
Simulate decentralized IoT network.

---

## 5. Backend (FastAPI)

### POST /predict

* Receives sensor data
* Predicts AQI
* Determines AQI category
* Detects pollution source (rule-based)
* Generates decision recommendation
* Stores data

### Admin APIs (Protected via JWT)

* `POST /admin/register`
* `POST /admin/login`
* `GET /admin/sensors`
* `POST /admin/sensor`
* `PUT /admin/sensor/{sensor_id}/status`
* `DELETE /admin/sensor/{sensor_id}`

---

## 6. Database (PostgreSQL)

Tables:

* regions
* sensors
* sensor_readings

Stored information:

* Pollutant values
* Predicted AQI
* AQI category
* Pollution source
* Decision recommendation
* Timestamp

Index for performance:

```
CREATE INDEX idx_readings_sensor_time
ON sensor_readings(sensor_id, timestamp DESC);
```

---

## 7. Analytics APIs (Ready)

| API                   | Purpose               |
| --------------------- | --------------------- |
| /latest               | Latest AQI per region |
| /history/{region_id}  | AQI trend data        |
| /top-polluted         | Most polluted regions |
| /forecast/{sensor_id} | Next-hour AQI         |

---

# Hackathon Implementation Plan

Remaining work focuses strictly on **Deployment** as all Frontend Features are completed.

---

# Features to Implement During Hackathon

## 1. Real-Time AQI Dashboard

**Goal:** Show current air quality across regions.

Implementation:

* Fetch `/latest`
* Display:

  * Region
  * AQI
  * Category
* Color-coded status

---

## 2. Pollution Heatmap (Map View)

**Goal:** Visualize AQI geographically.

Implementation:

* Leaflet + OpenStreetMap
* Region coordinates from DB
* Marker color based on AQI

---

## 3. AQI Trend Visualization

**Goal:** Show pollution trend over time.

Implementation:

* API: `/history/{region_id}`
* Line chart using Chart.js / Recharts

---

## 4. Future AQI Prediction Display

**Goal:** Show upcoming air quality risk.

Implementation:

* API: `/forecast/{sensor_id}`
* Display next-hour AQI and category
* Show rising/falling trend indicator

---

## 5. Pollution Source Identification

**Goal:** Identify major pollution cause.

Logic:

* High NO2 → Traffic
* High SO2 → Industrial
* High PM10 → Dust/Construction
* Else → Mixed

Display source on dashboard.

---

## 6. Health Advisory Panel

**Goal:** Provide citizen safety guidance.

Rule-based:

| AQI     | Advice                 |
| ------- | ---------------------- |
| 0–50    | Safe                   |
| 51–100  | Sensitive caution      |
| 101–200 | Limit outdoor activity |
| 201–300 | Wear mask              |
| 301–400 | Stay indoors           |
| 400+    | Health emergency       |

---

## 7. Decision Support for Authorities

**Goal:** Suggest control actions.

Logic:

* Traffic source → Vehicle restriction
* Industrial source → Emission control
* Dust source → Stop construction
* Severe AQI → Emergency measures

---

## 8. Hotspot Detection

**Goal:** Identify worst affected regions.

Implementation:

* API: `/top-polluted`
* Show Top 5 regions

---

## 9. City Air Quality Score

**Goal:** Show overall air condition.

Implementation:

* Average AQI per region
* Display summary indicator

---

# Deployment Plan

| Component | Platform          |
| --------- | ----------------- |
| Backend   | Render            |
| Database  | Render PostgreSQL |
| Frontend  | Vercel            |

Steps:

1. Push backend to GitHub
2. Create Render Web Service
3. Create PostgreSQL instance
4. Configure environment variables
5. Deploy React frontend on Vercel

---

# Project Impact

### Citizens

* Real-time AQI awareness
* Health safety guidance
* Future risk alerts

### Authorities

* Pollution hotspot detection
* Source-based action planning
* Decision support

### Researchers

* Historical data analysis
* Trend monitoring

---

# Future Scope (Post Hackathon)

* Real IoT hardware sensors
* Continuous model retraining
* Anomaly detection
* Mobile application
* Multi-state deployment

---

# Tech Stack

Backend: FastAPI
Database: PostgreSQL
ML: CatBoost (Real-time + Forecast)
Simulation: Python
Frontend: React
Maps: Leaflet
Deployment: Render + Vercel

---

# Final Status

Backend: ✔ Complete
Real-time AQI Model: ✔ Complete
Forecast Model: ✔ Complete
Sensor Simulation: ✔ Complete
Database: ✔ Complete
APIs: ✔ Complete
Admin Authentication: ✔ Complete

Remaining during Hackathon:

* Deployment (Backend to Render, Frontend to Vercel)

All UI Components (Dashboard, Map Visualization, Analytics, Prediction, Sidebar Widgets) have been completely developed, tested, and polished.

The system is fully ready for final production deployment and demonstration.
