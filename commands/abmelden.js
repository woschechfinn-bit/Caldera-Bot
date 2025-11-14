const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('abmelden')
    .setDescription('Meldet dich mit Grund und Dauer ab.')
    .addStringOption(option =>
      option.setName('grund')
        .setDescription('Warum meldest du dich ab?')
        .setRequired(true))
    .addStringOption(option =>
      option.setName('dauer')
        .setDescription('Wie lange bist du weg?')
        .setRequired(true)
    ),
  
  async execute(interaction) {
    // Die eigentliche Logik machst du in index.js.
    // Dieser Befehl dient nur zur Registrierung.
    await interaction.reply('Alles klar, ich speichere deine Abmeldung...');
  }
};
