import { tripList } from "./tripList";

// API URL AND KEYS
const geoURL = 'http://api.geonames.org/searchJSON?q=';
const GEO_KEY = 'camcoder';
const forecastURL = 'https://api.weatherbit.io/v2.0/forecast/daily?lat=';
const historyURL = 'https://api.weatherbit.io/v2.0/history/hourly?lat=';
const WBIT_KEY = '42ae3f3d6c05424e9b64eaad82e0c8c7';
const pixURL ="https://pixabay.com/api/?key=";
const PIX_KEY = '22240298-415423148879f96b44082537c';



// load existing trips
export function loadTrip(){

    if(localStorage.getItem('tripCount') > 0){
        document.getElementById('btn-clear').style.display = "initial";
    }

    const list = document.getElementById('tripList');

    const card = document.createElement('div')
    const cardTop = document.createElement('div')
    const cardImg = document.createElement('div')
    const img = document.createElement('img')
    const cardInfo = document.createElement('div')
    const cardWeather = document.createElement('div')
    const weatherList = document.createElement('div')

    card.setAttribute('class','card')
    cardTop.setAttribute('class','card-top')
    cardImg.setAttribute('class','card-img')
    img.setAttribute('src', localStorage.getItem(tripCount).split(',')[localStorage.getItem(tripCount).split(',').length-1] );
    img.setAttribute('alt', 'image of location');
    cardInfo.setAttribute('class','card-info')
    cardWeather.setAttribute('class','card-weather')

    // Calculate how many days until trip
    const currentDate = document.getElementById('date').min;
    const todayDate = new Date(currentDate)
    const tripDate = new Date(localStorage.getItem(tripCount).split(',')[2]);
    const Difference_In_Time = tripDate.getTime() - todayDate.getTime();
    const Difference_In_Days = (Difference_In_Time / (1000 * 3600 * 24)) + 1;

    cardInfo.innerHTML = `<p> My Escape to: ${localStorage.getItem(tripCount).split(',')[3]}, ${localStorage.getItem(tripCount).split(',')[4]} </p>`;
    cardInfo.innerHTML += `<p> Departing: ${localStorage.getItem(tripCount).split(',')[2]} </p>`
    cardInfo.innerHTML += `<p> Your escape is ${Difference_In_Days} days away</p>`

    if(Difference_In_Days <= 7){
        weatherList.setAttribute('class', "weather-list");
        cardWeather.innerHTML = "<h4> 7 day forecast </h4>"
        const week = localStorage.getItem(tripCount).split(',').slice(5,26)

        for(let x = 0; x<21;  x=x+3){

        const forecast = document.createElement('div')
        forecast.setAttribute('class',"forecast")
        forecast.innerHTML = `<img src="https://www.weatherbit.io/static/img/icons/${week[x]}.png" alt="weather icon">`;
        forecast.innerHTML += `<p>H - ${week[x+1]}</p>`;
        forecast.innerHTML += `<p>L - ${week[x+2]}</p>`;

        weatherList.appendChild(forecast)
        }
    }
    else{
        cardWeather.innerHTML = "<h4> Typical weather for then: </h4>"
        // 5 and 6
        weatherList.setAttribute('class', "weather-history");
        weatherList.innerHTML = `<p> Average temp of ${localStorage.getItem(tripCount).split(',')[5]} with a likely weather of ${localStorage.getItem(tripCount).split(',')[6]} </p> `
        
    }

    cardImg.appendChild(img)
    cardTop.appendChild(cardImg);
    cardTop.appendChild(cardInfo);
    cardWeather.appendChild(weatherList);
    card.appendChild(cardTop);
    card.appendChild(cardWeather);
    list.appendChild(card);

    tripCount++
}


//  Add an item to a localStorage() array
export function addToLocalStorageArray(name, value) {

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
        return data
    })
    .then( async function(data){

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

    const today = localStorage.getItem(tripCount).split(',')[1];
    const date = new Date(today)

    const tomorrow = new Date(date);
    tomorrow.setDate(date.getDate()+2)
    
    let dayAfter = tomorrow.getFullYear();


    if(tomorrow.getMonth()+1 < 10){
        dayAfter = dayAfter + "-0" + (tomorrow.getMonth()+1);
    }else{
        dayAfter = dayAfter + "-" + (tomorrow.getMonth()+1);
    }
    if(tomorrow.getDate()+1 < 10){
        dayAfter = dayAfter  + "-0" + (tomorrow.getDate());
    }else{
        dayAfter = dayAfter + "-" + (tomorrow.getDate());
    }


    // if trip within 7 days get forecast
    if(localStorage.getItem(tripCount).split(',')[0] <= 7){

        const res = await fetch(forecastURL+lat+'&lon='+lng+'&units=I&days=7&key='+WBIT_KEY)
        try {
            const weather = await res.json()

            for(let x = 0; x<7;  x++){
                addToLocalStorageArray(tripCount,[weather.data[x].weather.icon, weather.data[x].high_temp, weather.data[x].low_temp])
            }
        } catch (error) {
            console.log(error)
        }     
    }
    // else get weather from trip date but 1 year ago
    else{
        const res = await fetch(historyURL +lat+'&lon='+lng+'&units=I&start_date='+today+'&end_date='+dayAfter+'&tz=local&key='+WBIT_KEY)
        try {
            const historyData = await res.json();
            addToLocalStorageArray(tripCount, [historyData.data[7].temp,historyData.data[7].weather.description]);
        } catch (error) {
            console.log(error)
        }

    }    
}

// Get image of location
const getImage = async (param1,param2) =>{

    const res = await fetch(pixURL+PIX_KEY+"&q="+ param1 + "+" + param2+ "+city&image_type=photo");
    try {
        const image = await res.json()
        localStorage.setItem("tripCount",tripCount);
        addToLocalStorageArray(tripCount++,image.hits[0].webformatURL) ;
    } catch (error) {
        console.log(error)
    }
}