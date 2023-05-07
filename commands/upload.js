const fs = require('fs');
const path = require('path');

module.exports = {
  name: 'upload',
  description: 'Upload a new MP3 file to the sounds folder',
  async execute(message, args) {
    const soundsDir = './sounds';

    // Check if there is an attachment
    if (message.attachments.size === 0) {
      return message.reply('Please attach an MP3 file to your message.');
    }

    const attachment = message.attachments.first();
    const fileName = attachment.name;

    // Check if the attachment is an MP3 file
    if (!fileName.endsWith('.mp3')) {
      return message.reply('Only MP3 files are allowed.');
    }

    // Save the file to the sounds folder
    const filePath = path.join(soundsDir, fileName);
    const file = fs.createWriteStream(filePath);

    try {
      const response = await require('axios').get(attachment.url, { responseType: 'stream' });
      await new Promise((resolve, reject) => {
        response.data.pipe(file);
        file.on('finish', resolve);
        file.on('error', reject);
      });

      message.reply(`The MP3 file "${fileName}" has been uploaded to the sounds folder.`);
    } catch (error) {
      console.error(error);
      message.reply('An error occurred while trying to upload the MP3 file.');
    } finally {
      file.end();
    }
  },
};
