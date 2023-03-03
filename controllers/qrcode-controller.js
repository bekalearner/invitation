const createPath = require('../helpers/create-path')

const getQR = (request, response) => {
    response.render(createPath('qrcode'))
}

module.exports = { getQR }