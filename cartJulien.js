document.addEventListener("DOMContentLoaded", function () {
    let cartContainer = document.querySelector("#cart");

    let trips = JSON.parse(localStorage.getItem("trips")) || [];
    
    
    function updateCart() {
        if (trips.length === 0) {
            cartContainer.innerHTML = `
        <div id="line1">No tickets in your cart.</div>
        <div id="line2">Why not plan a trip?</div>
        `;
            return;
        }
        let content1 = "";
        let count = 0;
        trips.forEach(trip => {
            count += Number(trip.price);
            content1 += `
                        <div class="resultBook">
                            <p>${trip.departure} > ${trip.arrival} <span><span class="span">${trip.time} </span><span class="span1">${trip.price}€</span></span></p>
                            <button class="deleteButton" data-id="${trip._id}">x</button> 
                        </div>`;
        });
        content1 += `<div class="total">
                            <p>Total: ${count}€</p>
                            <button class="purchase">Purchase</button>
                            </div>
    `;
        cartContainer.innerHTML = content1;
    }

   
    updateCart();

    
    cartContainer.addEventListener("click", function (e) {
        if (e.target && e.target.classList.contains("deleteButton")) {
            const index = e.target.getAttribute("data-index");
            const tripId = e.target.getAttribute("data-id");

        
            trips.splice(index, 1);
            localStorage.setItem("trips", JSON.stringify(trips));

         
            e.target.parentElement.remove();

            
            fetch(`http://localhost:3000/deleteTrips/${tripId}`, {
                method: "DELETE",
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log(data.message);
                })
                .catch((error) => {
                    console.error("Error deleting trip:", error);
                });

            
            updateCart();
        }
    });
});
