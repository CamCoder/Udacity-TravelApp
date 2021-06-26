function setDate(){
    let d = new Date();

    let minDate = d.getFullYear();
    if(d.getMonth()+1 < 10){
        minDate = minDate + "-0" + (d.getMonth()+1);
    }else{
        minDate = minDate + "-" + (d.getMonth()+1);
    }
    if(d.getDate()+1 < 10){
        minDate = minDate + "-0" + (d.getDate()+1);
    }else{
        minDate = minDate + "-" + (d.getDate()+1);
    }

    document.getElementById('date').min = minDate

    
}

export{setDate}

