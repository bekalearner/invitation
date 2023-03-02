const Guest = require('../models/guest')
const client = require('../helpers/whatsapp-client')

const resendInvitation = (request, response) => {
  const { id } = request.body

  Guest
    .findById(id)
    .then(async (guest) => {
      let message = ''
      const number = guest.phoneNumber.slice(1)
      const link = `${guest.link}/invitation/${guest.lang}/${guest._id}`
      const chatId = await client.getNumberId(number)

      if (guest.lang === 'kg') {
        message = `Кубанычыбызга шериктеш болуп 😊, чакыруубузду кабыл алыңыз . Бисмиллях 💐👇 \n\n${link}`
      } else if (guest.lang == 'ru') {
        message = `Разделите с нами радость неповторимого для нас дня 😊 – дня свадьбы наших детей 💐👇 \n\n${link}`
      }
                  
      if (chatId) { 
        await client.sendMessage(chatId._serialized, message)
      }
      else { console.log(number, 'Mobile is not registered') }

      response.status(200).json({status: 'Success'})
    })
    
}

module.exports = { resendInvitation }
