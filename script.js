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

let savedEvents = [];
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

function oldFormRemove(){
    let oldForm = document.getElementById('eventform');
    if (oldForm != null) {
        oldForm.remove();
    }
}

function populateCalendar(iMonth, iYear) {
    oldFormRemove();
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

let lastActive = '';
let currentForm = '';
function optionCreator() {
    let stages = '';
    for (let i = 1; i < 49; i++) {
        let tracker = 0;
        tracker += i/2;
        if (tracker % 1 === 0){
            stages += `<option data-time="${tracker}:00">${tracker}:00</option>`
        } else {
            tracker -= 0.5;
            stages += `<option ${tracker}:00>${tracker}:30</option>`
        }
    }
    return stages;
}

function saveEvent() {
    const formS= document.getElementById('timecontrolstart');
    const formE= document.getElementById('timecontrolend');
    const eventI = document.getElementById('timeinput');
    const dayI = document.querySelector('.active');
    const stringI = eventI.value;
    const timeE = formE.value;
    const timeS = formS.value;
    const dateI = dayI.id;
    if(stringI === ''){
        window.alert("Please fill the eventform");
        return;
    }
    if(timeE <= timeS){
        window.alert("Invalid start/end time");
        return;
    }
    savedEvents.push({
        'year' : currentYear,
        'month' : currentMonth,
        'day' : dateI,
        'start' : timeS,
        'end' : timeE,
        'event' : stringI
    }) 
    populateCalendar(currentMonth, currentYear);
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
        `
        <div class="eventformtopcontainer">
            <h5 id='eventformday'>${this.id}. of ${months[currentMonth]}</h5>
            <button type="button" id="formbutton">X</button>
        </div>
        </br>
        <div>
            <label>From:
                <select class="options" name="timecontrol" id="timecontrolstart">
                    ${optionCreator()}
                </select>
            </label>
            <label>To:
                <select class="options" name="timecontrol" id="timecontrolend">
                    ${optionCreator()}
                </select>
            </label>
        </div>
        <input type="text" id="timeinput" placeholder="Add event here" />
        <button type="button" class="eventsubmitbutton" onClick="saveEvent()">Add event</button>
        `
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
