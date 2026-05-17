import http from 'k6/http';

export const options = {
    vus: Number(__ENV.VUS) || 10,
    duration: '30s',
};

function generateSensorData() {
    return {
        deviceId: "22:22:22:22:22:22",

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

    const mutation = `
        mutation {
            addSensorData(input: {
                deviceId: "${data.deviceId}",
                timestamp: ${data.timestamp},
                humidity: ${data.humidity},
                light: ${data.light},
                smoke: ${data.smoke},
                co: ${data.co},
                temp: ${data.temp}
            }) {
                id
            }
        }
    `;

    const payload = JSON.stringify({
        query: mutation
    });

    http.post(
        'http://localhost:3000/graphql',
        payload,
        {
            headers: { 'Content-Type': 'application/json' }
        }
    );
}