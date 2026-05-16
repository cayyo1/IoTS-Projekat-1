const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

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

const client = new proto.sensor.Sensor(
    "localhost:6000",
    grpc.credentials.createInsecure()
);

async function run() {

    console.log("[GRPC] Zapoceto...");

    const request = {}; 

    client.GetStats(request, (err, response) => {

        if (err) {

            console.log("[GRPC] Error:", err.message);

        }
        else {

            console.log("[GRPC] Primljeni stats:");
            console.log(response);

        }

    });
}

run();