import { handleDate } from "./dateHandler";
import { getWeather } from "./getWeather";

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

        

        fetch('http://localhost:8082/travel',{
            method: 'POST', 
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
            },      
            body: JSON.stringify({loc}), 
        })
        .then(res => res.json())
        .then(function(res){
            // console.log(res.geonames[0].lat)
            // console.log(res.geonames[0].lng)
            handleDate(date);
            getWeather(res.geonames[0].lat,res.geonames[0].lng)

        })
        


        // reset input fields
        document.getElementById('destination').value = '';
        document.getElementById('date').value = '';
    }




}



export {handleSubmit};