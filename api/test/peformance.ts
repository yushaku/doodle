import http from 'k6/http';

export const options = {
  stages: [
    { duration: '1m', target: 1 },
    { duration: '1m', target: 20 },
    { duration: '1m', target: 10 },
    { duration: '1m', target: 1 },
  ],
};

export default function () {
  http.get('http://localhost:8005/ok');
}
