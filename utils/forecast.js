const request = require('postman-request');

const forecast = (lat, long, callback) => {
    const query = '&query=' + lat + ',' + long;
    const url = "http://api.weatherstack.com/current?access_key=c372a80f972bd93c532d9dcaf368d8f6" + query;
    request({
        url: url,
        json: true
    }, (error, {
        body
    }) => {
        if (error) {
            callback("No connection to weather API", undefined);
            return;
        }
        if (body.error) {
            callback("Wrong parameters for query", undefined);
            return;
        }
        callback(undefined, {
            description: body.current.weather_descriptions[0] + ', but it is never true!',
            temperature: body.current.temperature,
            feelslike: body.current.feelslike
        })

    })

}

module.exports = forecast;

// request({
//     url: url + '&query=New York',
//     json: true
// }, (error, response, body) => {
//     console.log(`
//         ${body.current.weather_descriptions[0]},
//         It is currently ${body.current.temperature} degree out 
//         and feels like ${body.current.feelslike} degree out!`);
// })