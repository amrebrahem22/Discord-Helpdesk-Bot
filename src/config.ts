import dotenv from 'dotenv';
dotenv.config();

const { CLIENT_ID, GUILD_ID, DISOCRD_TOKEN } = process.env;

// check enviromet variables
if (!CLIENT_ID || !GUILD_ID || !DISOCRD_TOKEN) {
    throw new Error('Missing Enviroment Variables')
}

const config: Record<string, string> = {
    CLIENT_ID,
    GUILD_ID,
    DISOCRD_TOKEN
}

export default config;