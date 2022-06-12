import { commands } from '../commands/commands.js';
import { utils } from '../utils/utils.js';
import { constants } from '../constants.js';

const { PREFIX } = constants;

const onMessage = async message => {
    try {
        if (message.author.bot || !message.content.startsWith(PREFIX)) return;

        const args = utils.getArgs(message.content, PREFIX);
        const command = utils.getCommand(args);

        const { key, action } = utils.getCommandObject(commands, command);

        if (command === key) {
            await action(message, utils.getRequestedMessage(args));
        } else {
            await message.reply({ embeds: [utils.errorHandler()]});
        }
    } catch (err) {
        return message.channel.send({ embeds: [utils.errorHandler()]});
    }
}

export { onMessage };