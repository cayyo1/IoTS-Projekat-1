const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const packageDefinition = protoLoader.loadSync(
    "../../gRPCService/protos/sensor.proto",
    {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    }
);

const proto = grpc.loadPackageDefinition(packageDefinition);
//console.log(proto);

const client = new proto.sensor.Sensor(
    "localhost:6000",
    grpc.credentials.createInsecure()
);

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

async function run() {

    console.log("[GRPC] Zapoceto slanje podataka...");

    while (true) {

        const data = generateSensorData();

        client.AddSensorData(data, (err, response) => {

            if (err) {
                console.log("[GRPC] Error:", err.message);
            }
            else {
                console.log("[GRPC] Uspesno poslato");
            }

        });

        await sleep(200);
    }
}

run();