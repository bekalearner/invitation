const express = require('express')
const { getInvitationGenerator} = require('../controllers/invitation-generator-controller')

const router = express.Router()

router.get('/', getInvitationGenerator)

module.exports = router