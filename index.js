
const template = require('./template');
const express = require('express');
const expressStaticGzip = require('express-static-gzip');
const manifest = require('./dist/manifest');
const helmet = require('helmet')
const http = require('http');
const fs = require('fs');


const app = express();

app.use(helmet());


app.use("/dist", expressStaticGzip("./dist", {
    enableBrotli: true,
    orderPreference: ['br']
}));

app.use("/assets", expressStaticGzip("./dist/assets", {
    enableBrotli: true,
    orderPreference: ['br']
}));

app.use('/', (req, res) => {
    res.send(template('Oak', manifest));
});

var httpServer = http.createServer(app);

httpServer.listen(8081);

console.log(`http serving on 8081\n`);

module.exports = app;