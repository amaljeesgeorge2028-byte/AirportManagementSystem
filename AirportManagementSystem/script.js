
```javascript
let flights = JSON.parse(localStorage.getItem("flights")) || [
    {
        number: "AI101",
        destination: "Delhi",
        time: "09:00",
        status: "Scheduled"
    },
    {
        number: "6E202",
        destination: "Mumbai",
        time: "11:30",
        status: "Scheduled"
    },
    {
        number: "IX303",
        destination: "Dubai",
        time: "14:00",
        status: "Departed"
    }
];

const flightForm = document.getElementById("flightForm");
const flightTable = document.getElementById("flightTable");
const searchFlight = document.getElementById("searchFlight");

// Save flights in the browser
function saveFlights() {
    localStorage.setItem("flights", JSON.stringify(flights));
}

// Display flights in the table
function displayFlights() {
    flightTable.innerHTML = "";

    const searchText = searchFlight.value.toLowerCase();

    const filteredFlights = flights.filter(function(flight) {
        return flight.number.toLowerCase().includes(searchText) ||
               flight.destination.toLowerCase().includes(searchText);
    });

    filteredFlights.forEach(function(flight) {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${flight.number}</td>
            <td>${flight.destination}</td>
            <td>${flight.time}</td>
            <td>${flight.status}</td>
            <td>
                <button class="delete-btn"
                    onclick="deleteFlight('${flight.number}')">
                    Delete
                </button>
            </td>
        `;

        flightTable.appendChild(row);
    });

    updateDashboard();
}

// Update dashboard counts
function updateDashboard() {
    document.getElementById("totalFlights").textContent = flights.length;

    document.getElementById("scheduledFlights").textContent =
        flights.filter(function(flight) {
            return flight.status === "Scheduled";
        }).length;

    document.getElementById("departedFlights").textContent =
        flights.filter(function(flight) {
            return flight.status === "Departed";
        }).length;
}

// Add a new flight
flightForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const number = document.getElementById("flightNumber").value
        .trim().toUpperCase();

    const destination = document.getElementById("destination").value.trim();
    const time = document.getElementById("departureTime").value;
    const status = document.getElementById("status").value;

    if (flights.some(function(flight) {
        return flight.number.toLowerCase() === number.toLowerCase();
    })) {
        alert("This flight number already exists!");
        return;
    }

    flights.push({
        number: number,
        destination: destination,
        time: time,
        status: status
    });

    saveFlights();
    flightForm.reset();
    displayFlights();

    alert("Flight added successfully!");
});

// Delete a flight
function deleteFlight(number) {
    flights = flights.filter(function(flight) {
        return flight.number !== number;
    });

    saveFlights();
    displayFlights();
}

// Search flights
searchFlight.addEventListener("input", displayFlights);

// Display saved flights when the page opens
displayFlights();
```
}

searchFlight.addEventListener("input", displayFlights);

displayFlights();
