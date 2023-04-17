const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, Client } = require('discord.js');
const ms = require('ms');

/**
 * @param {Client} client 
 */

module.exports.run = async (client, player, track) => {
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const row = new ActionRowBuilder()
    .addComponents(
      new ButtonBuilder()
        .setCustomId('loop')
        .setEmoji(`🔁`)
        .setStyle(ButtonStyle.Secondary),

      new ButtonBuilder()
        .setCustomId('volume-')
        .setEmoji(`🔉`)
        .setStyle(ButtonStyle.Danger),

      new ButtonBuilder()
        .setCustomId('p/p')
        .setEmoji(`▶`)
        .setStyle(ButtonStyle.Secondary),

      new ButtonBuilder()
        .setCustomId('volume+')
        .setEmoji(`🔊`)
        .setStyle(ButtonStyle.Success),

      new ButtonBuilder()
        .setCustomId('skip')
        .setEmoji(`⏭`)
        .setStyle(ButtonStyle.Secondary),
    );

    const titles = track.info.title.length > 15 ? track.info.title.substr(0, 15) + "..." : track.info.title;

  const embed = new EmbedBuilder()
    .setAuthor({ name: `Now Playing` })
    .setColor('#FF3386')
    .setDescription(`[${titles}](${track.info.uri}) [${track.info.requester}]`);

  const channel = client.channels.cache.get(player.textChannel)
  await channel?.send({ embeds: [embed] })
};