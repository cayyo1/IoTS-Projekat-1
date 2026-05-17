import http from 'k6/http';

export const options = {
    vus: Number(__ENV.VUS) || 10,
    duration: '30s',
};

export default function () {

    const query = `
        query {
            getLatest(deviceId: "11:11:11:11:11:11") {
                temp
                co
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