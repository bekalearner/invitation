const Guest = require('../models/guest')
const createPath = require('../helpers/create-path')

const getInvitationRU = (request, response) => {
    Guest
    .findById(request.params.id)
    .then( invitation => response.render(createPath('invitation_ru'), {invitation}))
    .catch( error => console.log(error))
}
const getInvitationKG = (request, response) => {
    Guest
      .findById(request.params.id)
      .then( invitation => response.render(createPath('invitation_kg'), {invitation}))
      .catch( error => console.log(error))
}

module.exports = { getInvitationRU, getInvitationKG }