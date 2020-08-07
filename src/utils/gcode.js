const request = require('postman-request');

const geocode = (location, callback) => {
    const geourl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?access_token=pk.eyJ1IjoiYmxpdHoxIiwiYSI6ImNrYzg0MzRjYjB2eGgycmxqdGF0bG02ankifQ.P62ELkn7mPFyK48stYOqAw&limit=1`
    request({ url: geourl, json: true }, (err, res) => {
        try {
            if (res.body.features.length === 0) {
                callback(`Hm ${location} is not valid...maybe a different location`, undefined);
            }
            const lon = res.body.features[0].center[0];
            const lat = res.body.features[0].center[1];
            const loc = res.body.features[0].place_name;
            callback(undefined, {
                loc,
                lon,
                lat
            });
        }
        catch (error) {
            if (err) {
                callback(`Not able to connect to geo servises...maybe check your internet connection`, undefined);
            }
        }
    })
}

module.exports = geocode