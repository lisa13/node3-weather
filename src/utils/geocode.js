const request = require('request');

const geoCode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoibGlzYTEzMTMiLCJhIjoiY2p4bG0weXk5MDcwdDNwcjJ5OWp6ZGl6eCJ9.eRIVkpPDE0zWzJ_IS_owKA';

    request({ url, json: true }, (error, { body }) => {
        // const geo = response.body.features[0];

        if (error) {
            callback('Unable to connect to the location server', undefined);

        } else if (body.features.length === 0) {
            callback('Not found, try another search word', undefined);
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name

            });
        }
    });
}

module.exports = geoCode;




/////my own version


// const url2 = 'https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoibGlzYTEzMTMiLCJhIjoiY2p4bG0weXk5MDcwdDNwcjJ5OWp6ZGl6eCJ9.eRIVkpPDE0zWzJ_IS_owKA';

// request({ url: url2, json: true }, (error, response) => {
//     const geo = response.body.features[0];
//     if (error) {
//         console.log('Unale to connect to the serve');
//     } else if (geo.length === 0) {
//         console.log('Wrong coordinates');

//     } else {
//         console.log(`The lat and Long of ${geo.place_name} is: lattitude ${geo.center[0]} and long ${geo.center[1]}`);
//     }
// });