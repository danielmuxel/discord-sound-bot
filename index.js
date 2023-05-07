const { Client, GatewayIntentBits, Collection } = require("discord.js");
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.MessageContent,
  ],
});

const fs = require("fs");
const token =
  "MTEwNDY4MzU5MTY0NjA3Mjg5NA.GwuR20.qThVkDV0qT6J50y88TxFFFxf_yk_QUKO9FaCCE";
const prefix = "!";

// Create a collection to store commands
client.commands = new Collection();
const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));

// Populate the collection with commands
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("messageCreate", async (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  if (!client.commands.has(commandName)) return;

  try {
    const command = client.commands.get(commandName);
    await command.execute(message, args);
  } catch (error) {
    console.error(error);
    message.reply("An error occurred while trying to execute the command.");
  }
});

client.login(token);
