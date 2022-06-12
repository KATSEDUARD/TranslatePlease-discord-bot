import 'dotenv/config';
import { Client } from 'discord.js';
import { onReady } from './events/onReady.js';
import { onMessage } from './events/onMessage.js';
import { onButton } from './events/onButton.js';

const client = new Client({ intents: ['GUILDS', 'GUILD_MESSAGES'] });

(async () => await client.login(process.env.CLIENT_TOKEN))();

client.on('ready', onReady);

client.on('messageCreate', onMessage);

client.on('interactionCreate', onButton);