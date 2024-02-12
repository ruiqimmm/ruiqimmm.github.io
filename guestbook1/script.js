function fnsubmit() {
    var nameInput = document.getElementById("name");
    var commentInput = document.getElementById("comment");
    var commentsContainer = document.getElementById("comments-container");

    // Create new elements for the comment and time
    var commentDiv = document.createElement("div");
    var nameParagraph = document.createElement("p");
    var commentParagraph = document.createElement("p");
    var timeParagraph = document.createElement("p");

    // Set text content for name, comment, and time paragraphs
    nameParagraph.textContent = "name: " + nameInput.value;
    commentParagraph.textContent = "comment: " + commentInput.value;

    // Get the current time
    var currentTime = new Date();
    var hours = currentTime.getHours();
    var minutes = currentTime.getMinutes();
    var seconds = currentTime.getSeconds();

    // Format the time as HH:MM:SS
    var timeString = ("0" + hours).slice(-2) + ":" + ("0" + minutes).slice(-2) + ":" + ("0" + seconds).slice(-2);
    timeParagraph.textContent = "" + timeString;

    // Append name, comment, and time paragraphs to the comment container
    commentDiv.appendChild(timeParagraph);
    commentDiv.appendChild(nameParagraph);  
    commentDiv.appendChild(commentParagraph);
   
    // Append the comment container to the comments container
    commentsContainer.appendChild(commentDiv);

    // Clear input fields after submission
    nameInput.value = "";
    commentInput.value = "";
}
