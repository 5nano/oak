
const template = require('./template');
const express = require('express');
const expressStaticGzip = require('express-static-gzip');
const manifest = require('./dist/manifest');
const helmet = require('helmet')
const http = require('http');
const fs = require('fs');

const devMode = process.env.NODE_ENV === 'development';

const app = express();

app.use(helmet());

const port = process.env.PORT || 8086;
const cdnPath = devMode ? `http://localhost:${port}` : 'https://nanivo.herokuapp.com';

app.use("/dist", expressStaticGzip("./dist", {
    enableBrotli: true,
    orderPreference: ['br']
}));

app.use("/assets", expressStaticGzip("./dist/assets", {
    customCompressions: [{
        encodingName: 'deflate',
        fileExtension: 'gz'
    }],
}));

app.use((req, res) => {
    res.set({
        'Cache-Control': 31536000
    });
    res.send(template('Oak', manifest, cdnPath));
});

var httpServer = http.createServer(app);


httpServer.listen(port);

console.log(`http serving on ${port}\n`);

module.exports = app;
