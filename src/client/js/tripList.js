
function tripList(){


    // console.log('Last2')
    // console.log("NEW :",localStorage.getItem(tripCount-1).split(','))
    tripCount--

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

    // cardImg.innerHTML = `<img src="${localStorage.getItem(tripCount).split(',')[localStorage.getItem('1').split(',').length-1]}" alt="location img>`;
    // cardImg.innerHTML = `<img src="${localStorage.getItem(tripCount).split(',')[localStorage.getItem('1').split(',').length-1]}" alt="location img>`;
    // cardImg.innerHTML = `<img src="${localStorage.getItem(tripCount).split(',')[localStorage.getItem(tripCount).split(',').length-1]}" alt="location img>`;
    // console.log("URL current:     ",localStorage.getItem(tripCount).split(',')[localStorage.getItem(tripCount).split(',').length-1])
    console.log(img);

    cardInfo.innerHTML = `<p> My Escape to: ${localStorage.getItem(tripCount).split(',')[3]}, ${localStorage.getItem(tripCount).split(',')[4]} </p>`;
    cardInfo.innerHTML = cardInfo.innerHTML + `<p> Departing: ${localStorage.getItem(tripCount).split(',')[2]} </p>`
    cardInfo.innerHTML = cardInfo.innerHTML + `<p> Your escape is ${Difference_In_Days} days away</p>`

    if(Difference_In_Days <= 7){
        weatherList.setAttribute('class', "weather-list");
        const week = localStorage.getItem(tripCount).split(',').slice(5,26)

        for(let x = 0; x<21;  x=x+3){

        const forecast = document.createElement('div')
        forecast.setAttribute('class',"forecast")
        forecast.innerHTML = `<img src="https://www.weatherbit.io/static/img/icons/${week[x]}.png" alt="weather icon">`;
        forecast.innerHTML = forecast.innerHTML + `<p>H - ${week[x+1]}</p>`;
        forecast.innerHTML = forecast.innerHTML + `<p>L - ${week[x+2]}</p>`;

        weatherList.appendChild(forecast)
        }
    }
    else{
        
    }


    // }else{
        // cardWeather.innerHTML = 
    // }


    cardImg.appendChild(img)
    cardTop.appendChild(cardImg);
    cardTop.appendChild(cardInfo);
    cardWeather.innerHTML = "<h4> 7 day forecast </h4>"
    cardWeather.appendChild(weatherList);
    card.appendChild(cardTop);
    card.appendChild(cardWeather);
    list.appendChild(card);

    // console.log("URL, ",localStorage.getItem(tripCount).split(',')[localStorage.getItem(tripCount).split(',').length])
    // console.log("URL, ",localStorage.getItem(tripCount).split(','))
    tripCount++
}

export {tripList}