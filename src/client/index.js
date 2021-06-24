import {handleSubmit} from './js/formHandler';
import { handleDate } from './js/dateHandler';
import { setDate } from './js/setDate';
import { getWeather } from './js/getWeather';
import "./styles/main.scss";


// Set min date value when page is loaded
setDate();
// handleDate(document.getElementById('date').min);

export { handleSubmit };
export {handleDate};
export {setDate};
export {getWeather};