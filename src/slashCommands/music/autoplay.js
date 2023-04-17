const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "autoplay",
    description: "Autoplay random related song/s.",
    category: "Utility",
    inVc: true,
    sameVc: true,
    player: true,
    current: true,
    run: async (client, interaction) => {
        await interaction.deferReply({ ephemeral: false });

        const player = client.poru.players.get(interaction.guild.id);

        const currentsong = player.currentTrack.info;

        const ytLink = /^(https?:\/\/)?(www\.)?(m\.)?(music\.)?(youtube\.com|youtu\.?be)\/.+$/gi.test(currentsong.uri);

        if (!ytLink) {
            const embed = new EmbedBuilder().setDescription(`Autoplay feature is avail only in YouTube!`).setColor('#FF3386');

            return interaction.editReply({ embeds: [embed] });
        }

        if (player.autoplay === true) {
            player.autoplay = false;

            await player.queue.clear();

            const embed = new EmbedBuilder().setDescription(`Autoplay has been: \`Disabled\``).setColor('#FF3386');

            return interaction.editReply({ embeds: [embed] });
        } else {
            player.autoplay = true;

            if (ytLink) {
                const source = "ytsearch";
                const identifier = currentsong.identifier;
                const search = `https://music.youtube.com/watch?v=${identifier}&list=RD${identifier}`;
                const res = await client.poru.resolve(search, source);

                for (const track of res.tracks) {
                    track.info.requester = currentsong.requester;
                }

                await player.queue.add(res.tracks[Math.floor(Math.random() * res.tracks.length) ?? 10]);

                const embed = new EmbedBuilder().setDescription(`Autoplay has been: \`Enabled\``).setColor('#FF3386');

                return interaction.editReply({ embeds: [embed] });
            }
        }
    },
};