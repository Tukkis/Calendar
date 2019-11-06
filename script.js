const selectYear = document.getElementById("yearcontrol");
const selectMonth = document.getElementById("monthcontrol");
const calendar = document.querySelector('.calendar');
const days = document.getElementById('days');
const monthAndYear = document.getElementById("month");
const today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();
const previousButton = document.getElementById('previous');
const nextButton = document.getElementById('next');


months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
function fillMonthAndYear() {
    monthAndYear.innerHTML = months[currentMonth] + " " + currentYear;
}

fillMonthAndYear();

function daysInMonth(iMonth, iYear) {
    return 32 - new Date(iYear, iMonth, 32).getDate();
}

function populateCalendar(iMonth, iYear) {
    let firstDay = (new Date(iYear, iMonth)).getDay();
    let daysI = daysInMonth(iMonth, iYear);
    days.innerHTML = "";
    let todai = new Date();
    todai.setFullYear(iYear);
    todai.setMonth(iMonth);
    let filler = todai.getDay();
    for (let i = 0; i <= filler; i++) {
        let node = document.createElement('p');
        days.appendChild(node);
    }
    for (let i = 0; i < daysI; i++) {
        let node = document.createElement('h4');
        let textnode = document.createTextNode(i + 1);
        node.appendChild(textnode);
        days.appendChild(node);
        if ((i + 1) == today.getDate() && currentMonth == today.getMonth() && currentYear == today.getFullYear()) {
            node.classList.add('today');
        }
    }
}

populateCalendar(currentMonth, currentYear);

function checkTime(time) {
    if (time < 10) { time = "0" + time };
    return time;
}

function previousMonth() {
    if (currentMonth > 0) {
        currentMonth = currentMonth - 1;
    }
    else {
        currentMonth = 11;
        currentYear = currentYear - 1;
    }
    populateCalendar(currentMonth, currentYear);
    fillMonthAndYear();
}

function nextMonth() {
    if (currentMonth < 11) {
        currentMonth = currentMonth + 1;
    }
    else {
        currentMonth = 0;
        currentYear = currentYear + 1;
    }
    populateCalendar(currentMonth, currentYear);
    fillMonthAndYear();
}

function jump() {
    currentYear = parseInt(selectYear.value);
    currentMonth = parseInt(selectMonth.value);
    populateCalendar(currentMonth, currentYear);
    fillMonthAndYear();
}


previousButton.addEventListener('click', previousMonth);
nextButton.addEventListener('click', nextMonth);
