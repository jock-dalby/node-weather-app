const request = require('request');
const configVar = require('../config');

const geocodeAddress = (address) => {

  const encodedAddress = encodeAddress(address);
  // arg 1 is options, arg2 is callback for when data is returned
  // https://www.npmjs.com/package/request
  request({
    url: `http://www.mapquestapi.com/geocoding/v1/address?key=${configVar.MAP_QUEST_API_KEY}&location=${encodedAddress}`,
    json: true
  }, (error, response, body) => {
    if(error) {
      handleError(error);
      return;
    }
    const results = body.results;
    const streetAddressFound = results[0].locations[0].street;

    // Second argument not needed
    // 3rd argument states 2 spaces per indentation
    // console.log(JSON.stringify(response, undefined, 2));

    if(streetAddressFound) {
      handleSuccess(results);
    } else {
      console.log('Sorry, address not found')
    }
  });
}

const encodeAddress = (address) => {
  // convert address argument into a query string
  const encodedQueryString = encodeURIComponent(address);
  console.log('Encoded Query String', encodedQueryString);
  console.log('Decoded Query String', decodeURIComponent(encodedQueryString));
  return encodedQueryString;
}

const handleError = (error) => {
  console.log('ERROR: Unable to connect to servers');
}

const handleSuccess = (results) => {
  const providedLocation = results[0].providedLocation;
  const latLngInfo = results[0].locations[0].latLng;
  const locationLongitude = latLngInfo.lng;
  const locationLatitude = latLngInfo.lat;
  console.log('Provided location: ', providedLocation);
  console.log('Location longitude: ', locationLongitude);
  console.log('Location latitude: ', locationLatitude);
}

module.exports = {
  geocodeAddress
}