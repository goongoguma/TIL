const request = require('postman-request');

const url = 'http://api.weatherstack.com/current?access_key=ba6c779007e3f4cba3dfa7f396172609&query=37.8267,-122.4233';

request({url, json: true}, (error, response) => {
  if (error) {
    console.log('Undable to connect the service')
  } else if (response.body.error) {
    console.log('Unable to find location')
  } else {
    console.log(response.body.current)
  }
});
