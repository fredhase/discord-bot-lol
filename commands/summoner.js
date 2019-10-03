const axios = require('axios').default;
const { RichEmbed } = require('discord.js');
const { riotAPIToken } = require('../config.json');

module.exports = {
    name: '!summoner',
    async execute(message, args){
        name = args.join(' ');

        try {
            const response = await axios.get(`https://br1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${name}?api_key=${riotAPIToken}`);

            const summoner = response.data;
            const summonerIcon = await `http://ddragon.leagueoflegends.com/cdn/9.19.1/img/profileicon/${summoner.profileIconId}.png`;

            const embed = new RichEmbed();

            embed.setTitle('Summoner Basic Infos');
            embed.setColor(0xE5B851);
            embed.setThumbnail(summonerIcon);
            embed.addField('Summoner: ', summoner.name, true);
            embed.addField('Level: ', summoner.summonerLevel, true);

            message.channel.send(embed);
        } catch (error){
            console.error(error);
        }
    }
};