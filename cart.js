const cartContainer = document.getElementById('cartContainer');
let trips = JSON.parse(localStorage.getItem('trips')) || [];

function updateCart() {
    cartContainer.innerHTML = '';

    if (trips.length === 0) {
        cartContainer.innerHTML = '<p>No tickets in your cart. Why not plan a trip?</p>';
    } else {
        trips.forEach((trip, index) => {
            const tripElement = document.createElement('div');
            tripElement.classList.add('tripItem');

            tripElement.innerHTML = `
                <p>${trip.departure} > ${trip.arrival} | ${trip.time} | ${trip.price}€</p>
                <button class="deleteButton" data-index="${index}" data-id="${trip._id}">Delete</button>
            `;
            cartContainer.appendChild(tripElement);
        });
    }
}

updateCart();

cartContainer.addEventListener('click', function(e) {
    if (e.target && e.target.classList.contains('deleteButton')) {
        const index = e.target.getAttribute('data-index');
        const tripId = e.target.getAttribute('data-id');
        
        trips.splice(index, 1);
        localStorage.setItem('trips', JSON.stringify(trips));

        e.target.parentElement.remove();

        fetch(`http://localhost:3000/deleteTrips/${tripId}`, {
            method: 'DELETE',
        })
        .then(response => response.json())
        .then(data => {
            console.log(data.message); 
        })
        .catch(error => {
            console.error("Erreur de suppression:", error);
        });

        updateCart();
    }
});