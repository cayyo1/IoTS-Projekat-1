async function run() {

    console.log("[REST][Scenario-C] Zapoceto...");

    try {

        const response = await fetch("http://localhost:5000/api/Sensor/stats");

        if (response.ok) {

            const data = await response.json();

            console.log("[REST] Primljeni stats:");
            console.log(data);

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