const request = require('request');
const configVar = require('../config');

const getWeather = (latitude, longitude, callback) => {

  request({
    url: `https://api.darksky.net/forecast/${configVar.DARK_SKY_API_KEY}/37.8267,-122.4233`,
    json: true
  }, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      console.log('Current temperature', body.currently.temperature)
    } else {
      console.log('Unable to fetch weather');
    }
  });
}

module.exports = {
  getWeather
}