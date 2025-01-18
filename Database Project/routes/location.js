const express = require('express');
const { getByID } = require('../controllers/location');
//import {test} from '../controllers/location'
const test = require('../controllers/location').test;
const getAll = require('../controllers/location').getAll;
const add = require('../controllers/location').add;
const getLocation = require('../controllers/location').getLocation;
let router = express.Router();

router.get('/test', test.controller)
router.get('/',getAll.controller)
router.post('/',add.controller)
router.get('/:id',getLocation)

module.exports = router;