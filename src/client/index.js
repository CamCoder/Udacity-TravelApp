import {handleSubmit} from './js/formHandler';
import { handleDate } from './js/dateHandler';
import { setDate } from './js/setDate';
// import { getWeather } from './js/getWeather';
import { tripList } from './js/tripList';
import { addToLocalStorageArray } from './js/addToLocalStorage';

// import "./js/app";

import "./styles/main.scss";


// Set min date value when page is loaded
setDate();

// When page loads create tripId
// Keeps track of the number of trips 
window.tripCount = 1;


export { handleSubmit };
export {handleDate};
export {setDate};
// export {getWeather};
export {tripList};
export {addToLocalStorageArray}