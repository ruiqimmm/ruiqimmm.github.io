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
    let tuesdayHours = document.querySelectorAll("#tue .hours");
    let wednesdayHours = document.querySelectorAll("#wed .hours");
    let thursdayHours = document.querySelectorAll("#thu .hours");
    let fridayHours = document.querySelectorAll("#fri .hours");
    let saturdayHours = document.querySelectorAll("#sat .hours");
    let sundayHours = document.querySelectorAll("#sun .hours");
    let janDay = document.querySelectorAll("#jan .dayinmonth");
    let febDay = document.querySelectorAll("#feb .dayinmonth");
    let marDay = document.querySelectorAll("#mar .dayinmonth");
    let aprDay = document.querySelectorAll("#apr .dayinmonth");
    let mayDay = document.querySelectorAll("#may .dayinmonth");
    let junDay = document.querySelectorAll("#jun .dayinmonth");
    let julDay = document.querySelectorAll("#jul .dayinmonth");
    let augDay = document.querySelectorAll("#aug .dayinmonth");
    let sepDay = document.querySelectorAll("#sep .dayinmonth");
    let octDay = document.querySelectorAll("#oct .dayinmonth");
    let novDay = document.querySelectorAll("#nov .dayinmonth");
    let decDay = document.querySelectorAll("#dec .dayinmonth");
    let morningDiv = document.getElementById("morning");
    let eveningDiv = document.getElementById("evening");
    let springDiv = document.querySelector("#seasons .fourss:first-child");
    let summerDiv = document.querySelector("#seasons .fourss:nth-child(2)");
    let fallDiv = document.querySelector("#seasons .fourss:nth-child(3)");
    let winterDiv = document.querySelector("#seasons .fourss:last-child");
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


    //season!
    if (thisMonth >= 2 && thisMonth <= 5) {
        springDiv.style.backgroundColor = "rgb(152,251,152)";
    }
    if (thisMonth >= 5 && thisMonth <= 8) {
        summerDiv.style.backgroundColor = "rgb(152,251,152)";
    }
    if (thisMonth >= 8 && thisMonth <= 11) {
        fallDiv.style.backgroundColor = "rgb(152,251,152)";
    }
    if (thisMonth >= 2 && thisMonth <= 5) {
        winterDiv.style.backgroundColor = "rgb(152,251,152)";
    }

    //day and night
    if (thisHour >= 18 && thisMonth <= 6) {
        springDiv.style.backgroundColor = "rgb(152,251,152)";
    }

    if (thisHour >= 5 && thisHour < 19) {
        // 高亮显示"day" div，透明化"evening" div
        morningDiv.style.backgroundColor = "yellow";
        eveningDiv.style.backgroundColor = "white";
    } else {
        // 高亮显示"evening" div，透明化"day" div
        morningDiv.style.backgroundColor = "white";
        eveningDiv.style.backgroundColor = "rgb(100,149,237)";
    }

    let dateElement = document.getElementById("dateHere");
    dateElement.innerHTML = months[thisMonth] + " / " + thisDate + ", " + thisYear;

    let formattedHour = thisHour < 10 ? "0" + thisHour : thisHour;

    // Display time
    let timeElement = document.getElementById("timeHere");
    timeElement.innerHTML = formattedHour + ":" + (thisMinute < 10 ? "0" + thisMinute : thisMinute) + ":" + (thisSecond < 10 ? "0" + thisSecond : thisSecond);
}

// Call updateTime every second
setInterval(updateTime, 1000);
