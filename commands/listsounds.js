const fs = require("fs");
const path = require("path");

const soundsDir = "./sounds";

module.exports = {
  name: "listsounds",
  description: "List all available sounds in the soundboard",
  async execute(message) {
    fs.readdir(soundsDir, (err, files) => {
      if (err) {
        console.error(err);
        return message.reply("An error occurred while trying to list the sounds.");
      }

      const soundFiles = files.filter((file) => file.endsWith(".mp3"));

      if (soundFiles.length === 0) {
        return message.reply("There are no sounds available in the soundboard.");
      }

      const soundNames = soundFiles.map((file) => path.basename(file, ".mp3"));
      message.reply(`Available sounds: \n${soundNames.join(", ")}`);
    });
  },
};
