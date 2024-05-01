function updateTime() {
    // Get current date and time
    let today = new Date();

    // Access specific components
    let thisMonth = today.getMonth();
    let months = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
    let thisDate = today.getDate();
    let thisWeekday = today.getDay(); // Sunday: 0, Monday: 1, ..., Saturday: 6
    let thisYear = today.getFullYear();
    let thisHour = today.getHours();
    let thisMinute = today.getMinutes();
    let thisSecond = today.getSeconds();

    // Get DOM elements
    let mondayHours = document.querySelectorAll("#mon .hours");
    let tuesdayHours = document.querySelectorAll("#tues .hours");
    let wednesdayHours = document.querySelectorAll("#wed .hours");
    let aprilDay = document.querySelectorAll("#Apr .dayinmonth");
    let mayDay = document.querySelectorAll("#May .dayinmonth");
    let nowMinutes = document.querySelectorAll(".min");
    let nowSeconds = document.querySelectorAll(".sec");

    // Highlight current minute
    nowMinutes.forEach(minute => minute.style.backgroundColor = "transparent");
    nowMinutes[thisMinute - 1].style.backgroundColor = "yellow";

    // Highlight current second
    nowSeconds.forEach(second => second.style.backgroundColor = "transparent");
    if (thisSecond !== 0)
        nowSeconds[thisSecond - 1].style.backgroundColor = "yellow";

    // Highlight current hour based on weekday
    if (thisWeekday === 1)
        mondayHours[thisHour - 1].style.backgroundColor = "yellow";
    else if (thisWeekday === 2)
        tuesdayHours[thisHour - 1].style.backgroundColor = "yellow";
    else if (thisWeekday === 3)
        wednesdayHours[thisHour - 1].style.backgroundColor = "yellow";

    // Highlight current date in April
    if (thisMonth === 3)
        aprilDay[thisDate - 1].style.backgroundColor = "yellow";
    // Display date
    let dateElement = document.getElementById("dateHere");
    dateElement.innerHTML = months[thisMonth] + " / " + thisDate + ", " + thisYear;

    // Format hour to always have two digits
    let formattedHour = thisHour < 10 ? "0" + thisHour : thisHour;

    // Display time
    let timeElement = document.getElementById("timeHere");
    timeElement.innerHTML = formattedHour + ":" + (thisMinute < 10 ? "0" + thisMinute : thisMinute) + ":" + (thisSecond < 10 ? "0" + thisSecond : thisSecond);
}

// Call updateTime every second
setInterval(updateTime, 1000);
