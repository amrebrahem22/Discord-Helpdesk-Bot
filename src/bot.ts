import { Client } from 'discord.js';
import config from './config';
import * as commandModules from './commands';

// commands object
const commands = Object(commandModules)
;
// client instance
export const client = new Client({ intents: ['GUILDS', 'GUILD_MESSAGES', 'DIRECT_MESSAGES'] });

client.once('ready', () => {
    console.log('Discord bot ready!');
});

client.on('interactionCreate', async interaction => {
    if(!interaction.isCommand()) return;
    
    const { commandName } = interaction;

    // call the execute method for each command
    commands[commandName].execute(interaction, client);
})

// login
client.login(config.DISOCRD_TOKEN);
