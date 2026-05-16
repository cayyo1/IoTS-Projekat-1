COPY sensor_data(id, device_id, timestamp, co, humidity, light, smoke, temperature)
FROM '/data/sensor_data_202605162314.csv'
WITH (FORMAT csv, HEADER true);