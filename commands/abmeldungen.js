const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('abmeldungen')
        .setDescription('Zeigt alle aktuellen Abmeldungen als Nachricht an.'),

    async execute(interaction) {
        let abmeldungen = {};

        try {
            abmeldungen = JSON.parse(fs.readFileSync('./abmeldungen.json', 'utf8'));
        } catch (e) {
            return interaction.reply({ content: 'Keine Abmeldungen gefunden.', ephemeral: true });
        }

        if (Object.keys(abmeldungen).length === 0) {
            return interaction.reply({ content: 'Es gibt aktuell keine Abmeldungen.', ephemeral: true });
        }

        const abmeldungenArray = Object.values(abmeldungen);

        // Header
        let message = 'Name'.padEnd(16) + '| ' + 'Dauer'.padEnd(7) + '| ' + 'Grund\n';
        message += '-'.repeat(35) + '\n';

        // Zeilen
        for (let a of abmeldungenArray) {
            let name = (a.nameTag || a.name).padEnd(16);
            let dauer = (a.dauer || '').padEnd(7);
            let grund = (a.grund || '');
            message += `${name}| ${dauer}| ${grund}\n`;
        }

        // Nachricht direkt im Channel posten
        await interaction.channel.send(message);

        // Ephemeral Bestätigung
        await interaction.reply({ content: 'Alle Abmeldungen wurden angezeigt.', ephemeral: true });
    }
};
