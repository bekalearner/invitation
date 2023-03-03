const express = require('express')
const { getQR } = require('../controllers/qrcode-controller')

const router = express.Router()

router.get('/qrcode', getQR)

module.exports = router