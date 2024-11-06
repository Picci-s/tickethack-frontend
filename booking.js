const moment = require('moment');

const confirmedTrip = JSON.parse(localStorage.getItem('confirmedTrip'));

if (confirmedTrip) {
    document.getElementById('#line1').textContent = "My Bookings";
    document.getElementById('#line2').textContent = "Enjoy your travels with tickethack";

    const departureTime = moment(confirmedTrip.date);
    const timeLeft = departureTime.fromNow();

    const departureMessage = document.createElement('div');
    departureMessage.textContent = `Departure in ${timeLeft}`;
    document.getElementById('#bookingContainer').appendChild(departureMessage);

    const bookingDetails = document.createElement('div');
    bookingDetails.textContent = `${confirmedTrip.departure} > ${confirmedTrip.arrival} on ${confirmedTrip.date} - ${confirmedTrip.price} euros`;
    document.getElementById('#bookingContainer').appendChild(bookingDetails);
} else {
    document.getElementById('line1').textContent = "No bookings yet.";
    document.getElementById('line2').textContent = "Why not plan a trip?";
}