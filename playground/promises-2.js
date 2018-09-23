const request = require('request');
const configVar = require('../config');
const geocode = require('../geocode/geocode');

const geocodeAddress = address => new Promise((resolve, reject) => {
    const encodedAddress = geocode.encodeAddress(address);

    request({
      url: `http://www.mapquestapi.com/geocoding/v1/address?key=${configVar.MAP_QUEST_API_KEY}&location=${encodedAddress}`,
      json: true
    }, (error, response, body) => {

      if (error) {
        reject('Unable to connect to map quest server',)
        return;
      }

      const results = body.results;
      const streetAddressFound = results[0].locations[0].street;

      if(!streetAddressFound) {
        reject('Sorry, address not found');
        return;
      }

      resolve({
        address: results[0].providedLocation,
        longitude: results[0].locations[0].latLng.lng,
        latitude: results[0].locations[0].latLng.lat,
      });
    });
  }
)

geocodeAddress('30 Smith Street').then(
  location => console.log(JSON.stringify(location, undefined, 2)),
  errorMessage => console.log(errorMessage)
)