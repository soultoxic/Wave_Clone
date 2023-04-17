const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'stop',
  description: 'stop the player and clears the queue',
  inVc: true,
  sameVc: true,
  player: true,
  run: (client, interaction) => {
    const player = client.poru.players.get(interaction.guild.id);
    if (interaction.user.id !== player.currentTrack.info.requester.id)
      return interaction.reply({ content: `You are not allowed to use this command now as the song is played by another user`, ephemeral: true });
    player.destroy();

    const embed = new EmbedBuilder()
      .setColor('#FF3386')
      .setDescription(':checkmark: | Player has been: `\`\STOPED\``.');

    interaction.reply({ embeds: [embed] });
  },
};
