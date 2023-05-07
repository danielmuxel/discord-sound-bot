module.exports = {
  name: 'help',
  description: 'List all available commands with their descriptions',
  execute(message) {
    const { commands } = message.client;

    const commandList = commands.map(command => {
      return `**${command.name}**: ${command.description}`;
    }).join('\n');

    message.channel.send(`Available commands:\n\n${commandList}`);
  },
};
