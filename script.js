// Function to fetch data from the Beckon Network API
function fetchData() {
    // Make an AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            // Parse the response JSON
            var data = JSON.parse(this.responseText);
            
            // Process the fetched data
            displayData(data);
        }
    };
    xhttp.open("GET", "https://example.com/api/data", true); // Replace example.com/api/data with the actual API endpoint
    xhttp.send();
}

// Function to display the fetched data
function displayData(data) {
    var container = document.getElementById("dataContainer");
    var html = "";

    // Iterate through the data and create HTML elements to display it
    data.forEach(function(item) {
        html += "<div>";
        html += "<h2>" + item.title + "</h2>";
        html += "<p>" + item.description + "</p>";
        html += "</div>";
    });

    // Set the innerHTML of the container to display the fetched data
    container.innerHTML = html;
}

// Fetch data when the page loads
window.onload = function() {
    fetchData();
};
