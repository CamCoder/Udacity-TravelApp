import {handleSubmit} from './js/formHandler';
import { handleDate } from './js/dateHandler';
import { setDate } from './js/setDate';
import { loadTrip } from './js/app';
import { tripList } from './js/tripList';
import { addToLocalStorageArray } from './js/addToLocalStorage';

// import "./js/app";

import "./styles/main.scss";

// When page loads create tripId
// Keeps track of the number of trips 
window.tripCount = 1;

// Set min date value when page is loaded
setDate();
// load any trips from local storage when page is load
for(let x = 0; x<localStorage.getItem('tripCount'); x++){
    loadTrip();
}




export { handleSubmit };
export {handleDate};
export {setDate};
// export {getWeather};
export {tripList};
export {addToLocalStorageArray}