const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('backup')
		.setDescription('Hace un backup del chat actual.'),
	async execute(interaction) {
		const channel = interaction.channel;
		if (!channel) return;

		const messages = await channel.messages.fetch({ limit: 100 });

		let backupContent = 'Backup del chat:\n\n';

		messages.sort((a, b) => a.createdTimestamp - b.createdTimestamp);

		messages.forEach((message) => {
			backupContent += `Fecha: ${message.createdAt}\nAutor: ${message.author.tag}\nContenido: ${message.content}\n\n`;

			if (message.embeds.length > 0) {
				message.embeds.forEach((embed, index) => {
					backupContent += `Embed ${index + 1}:\n${JSON.stringify(embed, null, 2)}\n\n`;
				});
			}
		});

		// Envía el backup al usuario que solicitó el comando
		interaction.user.send('Aquí está el backup del chat:', { files: [{ name: 'backup.txt', attachment: Buffer.from(backupContent) }] });

		// Opcionalmente, podrías enviar también el backup como mensaje en el canal actual
		// interaction.reply('Aquí está el backup del chat:', { files: [{ name: 'backup.txt', attachment: Buffer.from(backupContent) }] });
	},
};