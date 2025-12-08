/**
 * @file commands/delete-emoji.js
 * @description Permanently deletes an emoji from the database by title or Discord ID.
 */

const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const ChinesPort = require('../../database/models/chines.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('excluir')
    .setDescription('Exclui permanentemente um emoji do banco de dados.')
    .addStringOption(option =>
      option
        .setName('identifier')
        .setDescription('The emoji Title or Discord ID (e.g., "download2" or "1422416894689808495").')
        .setRequired(true)
    ),

  async execute(interaction) {
    await interaction.deferReply({ ephemeral: true });
    const identifier = interaction.options.getString('identifier');

    try {
      // 1. Attempt deletion by title or emoji ID (regex match)
      const deleted = await ChinesPort.findOneAndDelete({
        $or: [
          { title: identifier },
          { emoji: { $regex: new RegExp(identifier) } },
        ],
      });

      // 2. If not found
      if (!deleted) {
        const notFound = new EmbedBuilder()
          .setColor(0xfee75c)
          .setDescription(`⚠️ No emoji found with identifier \`${identifier}\`.`);
        return interaction.editReply({ embeds: [notFound] });
      }

      // 3. Success message
      const success = new EmbedBuilder()
        .setColor(0x57f287)
        .setTitle('✅ Emoji Successfully Deleted')
        .setDescription(
          `The following record was **permanently removed**:\n` +
          `> **Title:** \`${deleted.title}\`\n` +
          `> **Emoji:** ${deleted.emoji || 'N/A'}`
        )
        .setTimestamp();

      await interaction.editReply({ embeds: [success] });

    } catch (error) {
      console.error('Error deleting emoji:', error);
      const errorEmbed = new EmbedBuilder()
        .setColor(0xed4245)
        .setDescription('🚫 An error occurred while attempting to delete the emoji. Check console logs for details.');
      await interaction.editReply({ embeds: [errorEmbed] });
    }
  },
};
