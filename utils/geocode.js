const request = require('postman-request');

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/search_text=$' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoia2VuZWR5MzM3IiwiYSI6ImNrdnA2emJscjgyb2cydXF3ZHE0NGpiZTYifQ.Yp02ascnh_-fCxBpmftmOQ&limit=1';

    request({
        url: url,
        json: true
    }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather API', undefined);
            return;
        }
        if (body.features.length === 0) {
            callback('Wrong search', undefined);
            return;
        }
        const location = body.features[0].place_name;
        const long = body.features[0].center[0];
        const lat = body.features[0].center[1];
        callback(undefined, {
            location,
            long,
            lat,
        })
    })
};

module.exports = geocode;