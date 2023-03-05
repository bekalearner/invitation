const { Client} = require('whatsapp-web.js');
const client = new Client({
  puppeteer: {headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-extensions']}
});

client.initialize()

module.exports = client