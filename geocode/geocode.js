const request = require('request');
const configVar = require('../config');

const geocodeAddress = (address, callback) => {

  const encodedAddress = encodeAddress(address);
  // arg 1 is options, arg2 is callback for when data is returned
  // https://www.npmjs.com/package/request
  request({
    url: `http://www.mapquestapi.com/geocoding/v1/address?key=${configVar.MAP_QUEST_API_KEY}&location=${encodedAddress}`,
    json: true
  }, (error, response, body) => {

    if (error) {
      callback('Unable to connect to map quest server', null)
      return;
    }

    const results = body.results;
    const streetAddressFound = results[0].locations[0].street;

    if(!streetAddressFound) {
      callback('Sorry, address not found', null);
      return;
    }

    callback(null, {
      address: results[0].providedLocation,
      longitude: results[0].locations[0].latLng.lng,
      latitude: results[0].locations[0].latLng.lat,
    });
  });
}

const encodeAddress = (address) => {
  // convert address argument into a query string
  const encodedQueryString = encodeURIComponent(address);
  // console.log('Encoded Query String', encodedQueryString);
  // console.log('Decoded Query String', decodeURIComponent(encodedQueryString));
  return encodedQueryString;
}

module.exports = {
  geocodeAddress,
  encodeAddress
}