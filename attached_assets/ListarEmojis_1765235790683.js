/**
 * @file commands/list-emojis.js
 * @description Displays all custom emojis stored in the database and checks their validity.
 */

const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const ChinesPort = require('../../database/models/chines.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('emojis')
    .setDescription('Exibe a lista de emojis personalizados e verifica sua validade.'),

  async execute(interaction) {
    await interaction.deferReply();

    try {
      // 1. Fetch all emojis from the database
      const allEmojis = await ChinesPort.find({});
      if (allEmojis.length === 0) {
        return interaction.editReply('❌ **No custom emojis found** in the database.');
      }

      const validEmojis = [];
      const invalidEmojis = [];

      // 2. Validate and format each emoji
      for (const item of allEmojis) {
        const emojiString = item.emoji;
        const match = emojiString.match(/(\d+)/);
        const emojiID = match ? match[1] : null;
        const discordEmoji = emojiID ? interaction.client.emojis.cache.get(emojiID) : null;

        const formatted = `**[${emojiID || 'ID-ERR'}]** ${emojiString}`;

        if (discordEmoji) {
          validEmojis.push(formatted);
        } else {
          let status = '❌ Broken / Not found';
          if (emojiID === '1818289281') status = '❌ **No longer in server**';
          invalidEmojis.push(`~~${formatted}~~ ${status}`);
        }
      }

      // 3. Create response embed
      const embed = new EmbedBuilder()
        .setColor(0x3498db)
        .setTitle('📜 Saved Emojis List')
        .setTimestamp()
        .setFooter({
          text: `Total: ${allEmojis.length} | Valid: ${validEmojis.length}`,
        });

      if (validEmojis.length > 0) {
        embed.addFields({
          name: '✅ Valid Emojis',
          value: validEmojis.join('\n').substring(0, 1024),
          inline: false,
        });
      }

      if (invalidEmojis.length > 0) {
        embed.addFields({
          name: '⚠️ Broken / Invalid Emojis',
          value: invalidEmojis.join('\n').substring(0, 1024),
          inline: false,
        });
      }

      // 4. Send final message
      await interaction.editReply({ embeds: [embed] });
    } catch (error) {
      console.error('Error listing emojis:', error);
      await interaction.editReply({
        content: '🚫 An internal error occurred while fetching emojis from the database.',
        ephemeral: true,
      });
    }
  },
};
