
let flights;

try {
    const savedFlights = localStorage.getItem("flights");
    flights = savedFlights ? JSON.parse(savedFlights) : null;
} catch (error) {
    flights = null;
}

if (!Array.isArray(flights)) {
    flights = [
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
}

const flightForm = document.getElementById("flightForm");
const flightTable = document.getElementById("flightTable");
const searchFlight = document.getElementById("searchFlight");

function saveFlights() {
    localStorage.setItem("flights", JSON.stringify(flights));
}

function displayFlights() {
    flightTable.innerHTML = "";

    const searchText = searchFlight.value.toLowerCase();

    const filteredFlights = flights.filter(function(flight) {
        return flight.number.toLowerCase().includes(searchText) ||
               flight.destination.toLowerCase().includes(searchText);
    });

    filteredFlights.forEach(function(flight) {
        const row = document.createElement("tr");

        const numberCell = document.createElement("td");
        numberCell.textContent = flight.number;

        const destinationCell = document.createElement("td");
        destinationCell.textContent = flight.destination;

        const timeCell = document.createElement("td");
        timeCell.textContent = flight.time;

        const statusCell = document.createElement("td");
        statusCell.textContent = flight.status;

        const actionCell = document.createElement("td");
        const deleteButton = document.createElement("button");

        deleteButton.textContent = "Delete";
        deleteButton.className = "delete-btn";
        deleteButton.addEventListener("click", function() {
            deleteFlight(flight.number);
        });

        actionCell.appendChild(deleteButton);
        row.append(
            numberCell,
            destinationCell,
            timeCell,
            statusCell,
            actionCell
        );

        flightTable.appendChild(row);
    });

    updateDashboard();
}

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

flightForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const number = document.getElementById("flightNumber").value
        .trim().toUpperCase();

    const destination = document.getElementById("destination").value.trim();
    const time = document.getElementById("departureTime").value;
    const status = document.getElementById("status").value;

    if (!number || !destination || !time || !status) {
        alert("Please fill in all flight details.");
        return;
    }

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

function deleteFlight(number) {
    flights = flights.filter(function(flight) {
        return flight.number !== number;
    });

    saveFlights();
    displayFlights();
}

searchFlight.addEventListener("input", displayFlights);

displayFlights();

