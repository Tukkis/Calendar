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
        node.setAttribute("id", i+1);
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

function addEvent() {
    console.log(this.offsetLeft, this.offsetWidth);
    this.classList.add('active');
    if(this != lastActive && lastActive != ''){
        lastActive.classList.remove('active');
        }
    lastActive = this;
    let node = document.createElement('form');
    node.innerHTML =
    `<h5>${this.id}. of ${months[currentMonth]}</h5>
    </br>
    <input/>`;
    node.setAttribute('id', 'eventform');
    body.appendChild(node);
    node.style.position = 'absolute';
    node.style.top = (this.offsetTop + calendar.offsetTop + days.offsetTop + ((this.offsetHeight - node.offsetHeight) / 2)) + 'px';
    node.style.left = (this.offsetLeft + calendar.offsetLeft + days.offsetLeft + ((this.offsetWidth - node.offsetWidth) / 2)) + 'px';
    node.addEventListener('mouseleave', function(){node.remove()});
    node.addEventListener('mouseenter', function(){node.classList.add('currentform')}); 
}


previousButton.addEventListener('click', previousMonth);
nextButton.addEventListener('click', nextMonth);
