const express = require('express')
const { getByID } = require('../controllers/agencie');
//import {test} from '../controllers/agencie'
const test = require('../controllers/agencie').test;
const getAll = require('../controllers/agencie').getAll;
const add = require('../controllers/agencie').add;
const getAgencie = require('../controllers/agencie').getAgencie;
let router = express.Router();

router.get('/test', test.controller)
router.get('/',getAll.controller)
router.post('/',add.controller)
router.get('/:id',getAgencie)
module.exports = router;