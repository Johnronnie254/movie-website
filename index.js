

//Getting the data on the DOM to the web page
document.addEventListener('DOMContentLoaded', () => {

    //fetching data from the json file
    fetch('http://localhost:3000/films') 
        .then((res) => res.json())
        .then((data) => {
            const movieList = document.getElementById('movieList');

            //using the foeEach function to get data for all the items in the array of the JSON file
            data.forEach((data) => {
                const movieItem = document.createElement('li');
                movieItem.classList.add("films", "item");
                movieItem.innerHTML = `
                    <h2>Movie Title: ${data.title}</h2>
                    <h2>Runtime: ${data.runtime} minutes</h2>
                    <h2>Current Movie Tickets: <span class="ticketsSold"> ${data.tickets_sold}</span></h2>
                    <h2>Available Tickets: <span class="availableTickets">${data.capacity - data.tickets_sold}</span></h2>
                    <img class = "image" src =${data.poster} />
                    <br>
                    <button class="buyTicket">BuyTicket</button>
                `;

                //working on eventListner  to book the tickets
                let availableTicketsElement = movieItem.querySelector('.availableTickets');
                const buyTicket = movieItem.querySelector('.buyTicket');
                let ticketsSold = movieItem.querySelector('.ticketsSold');

                buyTicket.addEventListener('click', () => {
                    let currentTicketsSold = parseInt(ticketsSold.textContent);
                    ticketsSold.textContent = currentTicketsSold + 1;
                    availableTicketsElement.textContent = data.capacity - currentTicketsSold;

                    //a function to alert the user when they have purchased a ticket

                    function stopPurchase() {
                        if (data.capacity > currentTicketsSold) {
                            alert('Ticket successfully purchased');
                        } else {
                            alert('There is no available tickets');
                        }
                    }

                    stopPurchase(); // This line is removed, so the function is not called immediately
                });

                document.getElementById('movieList').appendChild(movieItem);

            });
        });
});
