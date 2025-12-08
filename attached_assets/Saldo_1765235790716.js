const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const Economia = require('../../database/models/economia.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('saldo')
    .setDescription('Exibe o saldo de Rosários e a sequência diária de um usuário.')
    .addUserOption(option =>
      option
        .setName('usuário')
        .setDescription('Veja o saldo de outro membro')
        .setRequired(false)
    ),

  async execute(interaction) {
    const alvo = interaction.options.getUser('usuário') || interaction.user;
    const servidor = interaction.guild;

    const registro = await Economia.findOne({ userId: alvo.id });

    // Caso o usuário ainda não tenha registro
    if (!registro) {
      return interaction.reply({
        content: `💸 ${alvo} ainda não possui **Rosários** registrados. Use **/recompensa** para começar a ganhar!`,
        ephemeral: true,
      });
    }

    // Formata saldo
    const saldo = registro.recompensa
      ? registro.recompensa.toLocaleString('pt-BR')
      : '0';

    const embed = new EmbedBuilder()
      .setColor('#F1C40F')
      .setDescription(
        `## 💰 SALDO ATUAL\n` +
        `<:Member:1427164040362197104> **Usuário:** ${alvo}\n` +
        `<:placa:1394887010900250766> **Saldo Disponível:** ${saldo} Rosários\n\n` +
        `📆 **Sequência Diária:** ${registro.streak || 0} dia(s)`
      )
      .setThumbnail(alvo.displayAvatarURL({ dynamic: true, size: 1024 }))
      .setFooter({
        text: 'Silksong Mobile Modding • Sistema de Economia',
        iconURL: servidor.iconURL({ dynamic: true, size: 1024 }),
      })
      .setTimestamp();

    await interaction.reply({ embeds: [embed], ephemeral: false });
  },
};
