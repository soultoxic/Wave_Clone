const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'play',
  description: 'Loads and plays playlists/track from search query',
  inVc: true,
  sameVc: true,
  options: [
    {
      name: 'query',
      type: ApplicationCommandOptionType.String,
      description: 'song name/url to play',
      required: true,
      autocomplete: true
    },
  ],
  run: async (client, interaction) => {
    await interaction.deferReply();

    const player = client.poru.createConnection({
      guildId: interaction.guildId,
      voiceChannel: interaction.member.voice.channelId,
      textChannel: interaction.channel.id,
      deaf: true,
    });

    const resolve = await client.poru.resolve(
      interaction.options.getString('query', true),
    );

    const { loadType, tracks, playlistInfo } = resolve;
    if (loadType === 'PLAYLIST_LOADED') {
      for (const track of resolve.tracks) {
        track.info.requester = interaction.member;
        player.queue.add(track);
      }

      const embed = new EmbedBuilder()
        .setColor('#FF3386')
        .setDescription(
          `Queued \`${tracks.length}\` tracks from ${playlistInfo.name}`,
        );

      await interaction?.editReply({
        embeds: [embed],
      });
      if (!player.isPlaying && !player.isPaused) return player.play();
    } else if (loadType === 'SEARCH_RESULT' || loadType === 'TRACK_LOADED') {
      const track = tracks.shift();
      track.info.requester = interaction.member;

      player.queue.add(track);

      const titles = track.info.title.length > 30 ? track.info.title.substr(0, 30) + "..." : track.info.title;

      const embed = new EmbedBuilder()
        .setColor('#FF3386')
        .setDescription(`Queued [${titles}](${track.info.uri}) [${interaction.member}]`);

      await interaction.editReply({
        embeds: [embed],
      });
      if (!player.isPlaying && !player.isPaused) return player.play();
    } else {
      return interaction.editReply(
        'There were no results found for your query.',
      );
    }
  },
};
