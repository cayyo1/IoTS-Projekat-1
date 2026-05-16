async function run() {

    console.log("[GRAPHQL] Zapoceto...");

    try {

        const response = await fetch("http://localhost:3000/graphql", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                query: `
                    query {
                        getLatest(deviceId: "11:11:11:11:11:11") {
                            temp
                            co
                        }
                    }
                `
            })
        });

        if (response.ok) {

            const result = await response.json();

            const data = result.data.getLatest;

            console.log(
                `[GRAPHQL] Primljeno -> temp: ${data.temp}, co: ${data.co}`
            );

        }
        else {

            console.log("[GRAPHQL] Greska:", response.status);

        }

    }
    catch (err) {

        console.log("[GRAPHQL] Error:", err.message);

    }
}

run();