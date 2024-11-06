
let button = document.querySelector('#button');
let card2 = document.querySelector('.card2');

button.addEventListener('click', function () {
    let departure = document.querySelector('#departure').value;
    let arrival = document.querySelector('#arrival').value;
    let date = document.querySelector('#date').value;

    if (!departure || !arrival || !date) {
        alert('Tous les champs sont obligatoires')
        return;
    }
    let formattedDate = moment(date).format('DD/MM/YYYY')

    fetch('http://localhost:3000/trips/generatetrips', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ departure, arrival, date:formattedDate })
    })
        .then(response => response.json())
        .then(data => {

            if (data.result && data.trips.length > 0) {
                let content = '';  
                data.trips.forEach(trip => {
                    content += `
                        <div class="resultSearch">
                            <p>${trip.departure} > ${trip.arrival} <span><span>${trip.time} </span><span>${trip.price}€</span></span></p>
                            <button class="buttonBook">Book</button>
                        </div>
                    `;
                });
                card2.innerHTML = content;

                let bookButtons = document.querySelectorAll('.buttonBook');
                bookButtons.forEach(button => {
                    button.addEventListener('click', function() {
                        // Récupère les informations du voyage depuis les attributs de données
                        let selectedTrip = {
                            departure: this.getAttribute('data-departure'),
                            arrival: this.getAttribute('data-arrival'),
                            time: this.getAttribute('data-time'),
                            price: this.getAttribute('data-price')
                        };

                        // Récupère les voyages existants dans le localStorage ou crée un tableau vide
                        let trips = JSON.parse(localStorage.getItem('trips')) || [];
                        
                        // Ajoute le voyage sélectionné
                        trips.push(selectedTrip);
                        
                        // Stocke de nouveau dans le localStorage
                        localStorage.setItem('trips', JSON.stringify(trips));

                        // Redirige vers la page du panier
                        window.location.href = '/cart'; // Remplace par le bon chemin si nécessaire
                    });
                });

                } else {
                    card2.innerHTML = ` <img src="images/notfound.png" alt="Train" class="train-image" />
            <div class="divider"></div>
            <div class="result">
              <p>No trip found</p>
            </div>`;
                }
      })
        .catch(error => {
            console.error("Signup error:", error);
            alert("Une erreur est survenue !");
        });
});

