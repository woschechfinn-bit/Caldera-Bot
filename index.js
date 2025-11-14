const { Client, GatewayIntentBits } = require('discord.js');
const fs = require('fs');
const { token } = require('./config.json');

// Client erstellen
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// Abmeldungen laden (falls Datei existiert)
let abmeldungen = {};
if (fs.existsSync('./abmeldungen.json')) {
  abmeldungen = JSON.parse(fs.readFileSync('./abmeldungen.json'));
}

// Bot ready
client.once('clientReady', () => {
    console.log(`✅ Eingeloggt als ${client.user.tag}`);
});

// Slash-Commands verarbeiten
client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;

  const { commandName } = interaction;

  // /abmelden
  if (commandName === 'abmelden') {
    const grund = interaction.options.getString('grund');
    const dauer = interaction.options.getString('dauer');

    abmeldungen[interaction.user.id] = {
      name: interaction.user.username,
      grund,
      dauer
    };

    fs.writeFileSync('./abmeldungen.json', JSON.stringify(abmeldungen, null, 2));
    await interaction.reply(`${interaction.user.username} hat sich abgemeldet: ${grund} (${dauer})`);
  }

  // /abmeldungen
  if (commandName === 'abmeldungen') {
    if (Object.keys(abmeldungen).length === 0)
      return interaction.reply('Niemand ist abgemeldet.');

    const list = Object.values(abmeldungen)
      .map(a => `**${a.name}** – ${a.grund} – ${a.dauer}`)
      .join('\n');

    await interaction.reply(`📋 Aktuelle Abmeldungen:\n${list}`);
  }

  // /ping
  if (commandName === 'ping') {
    await interaction.reply('Pong!');
  }
});

// Login
client.login(token);
