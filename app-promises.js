const yargs = require('yargs');
const axios = require('axios');
const configVar = require('./config');
const geocode = require('./geocode/geocode');

const argv = yargs
  .options({
    a: {
      demand: true,
      alias: 'address',
      describe: 'Address for which to fetch weather information',
      // tells yargs to parse address argument to a string
      string: true
    }
  })
  // Adds help argument to argv
  .help()
  .alias('help', 'h')
  .argv;

const encodedAddress = geocode.encodeAddress(argv.address);
const geocodeUrl = `http://www.mapquestapi.com/geocoding/v1/address?key=${configVar.MAP_QUEST_API_KEY}&location=${encodedAddress}`

axios.get(geocodeUrl).then(
  response => {
    if(response.data.status === 'ZERO_RESULTS') {
      throw new Error('Unable to find that address');
    }
    const longitude = response.data.results[0].locations[0].latLng.lng;
    const latitude = response.data.results[0].locations[0].latLng.lat;
    const weatherUrl = `https://api.darksky.net/forecast/${configVar.DARK_SKY_API_KEY}/${latitude},${longitude}`

    return axios.get(weatherUrl).then(response => {
      const temperature = response.data.currently.temperature;
      const apparentTemperature = response.data.currently.apparentTemperature;
      console.log(`It's currently ${temperature} degrees. It feels more like ${apparentTemperature} degrees!`);
    })
  }
).catch(
  err => console.error('ERROR: ', err.code === 'ENOTFOUND' ? 'Unable to connect to API servers' : err.message)
);