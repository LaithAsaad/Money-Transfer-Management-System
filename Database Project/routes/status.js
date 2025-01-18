const express = require('express');
const { getByID } = require('../controllers/status');
//import {test} from '../controllers/status'
const test = require('../controllers/status').test;
const getAll = require('../controllers/status').getAll;
const add = require('../controllers/status').add;
const getStatus = require('../controllers/status').getStatus;
let router = express.Router();

router.get('/test', test.controller)
router.get('/',getAll.controller)
router.post('/',add.controller)
router.get('/:id',getStatus)

module.exports = router;