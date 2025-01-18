const express = require('express')
const { getByID } = require('../controllers/transferCategorie');
//import {test} from '../controllers/transferCategorie'
const test = require('../controllers/transferCategorie').test;
const getAll = require('../controllers/transferCategorie').getAll;
const add = require('../controllers/transferCategorie').add;
const getTransferCategorie = require('../controllers/transferCategorie').getTransferCategorie;
let router = express.Router();

router.get('/test', test.controller)
router.get('/',getAll.controller)
router.post('/',add.controller)
router.get('/:id',getTransferCategorie)
module.exports = router;