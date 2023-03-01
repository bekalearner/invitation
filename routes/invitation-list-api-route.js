const express = require('express')
const { resendInvitation } = require('../controllers/invitation-list-api-controller')

const router = express.Router()

router.post('/api/list', resendInvitation)

module.exports = router