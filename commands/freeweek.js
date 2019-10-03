const axios = require('axios').default;
const { RichEmbed } = require('discord.js');
const { riotAPIToken } = require('../config.json');

module.exports = {
    name: '!freeweek',
    async execute(message, args){

        try {
            const response = await axios.get(`https://br1.api.riotgames.com/lol/platform/v3/champion-rotations?api_key=${riotAPIToken}`);
            const championIds = response.data.freeChampionIds;

            const championResult = await axios.get(`http://ddragon.leagueoflegends.com/cdn/6.24.1/data/en_US/champion.json`);
            const allChampions = Object.values(championResult.data.data);

            getChampion = (id) => {
                return allChampions.find((champion) => champion.key === String(id));
            }

            championIds.forEach((id) => {
                const champion = getChampion(id);
                const embed = new RichEmbed();

                embed.setTitle('Free Champion of the week');
                embed.setThumbnail(`https://cdn.communitydragon.org/latest/champion/${id}/square.png`);
                embed.setColor(0x0000ff);
                embed.addField('Champion: ', champion.name, true);
                embed.addField('Title: ', champion.title, true);
                embed.addField('Role(s): ', champion.tags.join(', '));
                embed.addField('Champion Status', 'Values range from 1 to 10');
                embed.addField('Attack: ', champion.info.attack, true);
                embed.addField('Defense: ', champion.info.defense, true);
                embed.addField('Magic: ', champion.info.magic, true);
                embed.addField('Difficulty: ', champion.info.difficulty, true);

                message.channel.send(embed);
            });
        }catch(error){
            console.error(error);
        }
    }
};