const Guest = require('../models/guest')
const client = require('../helpers/whatsapp-client')

const postInvitationGenerator = (request, response) => {
    const {name, phoneNumber, pronoun, lang} = request.body

    Guest
      .find()
      .then(guests => {
        new Promise ((resolve, reject) => {
          guests.forEach(guest => {
            if (guest.name.trim() == name.trim() && guest.phoneNumber == phoneNumber) {
              reject()
            }
          })
          resolve()
        })
        .then(() => {
          new Promise (async (resolve, reject) => {
            const whatsappNumber = await client.getNumberId(phoneNumber.slice(1))
            
            if (whatsappNumber){
              resolve()
            }

            reject()

          })
            .then(() => {
              const invitation = new Guest({name, phoneNumber, pronoun, lang})
              invitation
                .save()
                .then(async guest => {
                  const number = guest.phoneNumber.slice(1)
                  const link = `http//:localhost:3000/invitation/${guest.lang}/${guest._id}`
                  const chatId = await client.getNumberId(number)
                  
                  if (chatId) { await client.sendMessage(chatId._serialized, link) }
                  else {console.log(number, 'Mobile is not registered')}
                  
                  response.status(200).json({status: 'success'})
                })
                .catch( error => console.log(error))
            })
            .catch(() => {
              response.status(404).json({status: 'fail'})
            })
        })
        .catch(() => {
          response.status(300).json({status: 'fail'})
        })
      })
}

module.exports = { postInvitationGenerator }