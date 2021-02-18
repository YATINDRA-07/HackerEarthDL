const request = require('request')
const forecast = (latitude, longitude, callback)=>{
    const url = 'http://api.openweathermap.org/data/2.5/weather?lat='+latitude+'&lon='+longitude+'&appid=20bf810c4000ed17d585ead094559881&units=metric'
    request({url, json:true}, (error, {body})=>{
        if(error){
            callback('Unable to connect to weather service', undefined)
        }
        else if(body.cod == 400){
            callback('Not found', undefined)
        }
        else{
            callback(undefined,{
                forecast : "Current temperature is "+ body.main.temp + '°C.',
                status : 'Sky status : ' +body.weather[0].main+'',
                min_max : 'Today it will be high upto '+ body.main.temp_max + ' with a low of '+ body.main.temp_min+''
            })
        }
    })
} 
module.exports = forecast