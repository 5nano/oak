
const template = require('./template');
const express = require('express');
const expressStaticGzip = require('express-static-gzip');
const manifest = require('./dist/manifest');
const helmet = require('helmet')
const http = require('http');
const fs = require('fs');


const app = express();

app.use(helmet());

const port = 8086;
const cdnPath = `http://localhost:${port}`;

app.use("/dist", expressStaticGzip("./dist", {
    enableBrotli: true,
    orderPreference: ['br']
}));

app.use("/assets", expressStaticGzip("./dist/assets", {
    enableBrotli: true,
    orderPreference: ['br']
}));

app.use((req, res) => {
    res.send(template('Oak', manifest, cdnPath));
});

var httpServer = http.createServer(app);


httpServer.listen(port);

console.log(`http serving on ${port}\n`);

module.exports = app;
