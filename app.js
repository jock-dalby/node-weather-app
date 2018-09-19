const request = require('request');
const configVar = require('./config')
// arg 1 is options, arg2 is callback for when data is returned
// https://www.npmjs.com/package/request
request({
  url: `http://www.mapquestapi.com/geocoding/v1/address?key=${configVar.MAP_QUEST_API_KEY}&location=1301%20lombard%20street%20philadelphia`,
  json: true
}, (error, response, body) => {
  const results = body.results;
  const providedLocation = results[0].providedLocation;
  const latLngInfo = results[0].locations[0].latLng;
  const locationLongitude = latLngInfo.lng;
  const locationLatitude = latLngInfo.lat;
  // Second argument not needed
  // 3rd argument states 2 spaces per indentation
  // console.log(JSON.stringify(body, undefined, 2));
  console.log('Provided location: ', providedLocation);
  console.log('Location longitude: ', locationLongitude);
  console.log(':ocation latitude: ', locationLatitude);
});