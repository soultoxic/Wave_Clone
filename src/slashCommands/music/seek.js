const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'seek',
  description: 'Seek the player',
  inVc: true,
  sameVc: true,
  player: true,
  current: true,
  options: [
    {
      name: 'position',
      description: 'New position of the player',
      type: ApplicationCommandOptionType.Number,
      required: true,
      min_value: 0,
    },
  ],
  run: (client, interaction) => {
    const player = client.poru.players.get(interaction.guild.id);
    if (interaction.user.id !== player.currentTrack.info.requester.id)
      return interaction.reply({ content: `You are not allowed to use this command now as the song is played by another user`, ephemeral: true });

    const position = interaction.options.getNumber('position', true);

    if (!player.currentTrack.info.isSeekable) {
      const embed = new EmbedBuilder()
        .setColor('#FF3386')
        .setDescription('Track is not seekable');

      interaction.reply({
        embeds: [embed],
      });
    } else {
      player.seekTo(position * 1000);

      const embed = new EmbedBuilder()
        .setColor('#FF3386')
        .setDescription(`Seeked to ${position}`);

      return interaction.reply({
        embeds: [embed],
      })
    }
  },
};