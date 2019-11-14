const monthAndYear = document.getElementById('month');
const canvas = document.querySelector('.calendar-week');
const week = document.getElementById('week');
const times = document.getElementById('times');
const today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();

months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
function fillMonthAndYear() {
    monthAndYear.innerHTML = months[currentMonth] + " " + currentYear;
}

fillMonthAndYear();

function populateTimes() {
    let div = '';
    for(let i = 0; i < 49; i++){
        let tracker = 0;
        tracker += i/2;
        if (tracker % 1 === 0){
            div += `<p>${tracker}:00</p>`
        } else {
            tracker -= 0.5;
            div += `<p>${tracker}:30</p>`
        }
    }
    times.innerHTML = div;
}

populateTimes();