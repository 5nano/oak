const router = require('express')();
const login = require('./login');

router.use('/login', login)

module.exports = router;