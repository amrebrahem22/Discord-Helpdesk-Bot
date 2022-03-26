import { SlashCommandBuilder } from "@discordjs/builders";
import { Client, CommandInteraction, TextChannel } from "discord.js";
import { createTicket } from "../firebase";

// create command
export const data = new SlashCommandBuilder()
    .setName("help")
    .setDescription("Create a new help ticket.")
    .addStringOption((option) => {
        return option
            .setName("description")
            .setDescription("Describe your problem")
            .setRequired(true);
    });

// execute command
export async function execute(interaction: CommandInteraction, client: Client) {
    // check if has channel id
    if(!interaction?.channelId) return;

    const channel = await client.channels.fetch(interaction.channelId);

    // if there's no channel, or its just guild text
    if(!channel || channel.type !== 'GUILD_TEXT') return;

    // now we are dealing with guild text, so create thread
    const thread = await (channel as TextChannel).threads.create({
        name: `Support ${Date.now()}`,
        reason: `Support ticket ${Date.now}`
    });

    // get the option
    const problemDescription = interaction.options.getString('description')!;
    const { user } = interaction;

    // send thread
    thread.send(`**User** <@${user}>
    **Problem** ${problemDescription}`);

    // create a ticket and store it in firebase
    await createTicket(thread.id, problemDescription);

    // reply to the user
    return interaction.reply({
        content: 'Help is on the way',
        ephemeral: true  // show this just to the user whoe sent this ticket
    })
}
