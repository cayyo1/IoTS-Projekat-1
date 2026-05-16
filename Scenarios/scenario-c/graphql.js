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
                        getStats {
                            minTemperature
                            maxTemperature
                            averageTemperature

                            minCo
                            maxCo
                            averageCo

                            minHumidity
                            maxHumidity
                            averageHumidity

                            minSmoke
                            maxSmoke
                            averageSmoke

                            totalCount
                        }
                    }
                `
            })
        });

        if (response.ok) {

            const result = await response.json();

            const data = result.data.getStats;

            console.log("[GRAPHQL] Primljeni stats:");
            console.log(data);

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