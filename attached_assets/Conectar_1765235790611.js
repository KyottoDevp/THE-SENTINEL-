const { SlashCommandBuilder, ChannelType } = require('discord.js');
const { joinVoiceChannel } = require('@discordjs/voice');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('conectar')
        .setDescription('Conecta o bot a um canal de voz.')
        .addChannelOption(option =>
            option
                .setName('channel')
                .setDescription('The voice channel to connect to')
                .setRequired(true)
                .addChannelTypes(ChannelType.GuildVoice)
        ),

    async execute(interaction) {
        // Get the selected channel
        const voiceChannel = interaction.options.getChannel('channel');

        // Validate the channel
        if (!voiceChannel || voiceChannel.type !== ChannelType.GuildVoice) {
            return interaction.reply({
                content: '❌ Please select a valid voice channel!',
                ephemeral: true,
            });
        }

        try {
            // Join the selected voice channel
            joinVoiceChannel({
                channelId: voiceChannel.id,
                guildId: voiceChannel.guild.id,
                adapterCreator: voiceChannel.guild.voiceAdapterCreator,
            });

            await interaction.reply(`✅ Joined the voice channel **${voiceChannel.name}**!`);
        } catch (error) {
            console.error(error);
            await interaction.reply('❌ Failed to connect to the selected voice channel.');
        }
    },
};
