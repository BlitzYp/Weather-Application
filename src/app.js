// Imports
const express = require('express');
const path = require('path');
const hbs = require('hbs');
const weather = require("./utils/weather");
const geocode = require("./utils/gcode");

//Project variables
const app = express();
const temp = path.join(__dirname, "../templates/views");
const partials = path.join(__dirname, '../templates/partials');
const port = process.env.PORT || 3000;
// App configs
app.use(express.static(path.join(__dirname, '../public')));
app.set('view engine', 'hbs');
app.set('views', temp);
hbs.registerPartials(partials);

// Routes
app.get('/', (req, res) => {
    const info = {
        title: 'Weather application',
        name: 'BlitzYp'
    }
    res.render('index', info);
});

//About
app.get('/about', (req, res) => {
    const info = {
        title: 'About me',
        info: 'see weather'
    }
    res.render('about', info);
});

//Help
app.get('/help', (req, res) => {
    const info = {
        title: 'Help',
        contact: 'BlitzYp',
        help: "Need some help?"
    }
    res.render('help', info);
});

//Weather

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        const error = {
            message: `Please provide a location!`,
            type: '404'
        }
        return res.send(JSON.stringify(error))
    }
    geocode(req.query.address, (e, ginfo) => {
        if (e) {
            const error = {
                type: "404",
                message: e
            }
            return res.send(JSON.stringify(error))
        }
        const { lon, lat, loc } = ginfo;
        weather(lon, lat, (err, data = {}) => {
            if (err) {
                return res.send(JSON.stringify({ type: "404", message: `${err}` }));
            }
            const result = {
                forecast: data,
                address: req.query.address,
                location: loc
            }
            return res.send(JSON.stringify(result));
        })
    })
});


//Error pages

// Error page for help
app.get('/help/*', (req, res) => {
    const info = {
        type: '404',
        message: 'Could not find that help article'
    }
    res.render('error', info);
})

// 404 Page
app.get('*', (req, res) => {
    // * - All that hasn't been mentioned before
    const error = {
        type: '404',
        message: 'Page not found'
    }
    res.render('error', error);
})

app.listen(port, console.log(`Server running on port ${port}`))