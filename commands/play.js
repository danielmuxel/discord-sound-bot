const {
  joinVoiceChannel,
  createAudioResource,
  createAudioPlayer,
  AudioPlayerStatus,
} = require("@discordjs/voice");
const fs = require("fs");
const path = require("path");

const soundsDir = "./sounds";

// Outside the execute function, before the module.exports line
let disconnectTimeout;

module.exports = {
  name: "play",
  description: "Play a sound from the soundboard",
  async execute(message, args) {
    if (!message.member.voice.channel) {
      return message.reply("You need to join a voice channel first!");
    }

    if (!args[0]) {
      return message.reply("Please provide a sound name to play!");
    }

    const soundName = args[0].toLowerCase();
    const soundFile = path.join(soundsDir, `${soundName}.mp3`);

    if (!fs.existsSync(soundFile)) {
      return message.reply(`Sound "${soundName}" not found!`);
    }

    try {
      const voiceChannel = message.member.voice.channel;
      const connection = joinVoiceChannel({
        channelId: voiceChannel.id,
        guildId: voiceChannel.guild.id,
        adapterCreator: voiceChannel.guild.voiceAdapterCreator,
      });

      const resource = createAudioResource(soundFile, {
        inputType: "file",
        inlineVolume: true,
      });
      resource.volume.setVolume(1.0);

      const player = createAudioPlayer();
      player.play(resource);

      connection.subscribe(player);

      player.on(AudioPlayerStatus.Idle, () => {
        // If there's an existing disconnect timeout, clear it
        if (disconnectTimeout) {
          clearTimeout(disconnectTimeout);
        }

        // Generate a random wait time between 10 and 30 seconds (10000ms to 30000ms)
        const waitTime = Math.floor(
          Math.random() * (30000 - 10000 + 1) + 10000
        );

        // Set a new disconnect timeout
        disconnectTimeout = setTimeout(() => {
          // Check if the audio player is still playing when the timeout expires
          if (player.state.status === AudioPlayerStatus.Idle) {
            connection.destroy();
          }
        }, waitTime);
      });

      message.reply(`Playing "${soundName}" in your voice channel.`);
    } catch (error) {
      console.error(error);
      message.reply("An error occurred while trying to play the sound.");
    }
  },
};
