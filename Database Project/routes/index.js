const express = require('express')
const employee = require('./employee.js')
const customer = require('./customer.js')
const transfer = require('./transfer.js')
const branches = require('./branches.js')
const job = require('./job.js')
const location = require('./location.js')
const status = require('./status.js')
let auth = require('./auth.js')
let agencie = require('./agencie.js')
let moneyClass = require('./moneyClass.js')
const transferCategorie = require('./transferCategorie.js')
const payment = require('./payment.js')
const balance = require('./balance.js')
const transpherMoneyAmount = require('./transpherMoneyAmount.js')
const bankTrasfer = require('./bankTrasfer.js')
let router = express.Router();

router.use('/employee', employee);
router.use('/customer', customer);
router.use('/transfer', transfer);
router.use('/auth', auth);
router.use('/branches', branches);
router.use('/job', job);
router.use('/location', location);
router.use('/status', status);
router.use('/agencie', agencie);
router.use('/moneyClass', moneyClass);
router.use('/transferCategorie', transferCategorie);
router.use('/payment', payment);
router.use('/balance', balance);
router.use('/transpherMoneyAmount', transpherMoneyAmount);
router.use('/bankTrasfer', bankTrasfer);
module.exports = router;