const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');

const downloadsDir = './downloads';
if (!fs.existsSync(downloadsDir)) {
	fs.mkdirSync(downloadsDir);
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('backup')
		.setDescription('Descarga el historial del chat (mensajes, imágenes y videos).'),
	async execute(interaction) {
		const channel = interaction.channel;
		if (!channel) return;

		let allMessages = [];
		let lastMessageId;

		// Recopilamos todos los mensajes del canal de forma paginada
		do {
			const options = { limit: 100 };
			if (lastMessageId) options.before = lastMessageId;

			const messages = await channel.messages.fetch(options);
			const filteredMessages = messages.filter((message) => !message.author.bot);

			allMessages.push(...filteredMessages.values());
			lastMessageId = messages.last()?.id;
		} while (lastMessageId);

		let backupContent = 'Historial del chat:\n\n';

		// Ordenamos los mensajes por fecha de publicación
		allMessages.sort((a, b) => a.createdTimestamp - b.createdTimestamp);

		// Iteramos a través de todos los mensajes
		allMessages.forEach((message) => {
			backupContent += `Fecha: ${message.createdAt}\nAutor: ${message.author.tag}\nContenido: ${message.content}\n\n`;

			// Si el mensaje contiene adjuntos (imágenes o videos), los descargamos
			if (message.attachments.size > 0) {
				message.attachments.forEach(async (attachment) => {
					const fileName = `${message.id}_${attachment.name}`;

					await downloadAttachment(attachment.url, fileName);
					backupContent += `Adjunto: ${attachment.url}\n\n`;
				});
			}
		});

		// Guardamos el historial del chat en un archivo de texto
		fs.writeFileSync('./downloads/chat_history.txt', backupContent);

		// Enviamos el archivo de texto al usuario que solicitó el comando
		interaction.user.send('Aquí está el historial del chat:', {
			files: [{ name: 'chat_history.txt', attachment: './downloads/chat_history.txt' }],
		});

		// Opcionalmente, podrías enviar también el historial del chat como mensaje en el canal actual
		// interaction.reply('Aquí está el historial del chat:', { files: [{ name: 'chat_history.txt', attachment: './downloads/chat_history.txt' }] });
	},
};

// Función para descargar un archivo adjunto
function downloadAttachment(url, filename) {
	return new Promise((resolve, reject) => {
		const fileStream = fs.createWriteStream(`./downloads/${filename}`);
		const https = require('https');

		https.get(url, (response) => {
			response.pipe(fileStream);

			fileStream.on('finish', () => {
				fileStream.close();
				resolve();
			});

			fileStream.on('error', (error) => {
				fs.unlinkSync(`./downloads/${filename}`);
				reject(error);
			});
		});
	});
}