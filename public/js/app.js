//client side js


const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const p1 = document.querySelector('#p1');
const p2 = document.querySelector('#p2');



weatherForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const location = search.value;

    if (location) {

        fetch('http://localhost:3000/weather?address=' + location).then((response) => {

            response.json().then((data) => {

                if (data.error) {
                    p1.textContent = data.error;

                } else {
                    p2.textContent = data.forecast + ' ' + data.location;
                }
            })
        })
    } else {
        p1.textContent = 'Please provide a vlaue for the search';
    }
});