import { addToLocalStorageArray } from "./addToLocalStorage";

function handleDate(d){

    const currentDate = document.getElementById('date').min;
    const tripDate = d;

    const oldDate = new Date(currentDate)
    const newDate = new Date(tripDate);

    // To calculate the time difference of two dates
    const Difference_In_Time = newDate.getTime() - oldDate.getTime();

    // To calculate the no. of days between two dates
    const Difference_In_Days = (Difference_In_Time / (1000 * 3600 * 24)) + 1;


    let histroyDate = newDate.getFullYear()-1

    if(newDate.getMonth()+1 < 10){
        histroyDate = histroyDate + "-0" + (newDate.getMonth()+1);
    }else{
        histroyDate = histroyDate + "-" + (newDate.getMonth()+1);
    }
    if(newDate.getDate()+1 < 10){
        histroyDate = histroyDate + "-0" + (newDate.getDate()+1);
    }else{
        histroyDate = histroyDate + "-" + (newDate.getDate()+1);

    }



    localStorage.setItem(tripCount, [ Difference_In_Days] );
    addToLocalStorageArray(tripCount,[histroyDate]);
    addToLocalStorageArray(tripCount,[tripDate]);

    // localStorage.setItem(tripCount, [ Difference_In_Days] );
    
    

}


export{handleDate};