require('dotenv').config();
const Discord = require('discord.js');
const client = new Discord.Client();
const request = require('request')
const axios = require('axios')

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
    if (msg.content === 'ping') {
        msg.reply('pong');
    }
    if (msg.author.bot) return;

    let mention = msg.mentions.users.first()
    if (mention) {
        getInsultAPI().then(res => msg.channel.send(`${mention}, ${res.data.insult}`))
    }

});

const getInsultAPI = async () => {
    try {
        return await axios.get('https://insult.mattbas.org/api/insult.json')
    } catch (error) {
        console.error(error)
    }
}
const TOKEN = process.env.TOKEN;

client.login(TOKEN);