const request = require('postman-request')

const geocode = (address,callback) =>{
    // const url = 'http://api.positionstack.com/v1/forward?access_key=82fd6f203c4ef6c78b835f5b6703bb97&query='+encodeURIComponent(address);

    const url = 'https://geocode.maps.co/search?q={'+encodeURIComponent(address)+'}'

    request({ url , json:true },(error,{body})=>{
        if (error){
            callback('Error in getting location',undefined);
        }
        else if(body.error){
                callback('Check the given location name!',undefined)
        }
        else if(body.length === 0){
            callback('Unable to forecast for given location!')
        }
        else{
            callback(undefined,{
                latitude: body[0].lat,
                longitude: body[0].lon,
                place: body[0].display_name
            })
        }
    }
)
}
module.exports = geocode;