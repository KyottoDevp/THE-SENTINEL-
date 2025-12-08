const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const Economia = require('../../database/models/economia.js');

// IDs dos donos que podem usar o comando (adicione os seus aqui)
const DONOS = ['1423744686337822904', 'SEU_ID_AQUI']; 

module.exports = {
  data: new SlashCommandBuilder()
    .setName('adicionar')
    .setDescription('Adiciona uma quantia de moeda ao saldo de um usuário.')
    .addUserOption(option =>
      option
        .setName('usuário')
        .setDescription('Usuário que receberá os Rosários')
        .setRequired(true)
    )
    .addIntegerOption(option =>
      option
        .setName('quantia')
        .setDescription('Quantidade de Rosários a transferir')
        .setRequired(true)
    ),

  async execute(interaction) {
    const executor = interaction.user;

    // Verifica se o executor é dono
    if (!DONOS.includes(executor.id)) {
      return interaction.reply({
        content: '❌ Você não tem permissão para usar este comando.',
        ephemeral: true,
      });
    }

    const alvo = interaction.options.getUser('usuário');
    const quantia = interaction.options.getInteger('quantia');
    const servidor = interaction.guild;

    if (quantia <= 0) {
      return interaction.reply({
        content: '⚠️ A quantia deve ser maior que **0**.',
        ephemeral: true,
      });
    }

    // Busca ou cria registro do usuário no banco
    let registro = await Economia.findOne({ userId: alvo.id });

    if (!registro) {
      registro = new Economia({
        userId: alvo.id,
        userName: alvo.username,
        guildName: servidor.name,
        recompensa: quantia,
        streak: 0,
        lastClaim: new Date(),
      });
    } else {
      registro.recompensa += quantia; // adiciona saldo
    }

    await registro.save();

    // Embed da transferência
    const embed = new EmbedBuilder()
      .setColor('#2ECC71')
      .setDescription(
        `## 💎 TRANSFERÊNCIA DE STOCK\n` +
        `📤 **Executor:** ${executor}\n` +
        `📥 **Destinatário:** ${alvo}\n` +
        `💰 **Quantia Transferida:** ${quantia.toLocaleString('pt-BR')} Rosários\n\n` +
        `O valor foi adicionado com sucesso ao saldo de ${alvo}.`
      )
      .setThumbnail(alvo.displayAvatarURL({ dynamic: true, size: 1024 }))
      .setFooter({
        text: 'Silksong Mobile Modding • Banco Central do Sistema',
        iconURL: servidor.iconURL({ dynamic: true, size: 1024 }),
      })
      .setTimestamp();

    await interaction.reply({ embeds: [embed], ephemeral: false });
  },
};
