const request = require('postman-request');

const weather = (lon, lat, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=48d69d8a06adb684ad8ec90b7481a3ca&query=${lat},${lon}&units=m`
    request({ url: url, json: true }, (err, res) => {
        try {
            if (err) {
                callback(`Unable to get weather information`, undefined);
            }
            const real = res.body.current.temperature;
            const feels = res.body.current.feelslike;
            const desc = res.body.current.weather_descriptions[0];
            callback(undefined, `It is currently ${real} Celsius! Although is feels like it is ${feels} Celsius. It is ${desc}`);
        }
        catch {
            callback('Unable to connect the weather servers', undefined)
        }
    })
}

module.exports = weather