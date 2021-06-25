import { addToLocalStorageArray } from "./addToLocalStorage"

function getWeather(lat, lng){

    const date = localStorage.getItem(tripCount).split(',')[1];
    const date2 = localStorage.getItem(tripCount).split(',')[2];

    console.log(localStorage.getItem(tripCount).split(',')[0]);

    if(localStorage.getItem(tripCount).split(',')[0] <= 7){
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
            console.log(res.data)
            // console.log(res.geonames[0].lng)
        })        
    }
    else{
        fetch('http://localhost:8082/weatherHistory',{
            method: 'POST', 
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
            },      
            body: JSON.stringify({lat,lng, date, date2}), 
        })     
        .then(res => res.json())
        .then(function(res){
            
            console.log("History:")
            console.log(res)
        })
    }
}

export {getWeather}