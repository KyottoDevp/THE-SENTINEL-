const {
    SlashCommandBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    ComponentType,
    ContainerBuilder,
    SectionBuilder,
    TextDisplayBuilder,
    ThumbnailBuilder,
    SeparatorBuilder,
    MessageFlags
} = require('discord.js');
const mongoose = require('mongoose');
const Economia = require('../../database/models/economia.js');

const BET_TIMEOUT_MS = 5 * 60 * 1000;
const DAILY_COOLDOWN_MS = 24 * 60 * 60 * 1000;

function parseAmount(input) {
    if (typeof input !== 'string') return NaN;
    const cleaned = input.toLowerCase().replace(/\s/g, '');
    if (cleaned.endsWith('k')) return parseFloat(cleaned) * 1000 || NaN;
    if (cleaned.endsWith('m')) return parseFloat(cleaned) * 1000000 || NaN;
    return parseFloat(cleaned);
}

const formatCurrency = (value) => `R$ ${value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

function hasCollectedDaily(lastClaim) {
    if (!lastClaim) return false;
    return (Date.now() - lastClaim.getTime()) < DAILY_COOLDOWN_MS;
}

function createBetContainer(hostUser, playerShare, playersMap, maxPlayers) {
    const currentTotalValue = playerShare * playersMap.size;
    let playersListString = Array.from(playersMap.values())
        .map(user => `- <@${user.id}>`)
        .join('\n');
    if (playersMap.size === 0) {
        playersListString = "- *Nenhum jogador ainda...*";
    }

    const descriptionContent = [
        `## <:sv_booster:1427141827290468523> **Sentinel System — Aposta em Grupo**\n`,
        `### <:Icon_Settings:1427138863561834537> Informações da Aposta`,
        `> **Anfitrião:** ${hostUser}`,
        `> **Valor por Jogador:** ${formatCurrency(playerShare)}`,
        `> **Prêmio Total Atual:** ${formatCurrency(currentTotalValue)}\n`,
        `### Jogadores na Sala (${playersMap.size}/${maxPlayers})`,
        `${playersListString}\n\n`,
        `### 📌 Como Funciona?`,
        `> A aposta começa quando a sala atingir **${maxPlayers} jogadores**.`,
        `> Use os botões para entrar ou sair!`
    ].join('\n');

    return new ContainerBuilder()
        .setAccentColor(5793266)
        .addSectionComponents(
            new SectionBuilder()
            .setThumbnailAccessory(new ThumbnailBuilder().setURL("https://iili.io/KQVnQ8Q.gif"))
            .addTextDisplayComponents(new TextDisplayBuilder().setContent(descriptionContent))
        )
        .addSeparatorComponents(new SeparatorBuilder().setDivider(true));
}

