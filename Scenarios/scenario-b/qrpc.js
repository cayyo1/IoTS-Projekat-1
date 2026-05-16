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

    client.GetLatest(
        {
            deviceId: "11:11:11:11:11:11"
        },
        (err, response) => {

            if (err) {

                console.log("[GRPC] Error:", err.message);

            }
            else {

                console.log(
                    `[GRPC] Primljeno -> temp: ${response.temp}, co: ${response.co}`
                );

            }

        }
    );
}

run();