# Discord Soundboard Bot

A simple Discord bot that serves as a soundboard, allowing users to play sounds in voice channels.

## Setup

1. **Create a new Discord bot:**
   - Go to the [Discord Developer Portal](https://discord.com/developers/applications).
   - Sign in and click the "New Application" button on the top right.
   - Enter a name for your application and click "Create".
   - In the application's sidebar, click "Bot".
   - Click "Add Bot" and confirm by clicking "Yes, do it!".
   - Under the "Bot" section, click "Copy" to copy your bot token. You will need this token later. If you lose it, you can always generate a new one by clicking "Reset Token".

2. **Clone the repository:**
```
git clone https://github.com/yourusername/discord-soundbot.git
cd discord-soundbot
```

Replace `https://github.com/yourusername/discord-soundbot.git` with your repository URL.

3. **Install dependencies:**
```
npm install
```

4. **Configure the bot token:**
- Create a new file in the project directory named `.env`.
- Add the following line to the `.env` file:

  ```
  BOT_TOKEN=YOUR_DISCORD_BOT_TOKEN
  ```

  Replace `YOUR_DISCORD_BOT_TOKEN` with the token you copied from the Discord Developer Portal.

5. **Invite the bot to your server:**
- In the Discord Developer Portal, go to the "OAuth2" section in your application's sidebar.
- Scroll down to the "Scopes" section and check the "bot" box.
- Scroll down to the "Bot Permissions" section and select the appropriate permissions for your bot (e.g., "Send Messages", "Connect", "Speak", etc.).
- Copy the generated URL from the "Scopes" section and paste it into your browser.
- Follow the prompts to invite the bot to your server.

6. **Run the bot:**
```
npm start
```
or
```
node index.js
```

The bot is now set up and running. You can use the `!help` command to see a list of available commands.

## Adding Sounds

Add MP3 files to the `sounds` folder. The bot will use the filenames (without the extension) as the names of the sounds. For example, if you add a file named `example.mp3`, users can play the sound using the `!soundboard example` command.
