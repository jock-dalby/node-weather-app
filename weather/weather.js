const request = require('request');
const configVar = require('../config');

const getWeather = (lat, lng, callback) => {

  request({
    url: `https://api.darksky.net/forecast/${configVar.DARK_SKY_API_KEY}/${lat},${lng}`,
    json: true
  }, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      callback(undefined, {
        temperature: body.currently.temperature,
        apparentTemperature: body.currently.apparentTemperature
      });
    } else {
      callback('Unable to connect to DarkSky server');
    }
  });
}

module.exports = {
  getWeather
}