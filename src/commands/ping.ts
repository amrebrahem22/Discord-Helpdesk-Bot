import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction } from 'discord.js';

// create command
export const data = new SlashCommandBuilder().setName('ping').setDescription('Replies with pong');

// execute command
export async function execute(interaction: CommandInteraction) {
    return interaction.reply('pong');
}