import { param } from "jquery";
import { tripList } from "./tripList";

// API URL AND KEYS
const geoURL = 'http://api.geonames.org/searchJSON?q=';
const GEO_KEY = 'camcoder';
const forecastURL = 'https://api.weatherbit.io/v2.0/forecast/daily?lat=';
const historyURL = 'https://api.weatherbit.io/v2.0/history/daily?lat=';
const WBIT_KEY = '42ae3f3d6c05424e9b64eaad82e0c8c7';
const pixURL ="https://pixabay.com/api/?key=";
const PIX_KEY = '22240298-415423148879f96b44082537c';

// global var
let country_code = '';

/**
 * Add an item to a localStorage() array
*/
function addToLocalStorageArray(name, value) {

	// Get the existing data
	var existing = localStorage.getItem(name);

	// If no existing data, create an array
	// Otherwise, convert the localStorage string to an array
	existing = existing ? existing.split(',') : [];

	// Add new data to localStorage Array
	existing.push(value);

	// Save back to localStorage
	localStorage.setItem(name, existing.toString());

};

export function generateEntry(loc){
    // Get lon and lat
    getCord(loc)
    // Use the lon and lat to get weather and pic
    .then(async function(data){

        
        await getWeather(data.geonames[0].lat,data.geonames[0].lng);
        
        // if(data.geonames[0].countryCode == 'US'){
        //     getImage(data.geonames[0].name, data.geonames[0].adminName1)
        // }else{
        //     getImage(data.geonames[0].name, data.geonames[0].countryName)
        // }
        return data
    })
    .then( async function(data){
        console.log("Second 2: ",data)
        if(data.geonames[0].countryCode == 'US'){
            await  getImage(data.geonames[0].name, data.geonames[0].adminName1)
        }else{
            await getImage(data.geonames[0].name, data.geonames[0].countryName)
        }
        return data
    })
    .then(function(data){
        tripList();
    })
}

// Get lat and long 
const getCord = async (location) => {
    console.log(location);
    const res = await fetch(geoURL + location + '&maxRows=1&username=' + GEO_KEY)
    try {
        const data = await res.json()
        // console.log("TODAY: ", data.geonames[0].lat, data.geonames[0].lng)

        // Add city and state/country to local storage
        if(data.geonames[0].countryCode == "US"){
            addToLocalStorageArray(tripCount,[ data.geonames[0].toponymName,data.geonames[0].adminName1]);
        }else{
            addToLocalStorageArray(tripCount, [ data.geonames[0].toponymName, data.geonames[0].countryName])
        }

        return data;
    } catch (error) {
        console.log(error)
    }
}

// Get the weather
const getWeather = async (lat, lng) => {

    const date = localStorage.getItem(tripCount).split(',')[1];
    const date2 = localStorage.getItem(tripCount).split(',')[2];

    if(localStorage.getItem(tripCount).split(',')[0] <= 7){

        const res = await fetch(forecastURL+lat+'&lon='+lng+'&units=I&days=7&key='+WBIT_KEY)
        try {
            const weather = await res.json()

            for(let x = 0; x<7;  x++){
                addToLocalStorageArray(tripCount,[weather.data[x].weather.icon, weather.data[x].high_temp, weather.data[x].low_temp])
                // console.log(tripCount,[weather.data[x].weather.icon, weather.data[x].high_temp, weather.data[x].low_temp])

            }

            // console.log("Weather", weather.country_code)
            country_code = weather.country_code;
            console.log('First: ,', country_code)
            // return weather;
        } catch (error) {
            console.log(error)
        }




    //     fetch('http://localhost:8082/weather',{
    //         method: 'POST', 
    //         credentials: 'same-origin',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },      
    //         body: JSON.stringify({lat,lng}), 
    //     })     
    //     .then(res => res.json())
    //     .then(function(res){
            
    //         for(let x = 0; x<7;  x++){
    //             addToLocalStorageArray(tripCount,[res.data[x].weather.icon, res.data[x].high_temp, res.data[x].low_temp])

    //         }
    //         tripList();
    //     })        
    }
    // else{
    //     fetch('http://localhost:8082/weatherHistory',{
    //         method: 'POST', 
    //         credentials: 'same-origin',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },      
    //         body: JSON.stringify({lat,lng, date, date2}), 
    //     })     
    //     .then(res => res.json())
    //     .then(function(res){
            
    //         console.log("History:")
    //         console.log(res)
    //         // tripList();
    //     })
    

}


const getImage = async (param1,param2) =>{

    const res = await fetch(pixURL+PIX_KEY+"&q="+ param1 + "+" + param2+ "&image_type=photo");
    try {
        const image = await res.json()
        localStorage.setItem("tripCount",tripCount);
        addToLocalStorageArray(tripCount++,image.hits[0].webformatURL) ;
        // console.log("LASTTT")
        // console.log(localStorage.getItem(tripCount-1).split(','))
        // tripCount++;
        // return image.hits[0].webformatURL;
    } catch (error) {
        console.log(error)
    }
}
