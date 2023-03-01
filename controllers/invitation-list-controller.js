const Guest = require('../models/guest')
const createPath = require('../helpers/create-path')

const getInvitationList = (request, response) => {
    Guest
      .find()
      .then((data) => {
        guests = data.sort((a, b) => a.name.localeCompare(b.name))
        response.render(createPath('invitation_list'), { guests })
      })
    
}

module.exports = getInvitationList
