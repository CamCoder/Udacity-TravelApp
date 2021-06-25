import { addToLocalStorageArray } from "./addToLocalStorage"
import { tripList } from "./tripList";

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
            
            for(let x = 0; x<7;  x++){
                addToLocalStorageArray(tripCount,[res.data[x].weather.icon, res.data[x].high_temp, res.data[x].low_temp])

            }
            tripList();
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
            // tripList();
        })
    }
}

export {getWeather}