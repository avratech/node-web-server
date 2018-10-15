const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var company = "AvraTech Node-site";

var app = express();

hbs.registerPartials(__dirname + '/views/partials');

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.set('view_engine', 'hbs');

app.listen(9000, ()=>{
    console.log('Webserver is up and listening @ 9000');
});

// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
//     // no need to call next here as we want the app to stop here.
// });

app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
    var logTime = new Date().toUTCString();
    var logMsg = `${logTime}: ${req.method} ${req.url}`;
    console.log(logMsg);
    fs.appendFileSync('server.log', logMsg + '\n');
    next();
});

app.get('/', (req, res) => {
    res.render('index.hbs', {
        company: `${company}: Text to MP3 Generator`,
    });
});

app.get('/about', (req,res) => {
    res.render('about.hbs', {
        company: `${company}: About`,
        pageTitle: "About Page",
    });
});

app.get('/bad', (req,res) => {
    res.send({
        error_code: 666,
        error_msg: "Really bad request, grow up!"
    });
});
