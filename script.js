
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

