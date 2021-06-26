// clear local storage on click

document.getElementById('btn-clear').addEventListener("click", clearData);

export function clearLocalData(event){
    event.preventDefault()
}

function clearData(){
    localStorage.clear()
    location.reload();
}