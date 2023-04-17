const { EmbedBuilder, version } = require('discord.js');
const os = require('os');

module.exports = {
  name: 'stats',
  description: 'shows bot stats',
  inVc: false,
  run: (client, interaction) => {

    function formatBytes(bytes = number) {
        if (bytes === 0) return "0 B";
        const sizes = ["B", "KB", "MB", "GB", "TB"];
        return `${(
            bytes / Math.pow(1024, Math.floor(Math.log(bytes) / Math.log(1024)))
        ).toFixed(2)} ${sizes[Math.floor(Math.log(bytes) / Math.log(1024))]}`;
    }

    const osType = os.type();
    const totalMem = os.totalmem();
    const freeMem = os.freemem();
    const usedMem = totalMem - freeMem;
    const cpuArch = os.arch();
    const cpuCores = os.cpus().length;
    let totalSeconds = interaction.client.uptime / 1000;
    let hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = Math.floor(totalSeconds % 60);

    let uptime = `${hours}:${minutes}:${seconds}`;

    const embed = new EmbedBuilder()
    .setAuthor({ name: "Wave - Stats", iconURL: 'https://images-ext-1.discordapp.net/external/i17_zIuSHc7zkwKagRT7PlGD-f_Dv0cew0GWDfVd1sc/%3Fsize%3D1024/https/cdn.discordapp.com/avatars/888315853127426118/1d9547d6180633f4d18137bc0faa64e0.png?width=415&height=415', url: `https://discord.com/oauth2/authorize?client_id=987979787496742942&permissions=414467840320&scope=bot%20applications.commands` })
    .setThumbnail('https://images-ext-1.discordapp.net/external/i17_zIuSHc7zkwKagRT7PlGD-f_Dv0cew0GWDfVd1sc/%3Fsize%3D1024/https/cdn.discordapp.com/avatars/888315853127426118/1d9547d6180633f4d18137bc0faa64e0.png?width=415&height=415')
    .addFields(
        { name: `GENERAL::`, value: `\`\`\`asciidoc
↳ Version :: ${version}
↳ Shards :: 0/1
↳ Clusters :: 0/1
↳ Servers :: ${client.guilds.cache.size}
　 ↳ Users :: ${client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)}
　 ↳ Players :: 0\`\`\`` },
        { name: `STATISTICS :: `, value: `\`\`\`asciidoc
↳ Node.js :: v${process.versions.node}
↳ Memory Usage :: ${formatBytes(usedMem)} / ${formatBytes(totalMem)} MB
↳ Uptime :: ${uptime}
↳ Platform :: ${osType}
↳ Cpu :: ${cpuArch} (${cpuCores}\`\`\``, },
    )
    .setColor('#FF3386')

    return interaction.reply({
      embeds: [embed],
    });
  },
};
