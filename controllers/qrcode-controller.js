const createPath = require('../helpers/create-path')

const getQR = (request, response) => {
    response.render(createPath('qrcode'))
}
const qrRedirect = (request, response) => {
    response.redirect('/qrcode')
}

module.exports = { getQR, qrRedirect }