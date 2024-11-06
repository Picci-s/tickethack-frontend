document.addEventListener("DOMContentLoaded", function () {
    let cartContainer = document.querySelector("#cart");
    let trips = JSON.parse(localStorage.getItem("trips")) || [];
    let bookings = JSON.parse(localStorage.getItem("bookings")) || [];

    
    function updateCart() {
        let content1 = "";
        content1 += `<h2>My Cart</h2>`

        if (trips.length === 0) {
            cartContainer.innerHTML = `
            <div id="line1">No tickets in your cart.</div>
            <div id="line2">Why not plan a trip?</div>
            `;
            return;
        }

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
                    </div>`;
        cartContainer.innerHTML = content1;
    }

    
    updateCart();

   
    cartContainer.addEventListener("click", function (e) {
        if (e.target && e.target.classList.contains("deleteButton")) {
            const tripId = e.target.getAttribute("data-id");

            
            trips = trips.filter(trip => trip._id !== tripId); 
            localStorage.setItem("trips", JSON.stringify(trips));

            
            e.target.parentElement.remove();

          
            fetch(`https://tickethack-backend-omega.vercel.app/deleteTrips/${tripId}`, {
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

    
    cartContainer.addEventListener("click", function (e) {
        if (e.target && e.target.classList.contains("purchase")) {
            if (trips.length > 0) {
                
                bookings = bookings.concat(trips);

                
                localStorage.setItem("bookings", JSON.stringify(bookings));

               
                localStorage.setItem("trips", JSON.stringify([]));

              
                updateCart();

                
                window.location.href = "bookings.html";
            } else {
                alert("No trips selected!");
            }
        }
    });
});
