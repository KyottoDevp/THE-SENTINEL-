const {
    SlashCommandBuilder,
    ContainerBuilder,
    SectionBuilder,
    TextDisplayBuilder,
    ThumbnailBuilder,
    MessageFlags
} = require('discord.js');
const Economia = require('../../database/models/economia.js');

const DAILY_COOLDOWN_MS = 24 * 60 * 60 * 1000;
const REWARD_AMOUNT_DEFAULT = 5000;
const THUMBNAIL_URL_REWARD = 'https://i.imgur.com/J8tCH3R.png';

const formatCurrency = (value) => `R$ ${value.toLocaleString('pt-BR')}`;

function msToRelativeTime(timestamp) {
    const seconds = Math.floor(timestamp / 1000);
    return `<t:${seconds}:R>`;
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('daily')
        .setDescription('Coleta a recompensa monetária diária e aumenta sua sequência.'),

    async execute(interaction) {
        if (interaction.replied || interaction.deferred) {
            console.warn("[WARN] A interação para 'recompensa' já foi reconhecida. Listener duplicado pode estar ativo.");
            return;
        }
        await interaction.deferReply({ flags: MessageFlags.Ephemeral });

        const user = interaction.user;
        const guild = interaction.guild;
        const now = new Date();

        const chance = Math.random() * 100;
        let rewardAmount = 0;
        let rarity = '';
        let color = 0xF1C40F;

        if (chance < 60) {
            rewardAmount = Math.floor(Math.random() * (5000 - 1000 + 1)) + 1000;
            rarity = '🟩 Comum';
            color = 0x2ECC71;
        } else if (chance < 85) {
            rewardAmount = Math.floor(Math.random() * (20000 - 10000 + 1)) + 10000;
            rarity = '🟦 Incomum';
            color = 0x3498DB;
        } else if (chance < 95) {
            rewardAmount = Math.floor(Math.random() * (100000 - 50000 + 1)) + 50000;
            rarity = '🟪 Raro';
            color = 0x9B59B6;
        } else if (chance < 99) {
            rewardAmount = Math.floor(Math.random() * (500000 - 200000 + 1)) + 200000;
            rarity = '🟧 Épico';
            color = 0xE67E22;
        } else {
            rewardAmount = Math.floor(Math.random() * (10000000 - 1000000 + 1)) + 1000000;
            rarity = '🟥 Lendário 💎';
            color = 0xE74C3C;
        }

        let userProfile = await Economia.findOne({ userId: user.id, guildId: guild.id });

        if (userProfile) {
            const timeSinceLastClaim = now.getTime() - userProfile.lastClaim.getTime();

            if (timeSinceLastClaim < DAILY_COOLDOWN_MS) {
                const nextClaimTimestamp = userProfile.lastClaim.getTime() + DAILY_COOLDOWN_MS;
                
                const cooldownContainer = new ContainerBuilder()
                    .setAccentColor(0xE74C3C)
                    .addSectionComponents(
                        new SectionBuilder()
                        .setThumbnailAccessory(new ThumbnailBuilder().setURL(THUMBNAIL_URL_REWARD))
                        .addTextDisplayComponents(
                            new TextDisplayBuilder().setContent(
                                `## ⏳ Sentinel System | Cooldown Ativo\n\nOlá ${user}, você já resgatou sua recompensa diária.\n\n**Próxima Coleta:**\nVocê poderá coletar novamente ${msToRelativeTime(nextClaimTimestamp)}.`
                            )
                        )
                    );
                
                return interaction.editReply({ components: [cooldownContainer], flags: MessageFlags.IsComponentsV2 });
            }

            const isConsecutiveDay = (now.getTime() - userProfile.lastClaim.getTime()) < (2 * DAILY_COOLDOWN_MS);
            userProfile.streak = isConsecutiveDay ? userProfile.streak + 1 : 1;
            userProfile.lastClaim = now;
            userProfile.recompensa += rewardAmount;
            userProfile.userName = user.username;
            userProfile.guildName = guild.name;
            
        } else {
            userProfile = new Economia({
                userId: user.id,
                guildId: guild.id,
                userName: user.username,
                guildName: guild.name,
                recompensa: rewardAmount,
                streak: 1,
                lastClaim: now,
            });
        }

        try {
            await userProfile.save();

            const description = [
                `## <:8_june_star:1427141900326015066> Sentinel System | Recompensa Diária`,
                `**<:emoji_56:1434674104170053823> Recompensa Coletada com Sucesso!**\n`,
                `<:Member:1427164040362197104> **Usuário:** ${user}`,
                `<:placa:1394887010900250766> **Recompensa Recebida:** ${formatCurrency(rewardAmount)} (${rarity})\n`,
                `### Parabéns pela sua dedicação!`,
                `Continue voltando todos os dias para aumentar sua sequência e conquistar recompensas ainda maiores!\n`,
                `📆 **Sequência Atual:** ${userProfile.streak} dia(s)`
            ].join('\n');

            const successContainer = new ContainerBuilder()
                .setAccentColor(color)
                .addSectionComponents(
                    new SectionBuilder()
                    .setThumbnailAccessory(new ThumbnailBuilder().setURL(user.displayAvatarURL({ dynamic: true, size: 256 })))
                    .addTextDisplayComponents(
                        new TextDisplayBuilder().setContent(description)
                    )
                );
            
            await interaction.editReply({ components: [successContainer], flags: MessageFlags.IsComponentsV2, ephemeral: false });

        } catch (error) {
            console.error("Erro ao salvar o perfil de economia no comando 'recompensa':", error);
            const errorContainer = new ContainerBuilder()
                .setAccentColor(0xED4245)
                .addSectionComponents(
                    new SectionBuilder()
                    .addTextDisplayComponents(new TextDisplayBuilder().setContent("## ❌ Erro Crítico\nOcorreu um problema ao salvar sua recompensa no banco de dados. Por favor, tente novamente."))
                );
            await interaction.editReply({ components: [errorContainer], flags: MessageFlags.IsComponentsV2 });
        }
    },
};
