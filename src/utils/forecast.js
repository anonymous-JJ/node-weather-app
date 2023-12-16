const request = require('postman-request');

const forecast = (latitude,longitude,callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=9adc8f95d7dbe1690982cf991fef73c7&query=' + latitude + ',' + longitude;

    request({url , json:true},(error,{body})=>{
        if(error){
            callback('Unable to connect to weather services right now.',undefined)
        }
        else if(body.success === false){
            callback('Unable to find the given location, try giving any other names!',undefined)
        }
        else{
            callback(undefined,body.current.weather_descriptions[0]+'. It is currently ' + body.current.temperature + ' degrees outside ,but it may feel like ' + body.current.feelslike + ' degrees.')
        }
    })
}

module.exports = forecast;
