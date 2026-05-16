const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function run() {

    console.log("[REST] Zapoceto...");

    try {

        const response = await fetch(
            "http://localhost:5000/api/Sensor/select/11:11:11:11:11:11"
        );

        if (response.ok) {

            const data = await response.json();

            console.log(
                `[REST] Primljeno -> temp: ${data.temp}, co: ${data.co}`
            );
        }
        else {

            console.log("[REST] Greska:", response.status);

        }

    }
    catch (err) {

        console.log("[REST] Error:", err.message);

    }

}

run();