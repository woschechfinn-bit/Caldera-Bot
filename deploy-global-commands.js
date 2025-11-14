const { REST, Routes } = require('discord.js');
const { token, clientId } = require('./config.json');
const fs = require('fs');

const rest = new REST({ version: '10' }).setToken(token);

(async () => {
    try {
        console.log('Lösche alle globalen Commands...');
        await rest.put(Routes.applicationCommands(clientId), { body: [] });
        console.log('✅ Alle alten globalen Commands gelöscht.');

        // Neue Commands deployen
        const commands = [];
        const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
        for (const file of commandFiles) {
            const command = require(`./commands/${file}`);
            commands.push(command.data.toJSON());
        }

        await rest.put(Routes.applicationCommands(clientId), { body: commands });
        console.log('✅ Neue globale Commands registriert.');
    } catch (error) {
        console.error(error);
    }
})();
