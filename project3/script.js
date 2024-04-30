function updateTime() {

    // Get current date and time
    let today = new Date();
    
    // Access specific components
    
    // Date
    let thisMonth = today.getMonth();
    let months = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
    
    let thisDate = today.getDate();
    let thisWeekday = today.getDay();
    let weekdays = ["7", "1", "2", "3", "4", "5", "6"];
    let thisYear = today.getFullYear();
    
    // Add to inner HTML
    let dateElement = document.getElementById("dateHere");
    dateElement.innerHTML = months[thisMonth] + " / " + thisDate + ", " + thisYear;
    
    // Time
    let thisHour = today.getHours();
    let thisMinute = today.getMinutes();
    let thisSecond = today.getSeconds();
      
    // Adjust hour to 12-hour format
    if(thisHour > 12) {
      thisHour = thisHour - 12
    }
      
    // Add leading zero to seconds if less than 10
    if(thisSecond < 10) {
      thisSecond = "0" + thisSecond;
    }
      
    // Add to inner HTML
    let timeElement = document.getElementById("timeHere");
    timeElement.innerHTML = thisHour + ":" + thisMinute + ":" + thisSecond;
      
}

setInterval(updateTime, 1000);
