module.exports.run = async (client, player) => {
    if (!player) return;

    if (player.message) await player.message.delete();

    if (!player.currentTrack) return;

    if (player.autoplay === true) {
        try {
            const trackSearch = player.currentTrack.info;

            const ytLink = /^(https?:\/\/)?(www\.)?(m\.)?(music\.)?(youtube\.com|youtu\.?be)\/.+$/gi.test(trackSearch.uri);

            if (ytLink) {
                const source = client.config.playSource;
                const identifier = trackSearch.identifier;
                const search = `https://youtube.com/watch?v=${identifier}&list=RD${identifier}`;
                const res = await client.poru.resolve(search, ytsearch);

                for (const track of res.tracks) {
                    track.info.requester = trackSearch.requester;
                }

                await player.queue.add(res.tracks[Math.floor(Math.random() * res.tracks.length) ?? 2]);
            }
        } catch (error) {
        }
    }
};