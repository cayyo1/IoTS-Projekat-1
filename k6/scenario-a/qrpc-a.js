import grpc from 'k6/net/grpc';

export const options = {
    vus: Number(__ENV.VUS) || 10,
    duration: '30s',
};

const client = new grpc.Client();
client.load(['../../gRPCService/protos'], 'sensor.proto');

function generateSensorData() {
    return {
        deviceId: "33:33:33:33:33:33",

        timestamp: Date.now() / 1000,

        humidity: +(60 + Math.random() * 20).toFixed(1),

        light: Math.random() > 0.5,

        smoke: +(Math.random() * 0.05).toFixed(18),

        co: +(Math.random() * 0.02).toFixed(18),

        temp: +(20 + Math.random() * 8).toFixed(1)
    };
}

export default function () {

    client.connect('localhost:6000', {
        plaintext: true
    });

    const data = generateSensorData();

    client.invoke('sensor.Sensor/AddSensorData', data);

    client.close();
}