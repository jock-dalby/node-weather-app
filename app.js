const request = require('request');
const yargs = require('yargs');
const configVar = require('./config');

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

// convert address argument into a query string
const encodedQueryString = encodeURIComponent(argv.address);
console.log('Encoded Query String', encodedQueryString);
console.log('Decoded Query String', decodeURIComponent(encodedQueryString));

// arg 1 is options, arg2 is callback for when data is returned
// https://www.npmjs.com/package/request
request({
  url: `http://www.mapquestapi.com/geocoding/v1/address?key=${configVar.MAP_QUEST_API_KEY}&location=${encodedQueryString}`,
  json: true
}, (error, response, body) => {
  const results = body.results;
  const streetAddressFound = results[0].locations[0].street;
  // Second argument not needed
  // 3rd argument states 2 spaces per indentation
  // console.log(JSON.stringify(streetAddressFound, undefined, 2));
  if(error) {
    console.log('Unable to connect to servers');
    return;
  }

  if(streetAddressFound) {
    handleSuccess(results);
    console.log('Address found', streetAddressFound)
  } else {
    console.log('Address not found')
  }
});

function handleSuccess(results) {
  const providedLocation = results[0].providedLocation;
  const latLngInfo = results[0].locations[0].latLng;
  const locationLongitude = latLngInfo.lng;
  const locationLatitude = latLngInfo.lat;
  console.log('Provided location: ', providedLocation);
  console.log('Location longitude: ', locationLongitude);
  console.log('Location latitude: ', locationLatitude);
}