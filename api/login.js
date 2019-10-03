const router = require('express')();

router.post('/', (req, res, next) => {
    console.log(req.headers.origin);
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.cookie('ssid', 'mockedvalue', { maxAge: 1000*60*10, httpOnly : false });
    res.status(200).send();
})

module.exports = router;