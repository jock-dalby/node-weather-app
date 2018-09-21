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

geocode.geocodeAddress(argv.address)
