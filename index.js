
// 1. Coffee listing
// / - shows the total number of orders and the total amount spent /orders - lists the kinds of coffee orders and the totals for each /orders/:kind 
//- shows all the coffee orders matching that kind (e.g., "espresso")

// 2. Product Listing
// / - shows all products /sale - shows only products on sale

const http = require('http')
const express = require('express')
const morgan = require("morgan")
const helmet = require("helmet")
const logger = morgan("tiny")

const app = express()
const server = http.createServer(app)

app.use(logger)
app.use(helmet())

const port = 3025;
const host = 'localhost';

app.use(express.static("public"))

// Needed for Templates 
const es6Renderer = require('express-es6-template-engine');
app.engine('html', es6Renderer);
app.set('views', 'templates');
app.set('view engine', 'html');

const coffee = require('/Users/robfoss/DigitalCrafts/JSReboot/2020-10-Immersive/07-forms-organization/coffee.json')
const controllers = require('./controllers');

app.get('/', controllers.home);
app.get('/orders', controllers.ordersList);
app.get('/orders/:orderType', controllers.orderDetails);
// Needed for templates rendering
// app.get('/orders',);

// app.get('/orders/:kind')

//catch all if website doesn't
app.get('*', (req, res) => {
    res.status(404).send('<h1>Page not found</h1>');
});

server.listen(port, host, () => {
    console.log(`Running on host: port`)
})
