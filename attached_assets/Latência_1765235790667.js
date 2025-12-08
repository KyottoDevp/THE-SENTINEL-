const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Verifica a latência do bot e a conexão com a API.')
    .setDMPermission(false),

  async execute(interaction) {
    const botMember = interaction.guild.members.me;
    const missingPermissions = [];

    if (!botMember.permissionsIn(interaction.channel).has(PermissionFlagsBits.SendMessages)) {
      missingPermissions.push('Send Messages');
    }
    if (!botMember.permissionsIn(interaction.channel).has(PermissionFlagsBits.ViewChannel)) {
      missingPermissions.push('View Channel');
    }

    // ---------- ERROR: Missing bot permissions ----------
    if (missingPermissions.length > 0) {
      const embedPerms = new EmbedBuilder()
        .setColor(0xFF5555)
        .setTitle("<:Icon_Moderation:1427138768338681856> Missing Permissions")
        .setThumbnail('https://iili.io/KumNYAb.png')
        .setDescription(
          `I do not have permission to send messages in this channel!\n\n` +
          `**Required Permissions:**\n${missingPermissions.map(p => `> - **${p}**`).join('\n')}`
        )
        .setFooter({
          text: "Hornet Moderation System",
          iconURL: 'https://iili.io/FWps6Yv.png'
        })
        .setTimestamp();

      return interaction.reply({ embeds: [embedPerms], ephemeral: true });
    }

    // ---------- CALCULATING LATENCY ----------
    const start = Date.now();
    const msg = await interaction.reply({ content: '<:Icon_Moderation:1427138768338681856> Calculating ping...', fetchReply: true, ephemeral: true });
    const apiLatency = Date.now() - start;
    const wsLatency = interaction.client.ws.ping;

    // ---------- UPTIME FORMATTED ----------
    const totalSeconds = Math.floor(interaction.client.uptime / 1000);
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const uptime = [
      days > 0 ? `${days}d` : null,
      hours > 0 ? `${hours}h` : null,
      minutes > 0 ? `${minutes}m` : null,
      `${seconds}s`
    ].filter(Boolean).join(" ");

    // ---------- SUCCESS EMBED: Hornet Kick System ----------
    const embed = new EmbedBuilder()
      .setColor(3553599)
      .setDescription(
        `## <:Icon_Moderation:1427138768338681856> Hornet Ping System\n` +
        `- **WS Latency:** ${wsLatency}ms\n` +
        `- **API Latency:** ${apiLatency}ms\n` +
        `- **Uptime:** ${uptime}`
      )
      .setThumbnail('https://iili.io/KumNYAb.png')
      .setFooter({
        text: "Hornet Ping System",
        iconURL: "https://iili.io/Kl1JfOg.png"
      });

    await interaction.editReply({ content: null, embeds: [embed] });
  }
};
