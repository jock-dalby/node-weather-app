const yargs = require('yargs');
const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

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

// Take address args and get longitude and latitiude coords
geocode.geocodeAddress(
  argv.address,
  (errorMessage, results) => errorMessage ? handleError(errorMessage) : getWeather(results)
)

// When have coords, use coords to get weather
const getWeather = (geocodedAddress) => {
  weather.getWeather(
    geocodedAddress.latitude,
    geocodedAddress.longitude,
    (errorMessage, results) => errorMessage ? handleError(errorMessage) : handleGetWeatherSuccess(results)
  )
}


const handleError = (errorMessage) => {
  console.log('ERROR: ', errorMessage);
}

const handleGetWeatherSuccess = (weatherResults) => {
  // Second argument not needed
  // 3rd argument states 2 spaces per indentation
  // console.log('SUCCESS: ', JSON.stringify(results, undefined, 2));
  console.log(`It's currently ${weatherResults.temperature} degrees. It feels more like ${weatherResults.apparentTemperature} degrees!`);
}