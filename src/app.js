const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geocode = require('../utils/geocode.js');
const forecast = require('../utils/forecast.js');

const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'hbs');
hbs.registerPartials(path.join(__dirname, '../templates/partials'));

// SET public folder and views path
app.set('views', path.join(__dirname, '../templates/views'));
app.use(express.static(path.join(__dirname, "../public")));

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Home page',
        body: 'Lorem ipsum lorum lorem ipsum lorum'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About page',
        image: '/img/40232903.jpg'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Hello from the help page',
        body: 'THIS IS HELP PAGE'
    });
});

app.get('/products', (req, res) => {
    if (!req.query.search) {
        res.send('There is no search settings');
    } else {
        res.send({
            products: []
        });
    }
});

app.get('/weather', (req, res) => {
    if (!req.query.location) {
        res.send('There is no location');
        return;
    }
    geocode(req.query.location, (error, {
        lat,
        long
    }) => {
        if (error) {
            res.send(error);
        }
        forecast(lat, long, (error, {
            description: forecast,
            feelslike,
            temperature
        }) => {
            if (error) {
                res.send(error);
                return;
            }
            res.send({
                data: [req.query.location, forecast, feelslike, temperature]
            });
        });
    });
});

app.get('*', (req, res) => {
    res.render('404');
})

app.listen(port, () => {
    console.log('Server is app on port' + port)
});

// console.log(test("stop Making spongebob Memes!"));

// function test(sentence) {
//     return Array.from(sentence).map((item, index) => index % 2 ? item.toLowerCase() : item.toUpperCase()).join('');
// }

console.log(path.join(__dirname, '../public'));