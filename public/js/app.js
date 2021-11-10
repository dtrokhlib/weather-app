const weatherForm = document.querySelector('form');
const weatherBlock = document.querySelector('.weather');
const search = document.querySelector('input');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    fetch(`/weather?location=${search.value || 'London'}`).then(response =>
        response.json().then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                weatherBlock.innerHTML = `
                    <p>Location: <span>${data.data[0]}</span></p>
                    <p>Forecast: <span>${data.data[1]}</span></p>
                    <p>Forecast: <span>${data.data[2]}</span></p>
                    <p>Forecast: <span>${data.data[3]}</span></p>`;
            }
        })
    )

})