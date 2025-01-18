const express = require('express')
const {login} = require('../controllers/auth');
let router = express.Router();

router.get('/login', login);

module.exports = router;