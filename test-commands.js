const { REST, Routes } = require('discord.js');
const { token, clientId, guildId } = require('./config.json');

const rest = new REST({ version: '10' }).setToken(token);

(async () => {
    try {
        const commands = await rest.get(Routes.applicationGuildCommands(clientId, guildId));
        console.log('Registrierte Commands auf dem Server:');
        console.log(commands);
    } catch (error) {
        console.error(error);
    }
})();
