const { successMsg, warnMsg } = require('../helpers/terminal-chalk')
const QRCode = require("qrcode")
const client = require('../helpers/whatsapp-client')

let clientQRcode
let clientStatus

client.on('qr', qr => {
    QRCode.toString(qr, {errorCorrectionLevel: 'H', type: 'svg'}, (err, qrcode) => {
        if (err) throw err
        clientQRcode = qrcode
    })
    console.log(warnMsg('Waiting for client connection'))
    clientStatus = false
})

client.on('ready', () => {
    console.log(successMsg('Client is ready!'))
    clientStatus = true
})

const qrGen = (request, response) => {
    response.json({qrcode: clientQRcode, status: clientStatus})
}

module.exports = qrGen