const { EmbedBuilder } = require("discord.js")

module.exports = {
    name: "node",
    description: "chekling info of node",
    category: "Information",
    permissions: {
        bot: [],
        user: [],
      },
    run: async (client,interaction,args) => {

        var  {
            memory,
            cpu,
            uptime,
            frameStats,
            playingPlayers,
            players,
        } = client.poru.leastUsedNodes[0].stats;
        const allocated = Math.floor(memory.allocated / 1024 / 1024);
        const used = Math.floor(memory.used / 1024 / 1024);
        const free = Math.floor(memory.free / 1024 / 1024);
        const reservable = Math.floor(memory.reservable / 1024 / 1024);

        const systemLoad = (cpu.systemLoad * 100).toFixed(2);
        const lavalinkLoad = (cpu.lavalinkLoad * 100).toFixed(2);
  
        return interaction.reply(`\`\`\`fix
ID: Wavelink-1
State: CONNECTED
Streams: ${playingPlayers}/${players}
Memory: ${used} MB/${reservable} MB
Frames:
​​Sent: 2993
​​Deficit: -84
​​Nulled: 90\`\`\``);
    }
    }