const QRCode = require("qrcode")
const client = require('../helpers/whatsapp-client')

let clientQRcode

client.on('qr', qr => {
    QRCode.toString(qr, {errorCorrectionLevel: 'H', type: 'svg'}, (err, qrcode) => {
        if (err) throw err
        clientQRcode = qrcode
    })
})

const qrGen = (request, response) => {
    response.json({qrcode: clientQRcode})
}

module.exports = qrGen