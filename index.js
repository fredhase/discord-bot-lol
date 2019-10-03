const { discordToken } = require('./config.json');
const {  Client, Collection } = require('discord.js');

const fs = require('fs');
const client = new Client();
client.commands = new Collection();
const commandFiles = fs
    .readdirSync('./commands')
    .filter((file) => file.endsWith('.js'));

client.once('ready', () => {
    console.log('Ready!');
});

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.on('message', (message) => {
    const args = message.content.split(' ');
    const commandName = args.shift();

    if(!client.commands.has(commandName)) return;

    const command = client.commands.get(commandName);

    try {
        command.execute(message, args);
    } catch(error) {
        console.error(error);
        message.reply("There was an error trying to execute that command!");
    }
});

client.login(discordToken);