import { addToLocalStorageArray } from "./addToLocalStorage";
import { handleDate } from "./dateHandler";
// import { getWeather } from "./getWeather";
import { tripList } from "./tripList";
import {generateEntry} from "./app"

function handleSubmit(event) {
    event.preventDefault()
}

document.getElementById('submit').addEventListener('click', getInfo);

function getInfo(){
    
    // validate user input
    if( document.getElementById('destination').value == '' || document.getElementById('date').value == ''){

        if(document.getElementById('destination').value == '' && document.getElementById('date').value == ''){
            alert("Please fill out form");
        }
        else if(document.getElementById('date').value == ''){
            alert("Enter a valid date");
        }
        else if (document.getElementById('destination').value == ''){
            alert("Enter a destination");
        }
    }
    else{
        const loc = document.getElementById('destination').value;
        const date = document.getElementById('date').value; 

        handleDate(date)
        generateEntry(loc);

        // reset input fields
        document.getElementById('destination').value = '';
        document.getElementById('date').value = '';
    }
}

export {handleSubmit};