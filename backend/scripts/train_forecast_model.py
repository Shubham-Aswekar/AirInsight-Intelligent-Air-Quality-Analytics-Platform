import pandas as pd
import numpy as np
from catboost import CatBoostRegressor
import joblib

print("Loading dataset...")

df = pd.read_csv("data/processed/clean_air_quality.csv")

# Convert datetime
df["Datetime"] = pd.to_datetime(df["Datetime"])

# Sort by station and time
df = df.sort_values(["StationId", "Datetime"])

print("Creating lag features...")

# Create lag features per station
lags = [1, 2, 3, 6]   # last 1,2,3,6 hours

for lag in lags:
    df[f"AQI_lag_{lag}"] = df.groupby("StationId")["AQI"].shift(lag)

# Drop rows with NaN (initial lag rows)
df = df.dropna()

# Features and target
features = [f"AQI_lag_{lag}" for lag in lags]
X = df[features]
y = df["AQI"]

print("Dataset shape:", X.shape)

# Train-test split
split = int(len(X) * 0.9)
X_train, X_test = X[:split], X[split:]
y_train, y_test = y[:split], y[split:]

print("Training Forecast Model...")

model = CatBoostRegressor(
    iterations=500,
    depth=6,
    learning_rate=0.05,
    loss_function="RMSE",
    verbose=100
)

model.fit(X_train, y_train)

# Evaluate
preds = model.predict(X_test)
rmse = np.sqrt(np.mean((preds - y_test) ** 2))

print("Forecast RMSE:", rmse)

# Save model
joblib.dump(model, "models/aqi_forecast_model.pkl")

print("Forecast model saved at models/aqi_forecast_model.pkl")