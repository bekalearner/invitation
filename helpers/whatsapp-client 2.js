const { Client} = require('whatsapp-web.js');
const { successMsg } = require('./terminal-chalk')
const client = new Client({
    puppeteer: {headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-extensions']}
  });

client.on('ready', () => {
    console.log(successMsg('Client is ready!'))
});

client.initialize()

module.exports = client