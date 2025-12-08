const {
    SlashCommandBuilder,
    ActionRowBuilder,
    StringSelectMenuBuilder,
    ContainerBuilder,
    SectionBuilder,
    TextDisplayBuilder,
    ThumbnailBuilder,
    SeparatorBuilder,
    PermissionsBitField,
    MessageFlags
} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('setupsugestão')
        .setDescription('Configura o canal e gerencia o sistema de sugestões.')
        .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator),

    async execute(interaction) {
        await interaction.deferReply({
            flags: MessageFlags.Ephemeral
        });

        if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
            const containerErroPerm = new ContainerBuilder()
                .setAccentColor(0xED4245)
                .addSectionComponents(
                    new SectionBuilder()
                    .addTextDisplayComponents(new TextDisplayBuilder().setContent('## 🚫 Acesso Negado\nVocê precisa da permissão de `Administrador` para usar este comando.'))
                );
            return interaction.editReply({
                components: [containerErroPerm],
                flags: MessageFlags.Ephemeral | MessageFlags.IsComponentsV2
            });
        }

        const descricao = `## <:icon_settings:1441118761628467230> Configurações de Sugestão
> <:icon_mention:1441118752983875766> Bem-vindo, ${interaction.user}!
> Este é o painel de gerenciamento completo para o sistema de sugestões do servidor.
> 
> A partir daqui, você pode facilmente **definir o canal** para onde as sugestões são enviadas e **moderar as propostas** dos membros, garantindo um fluxo de feedback organizado e eficiente.
> 
> **Selecione uma opção abaixo para começar.**`;

        const selectMenu = new StringSelectMenuBuilder()
            .setCustomId('sugestao_config_menu_principal')
            .setPlaceholder('Selecione uma opção para gerenciar...')
            .addOptions([{
                label: 'Gerenciamento Canais ',
                description: 'Escolher canal que as sugestões serão enviadas',
                value: 'sugestao_config_canal',
                emoji: '<:icon_channel_text:1441118732788170993>'
            }, {
                label: 'Gerenciar Sugestões de Usuários',
                description: 'Aprove, recuse ou apague sugestões pendentes.',
                value: 'Gerenciamento_Completo_De_Sugestão ',
                emoji: '<:icon_settings:1441118761628467230>'
            }]);

        const row = new ActionRowBuilder().addComponents(selectMenu);

        const painelContainer = new ContainerBuilder()
            .setAccentColor(0x5865F2)
            .addSectionComponents(
                new SectionBuilder()
                .setThumbnailAccessory(new ThumbnailBuilder().setURL('https://iili.io/fBem8MJ.png'))
                .addTextDisplayComponents(new TextDisplayBuilder().setContent(descricao))
            )
            .addSeparatorComponents(new SeparatorBuilder().setDivider(true))
            .addActionRowComponents(row);

        await interaction.editReply({
            components: [painelContainer],
            flags: MessageFlags.Ephemeral | MessageFlags.IsComponentsV2
        });
    }
};
