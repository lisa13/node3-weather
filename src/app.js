const path = require('path');
const express = require('express');
const hbs = require('hbs');

const request = require('request');
const fs = require('fs');
const geoCode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

//running the port for heroku if it doesn't exist we will run the default 3000
const port =process.env.PORT ||  3000;

const publicPath = path.join(__dirname, '../public/');
//express will always look for the folder named: views but we can rewrite it and rename it to say: templates
const renamedViews = path.join(__dirname, '../templates/views');
//partials path
const partialsPath = path.join(__dirname, '../templates/partials');

//Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', renamedViews);
hbs.registerPartials(partialsPath);

console.log(publicPath)
app.use(express.static(publicPath))

//main page
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Lisa'
    });
})

//about page
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        role: 'Software Dev',
        name: 'lisa'
    });
});


//help page
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help page',
        message: 'Please contact us with your questions',
        name: 'lisa'
    });
});

//weather page
app.get('/weather', (req, res) => {

    if (!req.query.address) {
        return res.send({
            error: 'Please provide an address'
        });
    }

    geoCode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {

            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            });

            console.log(forecastData);
            console.log(location);
        })
    });
})


//help error
app.get('/help/*', (req, res) => {
    res.render('errors', {
        title: 'articel not found',
        errMessage: 'Help Articel not found',
        name: 'lisa'
    });
});

//error
app.get('*', (req, res) => {
    res.render('errors', {
        title: 'error 404 page not found',
        errMessage: 'Page not found',
        name: 'lisa'
    });
});



app.listen(port, () => {
    console.log('server is up an runnin' + port);
});