function createResultContainer(title, message) {
    const descriptionContent = [
        `## <:sv_booster:1427141827290468523> **Sentinel System — Resultado da Aposta**\n`,
        `### ${title}`,
        `${message}`
    ].join('\n');

    return new ContainerBuilder()
        .setAccentColor(5793266)
        .addSectionComponents(
            new SectionBuilder()
            .setThumbnailAccessory(new ThumbnailBuilder().setURL("https://iili.io/KQVnQ8Q.gif"))
            .addTextDisplayComponents(new TextDisplayBuilder().setContent(descriptionContent))
        );
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('apostar')
        .setDescription('Cria uma aposta em grupo e sorteia o prêmio total para um vencedor.')
        .addStringOption(option =>
            option.setName('valor-da-cota')
            .setDescription('O valor que cada jogador pagará (ex: 5000, 5k, 1m).')
            .setRequired(true))
        .addIntegerOption(option =>
            option.setName('maximo-jogadores')
            .setDescription('O número total de jogadores necessários (incluindo você).')
            .setRequired(true)
            .setMinValue(2)
            .setMaxValue(25)),

    async execute(interaction) {
        if (interaction.replied || interaction.deferred) {
            console.warn(`[WARN] A interação para 'aposta-em-grupo' já foi reconhecida. Provável listener duplicado.`);
            return;
        }
        await interaction.deferReply();

        const host = interaction.user;
        const rawShare = interaction.options.getString('valor-da-cota');
        const playerShare = parseAmount(rawShare);
        const maxPlayers = interaction.options.getInteger('maximo-jogadores');

        if (isNaN(playerShare) || playerShare <= 0) {
            return interaction.editReply({
                content: `❌ **Valor inválido!** Use um número positivo, como \`5000\`, \`5k\` ou \`1m\`.`,
                ephemeral: true
            });
        }

        const hostData = await Economia.findOne({ userId: host.id }); 
        
        if (!hostData || !hasCollectedDaily(hostData.lastClaim)) {
            return interaction.editReply({
                content: `❌ Você precisa ter pego sua **recompensa diária** hoje para poder iniciar uma aposta.`,
                ephemeral: true 
            });
        }

        const hostBalance = hostData.recompensa;
        if (hostBalance < playerShare) {
            return interaction.editReply({
                content: `❌ Você não tem saldo suficiente (${formatCurrency(playerShare)}) para participar da sua própria aposta.`,
                ephemeral: true
            });
        }

        const players = new Map();
        players.set(host.id, host);

        const enterButtonId = `bet_enter_${interaction.id}`;
        const leaveButtonId = `bet_leave_${interaction.id}`;

        const row = new ActionRowBuilder().addComponents(
            new ButtonBuilder().setCustomId(enterButtonId).setLabel("Entrar").setStyle(ButtonStyle.Success).setEmoji("🎟️"),
            new ButtonBuilder().setCustomId(leaveButtonId).setLabel("Sair").setStyle(ButtonStyle.Danger).setEmoji("🚪")
        );

        const initialContainer = createBetContainer(host, playerShare, players, maxPlayers)
            .addActionRowComponents(row);

        const betMessage = await interaction.editReply({
            components: [initialContainer],
            flags: MessageFlags.IsComponentsV2
        });

        const collector = betMessage.createMessageComponentCollector({
            componentType: ComponentType.Button,
            time: BET_TIMEOUT_MS 
        });

        collector.on('collect', async i => {
            await i.deferUpdate(); 
            const user = i.user;

            if (i.customId === enterButtonId) {
                if (players.has(user.id)) {
                    return i.followUp({ content: 'Você já está na aposta!', ephemeral: true });
                }
                if (players.size >= maxPlayers) {
                    return i.followUp({ content: 'A aposta já está lotada!', ephemeral: true });
                }
                
                const userData = await Economia.findOne({ userId: user.id }); 
                
                if (!userData || !hasCollectedDaily(userData.lastClaim)) {
                    return i.followUp({ content: `❌ Você precisa pegar sua **recompensa diária** de hoje para entrar.`, ephemeral: true });
                }
                if (userData.recompensa < playerShare) {
                    return i.followUp({ content: `❌ Você não tem ${formatCurrency(playerShare)} para entrar na aposta.`, ephemeral: true });
                }

                players.set(user.id, user);
                const updatedContainer = createBetContainer(host, playerShare, players, maxPlayers)
                    .addActionRowComponents(row);
                await betMessage.edit({ components: [updatedContainer] });

                if (players.size === maxPlayers) {
                    collector.stop('maxReached');
                }
            } else if (i.customId === leaveButtonId) {
                if (!players.has(user.id)) {
                    return i.followUp({ content: 'Você não está nesta aposta.', ephemeral: true });
                }
                
                if (user.id === host.id) {
                    collector.stop('hostCancelled');
                    return;
                }

                players.delete(user.id);
                const updatedContainer = createBetContainer(host, playerShare, players, maxPlayers)
                    .addActionRowComponents(row);
                await betMessage.edit({ components: [updatedContainer] });
            }
        });

        collector.on('end', async (_, reason) => {
            const disabledRow = new ActionRowBuilder().addComponents(
                ButtonBuilder.from(row.components[0]).setDisabled(true),
                ButtonBuilder.from(row.components[1]).setDisabled(true)
            );

            if (reason === 'hostCancelled') {
                const finalContainer = createResultContainer("❌ Aposta Cancelada", `> A aposta foi cancelada pelo anfitrião, ${host}.`)
                    .addActionRowComponents(disabledRow);
                await betMessage.edit({ components: [finalContainer], flags: MessageFlags.IsComponentsV2 });
                return;
            }

            if (reason === 'time' && players.size <= 1) {
                const inactivityDescription = [
                    `## <:sv_booster:1427141827290468523> **Sentinel System — Aposta em Grupo**\n`,
                    `### <:Icon_Settings:1427138863561834537> Informações da Aposta`,
                    `> **Anfitrião:** ${host}`,
                    `> **Valor por Jogador:** ${formatCurrency(playerShare)}`,
                    `> **Prêmio Total Atual:** ${formatCurrency(0)}\n`,
                    `### Jogadores na Sala (${players.size}/${maxPlayers})`,
                    "> **Aposta encerrada por inatividade.**\n\n", 
                    `### 📌 Como Funciona?`,
                    `> A aposta começa quando a sala atingir **${maxPlayers} jogadores**.`,
                ].join('\n');

                const inactivityContainer = new ContainerBuilder()
                    .setAccentColor(0xE74C3C)
                    .addSectionComponents(
                        new SectionBuilder()
                        .setThumbnailAccessory(new ThumbnailBuilder().setURL("https://iili.io/KQVnQ8Q.gif"))
                        .addTextDisplayComponents(new TextDisplayBuilder().setContent(inactivityDescription))
                    )
                    .addActionRowComponents(disabledRow);

                await betMessage.edit({ components: [inactivityContainer], flags: MessageFlags.IsComponentsV2 });
                return;
            }

            if (reason !== 'maxReached' || players.size < 2) {
                const finalContainer = createResultContainer("❌ Aposta Cancelada", "> A aposta foi cancelada por não atingir o número mínimo de jogadores a tempo.")
                    .addActionRowComponents(disabledRow);
                await betMessage.edit({ components: [finalContainer], flags: MessageFlags.IsComponentsV2 });
                return;
            }

            const currentContainer = createBetContainer(host, playerShare, players, maxPlayers)
                .addActionRowComponents(disabledRow);
            await betMessage.edit({ components: [currentContainer] });

            await interaction.followUp({
                content: `Aposta lotada! 🔒 **10 segundos** para o sorteio do vencedor... ⏳`
            });

            await new Promise(resolve => setTimeout(resolve, 10000));
            
            const finalPot = playerShare * players.size;
            const playerArray = Array.from(players.values());
            const playerIds = Array.from(players.keys());
            const winner = playerArray[Math.floor(Math.random() * playerArray.length)];

            const session = await mongoose.startSession();
            try {
                await session.withTransaction(async () => {
                    await Economia.updateMany({ userId: { $in: playerIds } }, { $inc: { recompensa: -playerShare } }, { session });
                    await Economia.updateOne({ userId: winner.id }, { $inc: { recompensa: finalPot } }, { session });
                });

                const finalMessage = `> Parabéns, ${winner}!\n> Você faturou o prêmio de **${formatCurrency(finalPot)}**!\n\n**Participantes:**\n${playerArray.map(p => `> <@${p.id}>`).join('\n')}`;
                const finalContainer = createResultContainer("🏆 Temos um Vencedor!", finalMessage)
                    .addActionRowComponents(disabledRow);
                await betMessage.edit({ components: [finalContainer], flags: MessageFlags.IsComponentsV2 });

            } catch (err) {
                console.error("Erro na transação da aposta:", err);
                const errorContainer = createResultContainer("🚨 Erro Crítico na Transação", "> Ocorreu um erro ao processar os pagamentos. Nenhum valor foi cobrado de ninguém. Por favor, tente novamente.")
                    .addActionRowComponents(disabledRow);
                await betMessage.edit({ components: [errorContainer], flags: MessageFlags.IsComponentsV2 });
            } finally {
                await session.endSession();
            }
        });
    },
};
