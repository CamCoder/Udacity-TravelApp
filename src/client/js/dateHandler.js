function handleDate(d){

    const currentDate = document.getElementById('date').min;
    const tripDate = d;

    const oldDate = new Date(currentDate)
    const newDate = new Date(tripDate);

    // To calculate the time difference of two dates
    const Difference_In_Time = newDate.getTime() - oldDate.getTime();

    // To calculate the no. of days between two dates
    const Difference_In_Days = (Difference_In_Time / (1000 * 3600 * 24)) + 1;

    console.log(Difference_In_Days)

    if(Difference_In_Days <= 7){
        console.log("Within a Week");
    }else{
        console.log("Next week");
    }
    

}


export{handleDate};