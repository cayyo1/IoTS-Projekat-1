const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

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

async function run() {

    console.log("[REST] Zapoceto slanje podataka...");

    while (true) {

        const data = generateSensorData();

        try {

            const response = await fetch("http://localhost:5000/api/Sensor", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                console.log("[REST] Uspesno poslato");
            }
            else {
                console.log("[REST] Greska:", response.status);
            }

        }
        catch (err) {

            console.log("[REST] Error:", err.message);

        }

        await sleep(200);
    }
}

run();