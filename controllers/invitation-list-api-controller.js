const Guest = require('../models/guest')
const client = require('../helpers/whatsapp-client')

const resendInvitation = (request, response) => {
  const { id } = request.body

  Guest
    .findById(id)
    .then(async (guest) => {
      const number = guest.phoneNumber.slice(1)
      const link = `${guest.link}/invitation/${guest.lang}/${guest._id}`
      const chatId = await client.getNumberId(number)
                  
      if (chatId) { await client.sendMessage(chatId._serialized, link) }
      else {console.log(number, 'Mobile is not registered')}

      response.status(200).json({status: 'Success'})
    })
    
}

module.exports = { resendInvitation }
