document.addEventListener("DOMContentLoaded", function () {
    let cartContainer1 = document.querySelector("#booking");
    let clearBookingsButton = document.querySelector("#clearBookings");
  
   
    let bookings = JSON.parse(localStorage.getItem("bookings")) || [];
  
    
    function updateBookings() {
      let content1 = "";
      content1 += `<h2>My bookings</h2>`;
  
      if (bookings.length === 0) {
        cartContainer1.innerHTML = `
           <div id="line1">No booking yet.</div>
           <div id="line2">Why not plan a trip?</div>
        `;
        return;
      }
  
      bookings.forEach((trip) => {
        const currentDate = moment(); 
        const departureTime = moment(trip.time, "HH:mm"); 
        const timeLeft = departureTime.fromNow(); 
  
        content1 += `
          <div class="resultBook">
            <p>${trip.departure} > ${trip.arrival} <span><span class="span">${trip.time} </span><span class="span1">${trip.price}€</span></span></p>
            <p>Départ dans ${timeLeft}</p>
          </div>`;
      });
  
      content1 += `
        <div class="message">
          <div class="trait"></div>
          <p class="enjoy">Enjoy your travels with tickethack</p>
        </div>`;
  
      cartContainer1.innerHTML = content1;
    }
  
 
    updateBookings();
  
    clearBookingsButton.addEventListener("click", function () {
      
      localStorage.setItem("bookings", JSON.stringify([]));
  
     
      updateBookings();
  
      
      alert("All bookings have been cleared!");
    });
  });
  