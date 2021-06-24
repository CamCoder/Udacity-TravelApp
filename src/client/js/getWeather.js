function getWeather(lat, lng){

    fetch('http://localhost:8082/weather',{
        method: 'POST', 
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },      
        body: JSON.stringify({lat,lng}), 
    })     
    .then(res => res.json())
    .then(function(res){
        
        console.log("NEW:")
        console.log(res)
        // console.log(res.geonames[0].lng)


    })
}

export {getWeather}