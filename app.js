const yargs = require('yargs');
const geocode = require('./geocode/geocode')

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

geocode.geocodeAddress(
  argv.address,
  (errorMessage, results) => errorMessage ? handleError(errorMessage) : handleSuccess(results)
)

const handleError = (errorMessage) => {
  console.log('ERROR: ', errorMessage);
}

const handleSuccess = (results) => {
  // Second argument not needed
  // 3rd argument states 2 spaces per indentation
  console.log('SUCCESS: ', JSON.stringify(results, undefined, 2));
}