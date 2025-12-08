const {
    SlashCommandBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    MessageFlags,
    ContainerBuilder,
    TextDisplayBuilder,
    SectionBuilder,
    ThumbnailBuilder,
    SeparatorBuilder,
} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('info')
        .setDescription('Exibe informações, estatísticas e links úteis sobre o bot.'),

    async execute(interaction) {
        await interaction.deferReply({ ephemeral: false });

        const client = interaction.client;
        const totalGuilds = client.guilds.cache.size.toLocaleString('pt-BR');
        
        // --- CORREÇÃO IMPORTANTE: Método confiável para contar comandos ---
        const totalCommands = client.application.commands.cache.size;
        
        const botAvatarURL = client.user.displayAvatarURL({ dynamic: true, size: 256 });
        const accentColor = 0x5865F2;
        
        const infoContainer = new ContainerBuilder()
            .setAccentColor(accentColor)
            .addSectionComponents(
                new SectionBuilder()
                .setThumbnailAccessory(
                    new ThumbnailBuilder().setURL(botAvatarURL)
                )
                .addTextDisplayComponents(
                    new TextDisplayBuilder()
                    .setContent(`### Olá! Eu sou o Sentinel.\n\nEu estou atualmente em **${totalGuilds} servidores** e tenho **${totalCommands} comandos**. Fui criado em **14 de setembro de 2025** para ser um bot público de moderação, administração e um hub para Ports de jogos.\n\nEu fui programado em <:Java:1444593002516578345> **JavaScript** usando **Discord.js** e estou em constante desenvolvimento para trazer novas funcionalidades.`)
                )
            )
            .addSeparatorComponents(
                new SeparatorBuilder()
                .setSpacing(1) // 1 = Small
                .setDivider(false)
            )
            .addTextDisplayComponents(
                 new TextDisplayBuilder().setContent(`Desenvolvido com <:corao:1444593003984326737> por **Hann*`)
            )
            .addSeparatorComponents(
                new SeparatorBuilder()
                .setSpacing(2) // 2 = Large
                .setDivider(true)
            )
            .addActionRowComponents(
                new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setLabel('Me adicione')
                        .setStyle(ButtonStyle.Link)
                        .setURL(`https://discord.com/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot%20applications.commands`)
                        .setEmoji('<:icon_link:1441118748848296048>'),
                    new ButtonBuilder()
                        .setLabel('Site Do Sentinel')
                        .setStyle(ButtonStyle.Link)
                        .setURL('https://SEU-SITE-AQUI.com')
                        .setEmoji('<:traduzir:1441118827013210355>'),
                    new ButtonBuilder()
                        .setLabel('Servidor de Suporte')
                        .setStyle(ButtonStyle.Link)
                        .setURL('https://discord.gg/SEU-CONVITE-AQUI')
                        .setEmoji('<:icon_summaries:1441118763469635806>')
                )
            );

        await interaction.editReply({
            components: [infoContainer],
            flags: MessageFlags.IsComponentsV2
        });
    },
};
