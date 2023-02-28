const express = require('express')
const { getInvitationGenerator, postInvitationGenerator } = require('../controllers/invitation-generator-controller')

const router = express.Router()

router.get('/', getInvitationGenerator)

router.post('/', postInvitationGenerator)

module.exports = router