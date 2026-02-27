-- Regions Table
CREATE TABLE regions (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    latitude FLOAT,
    longitude FLOAT
);

-- Sensors Table
CREATE TABLE sensors (
    id SERIAL PRIMARY KEY,
    sensor_code VARCHAR(50) UNIQUE NOT NULL,
    region_id INTEGER REFERENCES regions(id)
);

-- Sensor Readings Table
CREATE TABLE sensor_readings (
    id BIGSERIAL PRIMARY KEY,
    sensor_id INTEGER REFERENCES sensors(id),
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    pm25 FLOAT,
    pm10 FLOAT,
    no2 FLOAT,
    co FLOAT,
    so2 FLOAT,
    o3 FLOAT,
    nh3 FLOAT,

    predicted_aqi FLOAT,
    category VARCHAR(50)
);

-- Index for fast queries
CREATE INDEX idx_readings_sensor_time
ON sensor_readings(sensor_id, timestamp DESC);



--Insert Regions
INSERT INTO regions (name, latitude, longitude) VALUES
('Mumbai', 19.0760, 72.8777),
('Pune', 18.5204, 73.8567),
('Nagpur', 21.1458, 79.0882),
('Nashik', 19.9975, 73.7898),
('Aurangabad', 19.8762, 75.3433),
('Kolhapur', 16.7050, 74.2433),
('Solapur', 17.6599, 75.9064),
('Chandrapur', 19.9615, 79.2961),
('Ratnagiri', 16.9902, 73.3120),
('Navi Mumbai', 19.0330, 73.0297);


--Insert Sensors
INSERT INTO sensors (sensor_code, region_id) VALUES
('MUM001', 1),
('MUM002', 1),
('PUN001', 2),
('PUN002', 2),
('NAG001', 3),
('NAG002', 3),
('NAS001', 4),
('NAS002', 4),
('AUR001', 5),
('AUR002', 5),
('KOL001', 6),
('KOL002', 6),
('SOL001', 7),
('SOL002', 7),
('CHA001', 8),
('CHA002', 8),
('RAT001', 9),
('RAT002', 9),
('NVM001', 10),
('NVM002', 10);
