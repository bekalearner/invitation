const express = require('express')
const { postInvitationGenerator } = require('../controllers/invitation-generator-api-controller')

const router = express.Router()

router.post('/api', postInvitationGenerator)

module.exports = router