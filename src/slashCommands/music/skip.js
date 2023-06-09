const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'skip',
  description: 'Lets you skip the current song',
  inVc: true,
  sameVc: true,
  player: true,
  run: (client, interaction) => {
    const player = client.poru.players.get(interaction.guild.id);
    if (interaction.user.id !== player.currentTrack.info.requester.id)
      return interaction.reply({ content: `You are not allowed to use this command now as the song is played by another user`, ephemeral: true });
    player.stop();

    const embed = new EmbedBuilder()
      .setColor('#FF3386')
      .setDescription(':checkmark: | Current track has been: `\`\SKIPED\``.');

    interaction.reply({ embeds: [embed] });
  },
};
