const NodeGeoCoder = require("node-geocoder");


const options = {
    provider: process.env.GEOCODER_PROVIDER,
    httpAdapter: 'https',
    apikey: process.env.GEOCODER_API_KEY || 'aJ2G1ba0SeuHaRojbtMxqdT0QClgWFr9',
    formatter: null
};


const geocoder = NodeGeoCoder(options);

module.exports = geocoder;