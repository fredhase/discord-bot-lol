const axios = require('axios').default;
const { RichEmbed } = require('discord.js');
const { riotAPIToken } = require('../config.json');

module.exports = {
    name: '!mastery',
    async execute(message, args){
        name = args.join(' ');

        try {
            const response = await axios.get(`https://br1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${name}?api_key=${riotAPIToken}`);
            const summoner = response.data;
            const summonerId = summoner.id;

            const result = await axios.get(`https://br1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${summonerId}?api_key=${riotAPIToken}`);
            const mastery = result.data[0];

            const championResult = await axios.get(`http://ddragon.leagueoflegends.com/cdn/6.24.1/data/en_US/champion.json`);
            const championInfo = Object.values(championResult.data.data);
            const champion = championInfo.find((champion) => champion.key === String(mastery.championId)); 
            const championIcon = await `https://cdn.communitydragon.org/latest/champion/${mastery.championId}/square.png`
            const lastPlayed = new Date(mastery.lastPlayTime);

            const embed = new RichEmbed();
            embed.setTitle(`Mastery of ${summoner.name}`);
            embed.setColor(0xff0000);
            embed.setThumbnail(championIcon);
            embed.addField('Summoner: ', summoner.name);
            embed.addField('Best Mastery Champion: ', champion.name, true);
            embed.addField('Mastery level: ', mastery.championLevel, true);
            embed.addField('Last time played: ', lastPlayed);

            message.channel.send(embed);
            // message.channel.send(champion);

        } catch(error){
            console.error(error);
        }
    }
};