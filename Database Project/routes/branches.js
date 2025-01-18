const express = require('express');
const { getByID } = require('../controllers/branches');
//import {test} from '../controllers/branches'
const test = require('../controllers/branches').test;
const getAll = require('../controllers/branches').getAll;
const add = require('../controllers/branches').add;
const getBranche = require('../controllers/branches').getBranche;
let router = express.Router();

router.get('/test', test.controller)
router.get('/',getAll.controller)
router.post('/',add.controller)
router.get('/:id',getBranche)

module.exports = router;