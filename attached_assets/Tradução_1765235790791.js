// 📦 Importações principais do Discord.js
const {
  SlashCommandBuilder,
  ContainerBuilder,
  SectionBuilder,
  TextDisplayBuilder,
  ThumbnailBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  MessageFlags
} = require('discord.js');

module.exports = {
  // 🔧 Definição do comando
  data: new SlashCommandBuilder()
    .setName('systemtranslation')
    .setDescription('Anexa um painel interativo para traduzir uma mensagem específica.')
    .addStringOption(option =>
      option
        .setName('message_id')
        .setDescription('ID of the message to attach the translation to.')
        .setRequired(true)
    ),

  // 🚀 Função principal
  async execute(interaction) {
    const messageId = interaction.options.getString('message_id');

    // 📬 Busca a mensagem alvo
    let targetMessage;
    try {
      targetMessage = await interaction.channel.messages.fetch(messageId);
    } catch (error) {
      console.error('Erro ao buscar a mensagem:', error);
      return interaction.reply({
        content: '❌ I couldn\'t find that message in this channel. Please check the ID.',
        ephemeral: true
      });
    }

    // --- Construção dos Componentes ---

    const headerText = new TextDisplayBuilder()
      .setContent(`### <:icon_sparkle:1441118762806804490> Sentinel System Translations`);

    const bodyText = new TextDisplayBuilder()
      .setContent(`- You can translate this message into your language. Use the Translate button or choose your language below.`);

    const callToActionText = new TextDisplayBuilder()
      .setContent(`Click the button below to receive the translation`);

    const thumbnail = new ThumbnailBuilder()
      .setURL('https://iili.io/f2ePUAJ.png');

    const mainSection = new SectionBuilder()
      .addTextDisplayComponents(headerText, bodyText)
      .setThumbnailAccessory(thumbnail);

    // --- Botões Interativos (ActionRow + ButtonBuilder) ---

    const buttonsRow = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        // [CORREÇÃO APLICADA AQUI]
        .setCustomId('traduzir_mensagem') // Alterado de 'translate_message'
        .setLabel('Translate')
        .setEmoji('<:icon_edit:1441118743580377109>')
        .setStyle(ButtonStyle.Secondary),

      new ButtonBuilder()
        // [CORREÇÃO APLICADA AQUI]
        .setCustomId('traduzir_escolher_idioma') // Alterado de 'translate_choose_language'
        .setLabel('Choose your language')
        .setEmoji('<:traduzir:1441118827013210355>')
        .setStyle(ButtonStyle.Secondary)
    );

    // --- Container Principal (ContainerBuilder) ---

    const container = new ContainerBuilder()
      .setAccentColor(0xFFFFFF) // Branco
      .addSectionComponents(mainSection)
      .addTextDisplayComponents(callToActionText)
      .addActionRowComponents(buttonsRow);

    // ✅ Confirmação privada para quem executou o comando
    await interaction.reply({
      content: `✅ V2 system successfully attached to the message: [Jump to Message](${targetMessage.url})`,
      ephemeral: true
    });

    // 📤 Envio do container para a mensagem alvo
    await targetMessage.reply({
      components: [container],
      flags: MessageFlags.IsComponentsV2, // Obrigatório para renderizar V2
      allowedMentions: { repliedUser: false }
    });
  }
};
