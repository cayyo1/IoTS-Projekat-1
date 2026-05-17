import http from 'k6/http';

export const options = {
    vus: Number(__ENV.VUS) || 10,
    duration: '30s',
};

function generateSensorData() {
    return {
        deviceId: "11:11:11:11:11:11",
        
        timestamp: Date.now() / 1000,

        humidity: +(60 + Math.random() * 20).toFixed(1),

        light: Math.random() > 0.5,

        smoke: +(Math.random() * 0.05).toFixed(18),

        co: +(Math.random() * 0.02).toFixed(18),

        temp: +(20 + Math.random() * 8).toFixed(1)
    };
}

export default function () {
    const data = generateSensorData();

    http.post(
        'http://localhost:5000/api/Sensor',
        JSON.stringify(data),
        {
            headers: { 'Content-Type': 'application/json' }
        }
    );
}