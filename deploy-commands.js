const { REST, Routes } = require('discord.js');
const { token, clientId, guildId } = require('./config.json');
const fs = require('fs');

const rest = new REST({ version: '10' }).setToken(token);

(async () => {
    try {
        console.log('Lösche alle Slash-Commands...');
        await rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: [] });
        console.log('✅ Alle alten Slash-Commands gelöscht.');

        // Danach die neuen Commands deployen wie gewohnt
        const commands = [];
        const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
        for (const file of commandFiles) {
            const command = require(`./commands/${file}`);
            commands.push(command.data.toJSON());
        }

        await rest.put(
            Routes.applicationGuildCommands(clientId, guildId),
            { body: commands },
        );

        console.log('✅ Neue Commands registriert.');
    } catch (error) {
        console.error(error);
    }
})();
