//Getting elements from the html

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
const body = document.getElementsByTagName("BODY")[0];

//Populating month and year when the page is loaded

months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
function fillMonthAndYear() {
    monthAndYear.innerHTML = months[currentMonth] + " " + currentYear;
}

fillMonthAndYear();

//Populating the calendar when the page is loaded

function daysInMonth(iMonth, iYear) {
    return 32 - new Date(iYear, iMonth, 32).getDate();
}

function populateCalendar(iMonth, iYear) {
    let filler = (new Date(iYear, iMonth)).getDay();
    let daysI = daysInMonth(iMonth, iYear);
    days.innerHTML = "";
    console.log(filler);
    if (filler == 0) {
        for (let i = 0; i < 6; i++) {
            let node = document.createElement('p');
            days.appendChild(node);
        }
    } else {
        for (let i = 1; i < filler; i++) {
            let node = document.createElement('p');
            days.appendChild(node);
        }
    }
    for (let i = 0; i < daysI; i++) {
        let node = document.createElement('h4');
        let textnode = document.createTextNode(i + 1);
        node.setAttribute("id", i + 1);
        node.setAttribute("data-day", i + 1);
        node.addEventListener('click', addEvent);
        node.appendChild(textnode);
        days.appendChild(node);
        if ((i + 1) == today.getDate() && currentMonth == today.getMonth() && currentYear == today.getFullYear()) {
            node.classList.add('today');
        }
    }
}

populateCalendar(currentMonth, currentYear);

function oldFormRemove(){
    let oldForm = document.getElementById('eventform');
    if (oldForm != null) {
        oldForm.remove();
    }
}

function previousMonth() {
    oldFormRemove();
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
    oldFormRemove();
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
    oldFormRemove();
    currentYear = parseInt(selectYear.value);
    currentMonth = parseInt(selectMonth.value);
    populateCalendar(currentMonth, currentYear);
    fillMonthAndYear();
}

let lastActive = '';
let currentForm = '';
function stageCreator() {
    let stages = '';
    for (let i = 0; i < 3; i++) {
        stages += `<div class="stage">To do</div>`;
    }
    return stages;
}

function addEvent() {
    oldFormRemove();
    this.classList.add('active');
    if (this != lastActive && lastActive != '') {
        lastActive.classList.remove('active');
    }
    lastActive = this;
    let node = document.createElement('form');
    node.innerHTML =
        `<h5>${this.id}. of ${months[currentMonth]}</h5>
        <button type="button" id="formbutton">X</button>
    </br>
    <div id="schedulecontainer">
        <div class="time start-730">7:30</div>${stageCreator()}
        <div class="time start-800">8:00</div>${stageCreator()}
        <div class="time start-830">8:30</div>${stageCreator()}
        <div class="time start-900">9:00</div>${stageCreator()}
        <div class="time start-930">9:30</div>${stageCreator()}
        <div class="time start-1000">10:00</div>${stageCreator()}
        <div class="time start-1030">10:30</div>${stageCreator()}
        <div class="time start-1100">11:00</div>${stageCreator()}
        <div class="time start-1130">11:30</div>${stageCreator()}
        <div class="time start-1200">12:00</div>${stageCreator()}
        <div class="time start-1230">12:30</div>${stageCreator()}
        <div class="time start-1300">13:00</div>${stageCreator()}
        <div class="time start-1330">13:30</div>${stageCreator()}
        <div class="time start-1400">14:00</div>${stageCreator()}
        <div class="time start-1430">14:30</div>${stageCreator()}
        <div class="time start-1500">15:00</div>${stageCreator()}
        <div class="time start-1530">15:30</div>${stageCreator()}
        <div class="time start-1600">16:00</div>${stageCreator()}
        <div class="time start-1630">16:30</div>${stageCreator()}
        <div class="time start-1700">17:00</div>${stageCreator()}
        <div class="time start-1730">17:30</div>${stageCreator()}
        <div class="time start-1800">18:00</div>${stageCreator()}
        <div class="time start-1830">18:30</div>${stageCreator()}
        <div class="time start-1900">19:00</div>${stageCreator()}
        <div class="time start-1930">19:30</div>${stageCreator()}
        <div class="time start-2000">20:00</div>${stageCreator()}
        <div class="time start-2030">20:30</div>${stageCreator()}
        <div class="time start-2100">21:00</div>${stageCreator()}
        <div class="time start-2130">21:30</div>${stageCreator()}
        <div class="time start-2200">22:00</div>${stageCreator()}
    </div>`;
    node.setAttribute('id', 'eventform');
    body.appendChild(node);
    node.style.position = 'absolute';
    node.style.top = (this.offsetTop + calendar.offsetTop + days.offsetTop + this.offsetHeight) + 'px';
    node.style.left = (this.offsetLeft + calendar.offsetLeft + days.offsetLeft + ((this.offsetWidth - node.offsetWidth) / 2)) + 'px';

    currentForm = node;

    document.getElementById('formbutton').addEventListener('click', function () { node.remove() });
}

function formMover() {
    currentForm.style.top = (lastActive.offsetTop + calendar.offsetTop + days.offsetTop + lastActive.offsetHeight) + 'px';
    currentForm.style.left = (lastActive.offsetLeft + calendar.offsetLeft + days.offsetLeft + ((lastActive.offsetWidth - currentForm.offsetWidth) / 2)) + 'px';
}

window.addEventListener('resize', formMover);
previousButton.addEventListener('click', previousMonth);
nextButton.addEventListener('click', nextMonth);
