import grpc from 'k6/net/grpc';

export const options = {
    vus: Number(__ENV.VUS) || 10,
    duration: '30s',
};

const client = new grpc.Client();
client.load(['../../gRPCService/protos'], 'sensor.proto');

export default function () {

    client.connect('localhost:6000', {
        plaintext: true
    });

    client.invoke('sensor.Sensor/GetStats', {});

    client.close();
}