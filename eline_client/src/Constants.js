// Constants.js
const prod = {
    url: {
        API_URL: 'https://e-line-app.herokuapp.com',
        ELINE_URL: 'https://e-line-app.herokuapp.com'
    }
};
const dev = {
    url: {
        API_URL: 'http://localhost:5000',
        ELINE_URL: 'http://localhost:3000'
    }
};
export const config = process.env.NODE_ENV === 'development' ? dev : prod;