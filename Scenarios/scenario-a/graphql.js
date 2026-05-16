const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

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

async function run() {

    console.log("[GRAPHQL] Zapoceto slanje podataka...");

    while (true) {

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

        try {

            const response = await fetch("http://localhost:3000/graphql", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    query: mutation
                })
            });

            if (response.ok) {
                console.log("[GRAPHQL] Uspesno poslato");
            }
            else {
                console.log("[GRAPHQL] Greska:", response.status);
            }

        }
        catch (err) {

            console.log("[GRAPHQL] Error:", err.message);

        }

        await sleep(200);
    }
}

run();