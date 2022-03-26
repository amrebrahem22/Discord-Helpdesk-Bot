import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";
import {SlashCommandBuilder} from '@discordjs/builders';
import config from "./config";
import * as commandModules from './commands';

// command type
type Command = {
    data: SlashCommandBuilder
}

const commands = [];

// append commands dynamically
for (const module of Object.values<Command>(commandModules)) {
    commands.push(module.data);
}

const rest = new REST({ version: "9" }).setToken(config.DISOCRD_TOKEN);

rest.put(Routes.applicationGuildCommands(config.CLIENT_ID, config.GUILD_ID), {
    body: commands,
})
    .then(() => {
        console.log("Successfully registered application commands");
    })
    .catch(console.error);
