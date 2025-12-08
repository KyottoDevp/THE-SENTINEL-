const {
    SlashCommandBuilder,
    ModalBuilder,
    TextInputBuilder,
    TextInputStyle,
    ActionRowBuilder,
    ContainerBuilder,
    SectionBuilder,
    TextDisplayBuilder,
    ThumbnailBuilder,
    MessageFlags
} = require('discord.js');
const SuggestionConfig = require('../../database/models/suggestionConfig.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('sugerir')
        .setDescription('Abre um formulário para enviar uma sugestão ao servidor.'),

    async execute(interaction) {
        // 1. Verificação de Configuração do Servidor
        const config = await SuggestionConfig.findOne({ guildId: interaction.guild.id });

        // Design de Erro Polido (Container V2)
        if (!config || !config.active || !config.channelId) {
            const containerErro = new ContainerBuilder()
                .setAccentColor(0xED4245) // Vermelho Discord
                .addSectionComponents(
                    new SectionBuilder()
                    .addTextDisplayComponents(
                        new TextDisplayBuilder().setContent("## 🚫 Sistema Indisponível\n\nO sistema de sugestões ainda não foi configurado ou está desativado neste servidor.\n\n> **Para Administradores:**\n> Utilize o comando `/sugestao-config` para definir um canal e ativar o sistema.")
                    )
                );

            return interaction.reply({
                components: [containerErro],
                flags: MessageFlags.Ephemeral | MessageFlags.IsComponentsV2
            });
        }

        // 2. Verificação se o Canal ainda existe
        const canalSugestao = interaction.guild.channels.cache.get(config.channelId);
        if (!canalSugestao) {
            const containerCanalInvalido = new ContainerBuilder()
                .setAccentColor(0xFFA500) // Laranja
                .addSectionComponents(
                    new SectionBuilder()
                    .addTextDisplayComponents(
                        new TextDisplayBuilder().setContent("## ⚠️ Canal Não Encontrado\n\nO canal configurado para sugestões parece ter sido deletado.\nPor favor, contate um administrador para reconfigurar o sistema.")
                    )
                );
            return interaction.reply({
                components: [containerCanalInvalido],
                flags: MessageFlags.Ephemeral | MessageFlags.IsComponentsV2
            });
        }

        // 3. Criação do Modal Avançado
        // Usamos Modal para permitir textos longos e organizados
        const modal = new ModalBuilder()
            .setCustomId('sugestao_enviar_modal')
            .setTitle('Nova Sugestão');

        const inputSugestao = new TextInputBuilder()
            .setCustomId('input_conteudo_sugestao')
            .setLabel('Qual a sua ideia?')
            .setStyle(TextInputStyle.Paragraph)
            .setPlaceholder('Descreva sua sugestão detalhadamente aqui...')
            .setMinLength(10)
            .setMaxLength(3000) // Limite generoso
            .setRequired(true);

        const actionRow = new ActionRowBuilder().addComponents(inputSugestao);
        modal.addComponents(actionRow);

        // 4. Exibir o Modal
        await interaction.showModal(modal);
    }
};
