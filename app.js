const request = require('request');
const configVar = require('./config')
// arg 1 is options, arg2 is callback for when data is returned
// https://www.npmjs.com/package/request
request({
  url: `http://www.mapquestapi.com/geocoding/v1/address?key=${configVar.MAP_QUEST_API_KEY}&location=1301%20lombard%20street%20philadelphia`,
  json: true
}, (error, response, body) => {
  console.log(body.results);
});