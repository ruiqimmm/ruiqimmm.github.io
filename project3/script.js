function updateTime() {
    // Get current date and time
    let today = new Date();

    // Access specific components
    let thisMonth = today.getMonth();
    let months = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
    let thisDate = today.getDate();
    let thisWeekday = today.getDay();
    let thisYear = today.getFullYear();
    let thisHour = today.getHours();
    let thisMinute = today.getMinutes();
    let thisSecond = today.getSeconds();

    // Get DOM elements
    let mondayHours = document.querySelectorAll("#mon .hours");
    let tuesdayHours = document.querySelectorAll("#tue .hours");
    let wednesdayHours = document.querySelectorAll("#wed .hours");
    let thursdayHours = document.querySelectorAll("#thu .hours");
    let fridayHours = document.querySelectorAll("#fri .hours");
    let saturdayHours = document.querySelectorAll("#sat .hours");
    let sundayHours = document.querySelectorAll("#sun .hours");
    let springDiv = document.querySelector("#seasons .fourss:nth-child(1)");
    let summerDiv = document.querySelector("#seasons .fourss:nth-child(2)");
    let fallDiv = document.querySelector("#seasons .fourss:nth-child(3)");
    let winterDiv = document.querySelector("#seasons .fourss:nth-child(4)");
    let janDay = document.querySelectorAll("#Jan .dayinmonth");
    let febDay = document.querySelectorAll("#Feb .dayinmonth");
    let marDay = document.querySelectorAll("#Mar .dayinmonth");
    let aprDay = document.querySelectorAll("#Apr .dayinmonth");
    let mayDay = document.querySelectorAll("#May .dayinmonth");
    let junDay = document.querySelectorAll("#Jun .dayinmonth");
    let julDay = document.querySelectorAll("#Jul .dayinmonth");
    let augDay = document.querySelectorAll("#Aug .dayinmonth");
    let sepDay = document.querySelectorAll("#Sep .dayinmonth");
    let octDay = document.querySelectorAll("#Oct .dayinmonth");
    let novDay = document.querySelectorAll("#Nov .dayinmonth");
    let decDay = document.querySelectorAll("#Dec .dayinmonth");
    let morningDiv = document.getElementById("morning");
    let eveningDiv = document.getElementById("evening");
    let nowMinutes = document.querySelectorAll(".min");
    let nowSeconds = document.querySelectorAll(".sec");
    let nowHours = document.querySelectorAll(".hours");

    // Highlight current minute
    nowMinutes.forEach(minute => minute.style.backgroundColor = "transparent");
    nowMinutes[thisMinute].style.backgroundColor = "yellow";

    // Highlight current second
    nowSeconds.forEach(second => second.style.backgroundColor = "transparent");
    if (thisSecond !== 0)
        nowSeconds[thisSecond - 1].style.backgroundColor = "yellow";

    // Highlight current hour based on weekday
    nowHours.forEach(hour => hour.style.backgroundColor = "transparent");
    if (thisWeekday === 1)
        mondayHours[thisHour].style.backgroundColor = "yellow";
    else if (thisWeekday === 2)
        tuesdayHours[thisHour].style.backgroundColor = "yellow";
    else if (thisWeekday === 3)
        wednesdayHours[thisHour].style.backgroundColor = "yellow";
    else if (thisWeekday === 4)
        thursdayHours[thisHour].style.backgroundColor = "yellow";
    else if (thisWeekday === 5)
        fridayHours[thisHour].style.backgroundColor = "yellow";
    else if (thisWeekday === 6)
        saturdayHours[thisHour].style.backgroundColor = "yellow";
    else if (thisWeekday === 0)
        sundayHours[thisHour].style.backgroundColor = "yellow";

    // Highlight current day based on month
    if (thisMonth === 0)
        janDay[thisDate - 1].style.backgroundColor = "yellow";
    else if (thisMonth === 1)
        febDay[thisDate - 1].style.backgroundColor = "yellow";
    else if (thisMonth === 2)
        marDay[thisDate - 1].style.backgroundColor = "yellow";
    else if (thisMonth === 3)
        aprDay[thisDate - 1].style.backgroundColor = "yellow";
    else if (thisMonth === 4)
        mayDay[thisDate - 1].style.backgroundColor = "yellow";
    else if (thisMonth === 5)
        junDay[thisDate - 1].style.backgroundColor = "yellow";
    else if (thisMonth === 6)
        julDay[thisDate - 1].style.backgroundColor = "yellow";
    else if (thisMonth === 7)
        augDay[thisDate - 1].style.backgroundColor = "yellow";
    else if (thisMonth === 8)
        sepDay[thisDate - 1].style.backgroundColor = "yellow";
    else if (thisMonth === 9)
        octDay[thisDate - 1].style.backgroundColor = "yellow";
    else if (thisMonth === 10)
        novDay[thisDate - 1].style.backgroundColor = "yellow";
    else if (thisMonth === 11)
        decDay[thisDate - 1].style.backgroundColor = "yellow";

    // Highlight current season
    springDiv.style.backgroundColor = "transparent";
    summerDiv.style.backgroundColor = "transparent";
    fallDiv.style.backgroundColor = "transparent";
    winterDiv.style.backgroundColor = "transparent";

    if (thisMonth >= 2 && thisMonth <= 4)
        springDiv.style.backgroundColor = "rgb(152,251,152)";
    else if (thisMonth >= 5 && thisMonth <= 7)
        summerDiv.style.backgroundColor = "rgb(152,251,152)";
    else if (thisMonth >= 8 && thisMonth <= 10)
        fallDiv.style.backgroundColor = "rgb(152,251,152)";
    else
        winterDiv.style.backgroundColor = "rgb(152,251,152)";

    // Highlight day and night
    if (thisHour >= 5 && thisHour < 19) {
        morningDiv.style.backgroundColor = "yellow";
        eveningDiv.style.backgroundColor = "white";
    } else {
        morningDiv.style.backgroundColor = "white";
        eveningDiv.style.backgroundColor = "rgb(100,149,237)";
    }

    // Display date and time
    let dateElement = document.getElementById("dateHere");
    dateElement.innerHTML = thisYear + " / " + months[thisMonth] + " / " + thisDate;

    let formattedHour = thisHour < 10 ? "0" + thisHour : thisHour;
    let timeElement = document.getElementById("timeHere");
    timeElement.innerHTML = formattedHour + ":" + (thisMinute < 10 ? "0" + thisMinute : thisMinute) + ":" + (thisSecond < 10 ? "0" + thisSecond : thisSecond);
}

// Call updateTime every second
setInterval(updateTime, 1000);
