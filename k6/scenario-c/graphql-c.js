import http from 'k6/http';

export const options = {
    vus: Number(__ENV.VUS) || 10,
    duration: '30s',
};

export default function () {

    const query = `
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
    `;

    http.post(
        'http://localhost:3000/graphql',
        JSON.stringify({ query }),
        {
            headers: { 'Content-Type': 'application/json' }
        }
    );
}