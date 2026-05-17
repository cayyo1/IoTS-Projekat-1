import http from 'k6/http';

export const options = {
    vus: Number(__ENV.VUS) || 10,
    duration: '30s',
};

export default function () {

    http.get(
        'http://localhost:5000/api/Sensor/select/11:11:11:11:11:11'
    );
}