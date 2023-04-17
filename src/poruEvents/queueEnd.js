const { EmbedBuilder } = require("discord.js")

module.exports.run = async (client, player, message) => {
  const channel = client.channels.cache.get(player.textChannel);
  if (!channel) return;
    const link = "https://discord.gg/PHTDKZxBYr"
const trackend = new EmbedBuilder()
  .setColor('#FF3386')
  .setAuthor({ name: `All songs have been played 😊` })
  .setDescription(`i have played every song Queued! Enjoying music with me? Vote me on Top.gg: [Top.gg](https://top.gg/bot/987979787496742942/vote) 
  
  Checkout our [premium](${link}) for some amazing features`)
  .setFooter({ text: 'Made by SOULCOSMIC#2997 with 💓' })
  .setTimestamp()
channel?.send({ embeds: [trackend] })
player.destroy();
};
