const React = require('react');
module.exports = (title, manifest, cdnPath) => {     
    console.log(manifest);
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <link rel="shortcut icon" href="/assets/ico/favicon.ico">
        <title>${title}</title>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no" />
        <link rel="preload" href="https://fonts.gstatic.com/s/roboto/v19/KFOmCnqEu92Fr1Mu7GxKKTU1Kvnz.woff2" as="font">
        <link rel="preload" href="https://fonts.gstatic.com/s/roboto/v19/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2" as="font">
        ${
            Object.keys(manifest)
                .filter(asset => manifest[asset].endsWith('.css'))
                .map(asset => `<link href="${cdnPath}/dist/${manifest[asset]}" rel="stylesheet">`)
                .join(' ')
        }
    </head>
    <body>
        <div id="app-root"></div>
        ${
            Object.keys(manifest)
                .filter(asset => manifest[asset].endsWith('.js'))
                .map(asset => `<script type="text/javascript" src="${cdnPath}/dist/${manifest[asset]}"></script>`)
                .join(' ')
        }
    </body>
    </html>
`};
