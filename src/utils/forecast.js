const request = require('request');

const forecast = (lat, long, callback) => {

    const url = 'https://api.darksky.net/forecast/a79d2e9264db7deabb2a5706fc226796/' + lat + ',' + long +'?units=si&lang=ru';


    request({ url, json: true }, (error, {body}) => {

        if (error) {
            callback('Unable to connect to the weather app', undefined);
        } else if (body.error) {
            callback('Unable to find the data with those coordinates', undefined);
        } else {
            callback(undefined, `${body.daily.data[0].summary} It is currently :${body.currently.temperature} degrees out. There is: ${body.currently.precipProbability} % chance of rain `);
        }
    });
}

module.exports = forecast;

// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)

/////my own version
// const url = 'https://api.darksky.net/forecast/a79d2e9264db7deabb2a5706fc226796/37.8267,-122.4233?units=si&lang=ru';

// request({ url: url, json: true }, (error, response) => {
//     const data = response.body.currently;
//     const daily = response.body.daily.data[0];
//     if (error) {
//         console.log('Unale to connect to the weather app');
//     } else if (response.body.error) {
//         console.log('Unale to find the data with those coordinates');
//     } else {
//         console.log(`${daily.summary} It is currently :${data.temperature} degrees out. There is: ${data.precipProbability} % chance of rain `);
//     }
// });