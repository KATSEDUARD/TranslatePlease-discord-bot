import { MessageEmbed } from "discord.js";
import { constants } from '../constants.js';

const { ERROR_MESSAGE, EMBED_IMG } = constants;

const getHelpMessage = () => new MessageEmbed()
	.setColor('#0099ff')
	.setTitle('Справка')
	.setThumbnail(EMBED_IMG)
	.addFields(
        { name: 'Выбрать языки (с какого на какой)', value: '-langs' },
        { name: '\u200B', value: '\u200B' },
		{ name: 'Перевести', value: '-tp Нужное_слово' },
        { name: '\u200B', value: '\u200B' },
		{ name: 'Получить словарь', value: '-voc' },
        { name: '\u200B', value: '\u200B' },
        { name: 'Очистить словарь', value: '-clvoc' },
);

const swapLanguages = objToSwap => {
    let tempField = objToSwap.from;
    objToSwap.from = objToSwap.to;
    objToSwap.to = tempField;
    return objToSwap;
};

const swapButtons = (interaction, en, ru) => {
    interaction.deferUpdate();
    const emptyBtn = en.label;
    en.setLabel(ru.label);
    ru.setLabel(emptyBtn);
    interaction.message.edit({ components: [interaction.message.components[0]] });

    return;
};

const getArgs = (content, prefix) => content.slice(prefix.length).split(/ +/);

const getCommand = args => args.shift().toLowerCase();

const getRequestedMessage = args => args.join(' ');

const getCommandObject = (commands, command) => commands.find(commandObject => commandObject.key === command);

const errorHandler = () => new MessageEmbed().setColor('#FF0000').setTitle('Ошибка! Напишите "-help", чтобы открыть справку.').setDescription(ERROR_MESSAGE);

export const utils = {
    swapButtons,
    swapLanguages,
    getHelpMessage,
    errorHandler,
    getArgs,
    getCommand,
    getRequestedMessage,
    getCommandObject
};