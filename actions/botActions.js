import translate from 'translate-google';
import * as fastcsv from 'fast-csv';
import * as fs from 'fs';
import { vocabulary } from '../store/vocabulary.js';
import { utils } from '../utils/utils.js';
import { constants } from '../constants.js';
import { MessageActionRow, MessageButton } from 'discord.js';
import { langsObject } from '../store/languages.js';

const { EMPTY_VOCABULARY, CLEAR_VOCABULARY, VOCABULARY_DESCRIPTION, VOCABULARY_NAME, VOCABULARY_PATH } = constants;

const helpHandler = msg => {
    try {
        msg.reply({ embeds: [utils.getHelpMessage()]})
    }
    catch(err) {
        return msg.reply({ embeds: [utils.errorHandler()]});
    }
};

const writeDownToVocabulary = vocabulary => {
    try {
        const ws = fs.createWriteStream(VOCABULARY_NAME, { flags: 'w' });
        fastcsv.write(vocabulary, { headers: true }).pipe(ws);
    } catch (err) {
        return msg.reply({ embeds: [utils.errorHandler()]});
    }
};

const downloadVocabulary = msg => {
    const file = {
        files: [VOCABULARY_PATH],
        name: VOCABULARY_NAME,
        description: VOCABULARY_DESCRIPTION,
    };

    if (vocabulary.length < 1) {
        msg.reply(EMPTY_VOCABULARY);
    } else {
        try {
            msg.reply(file);
        } catch (err) {
            return msg.reply({ embeds: [utils.errorHandler()]});
        }
    }
};

const clearVocabulary = msg => {
    try {
        vocabulary.length = 0;
        writeDownToVocabulary(vocabulary);
        msg.reply(CLEAR_VOCABULARY);
    } catch (err) {
        return msg.reply({ embeds: [utils.errorHandler()]});
    }
};

const displayLanguages = msg => {
    const row = new MessageActionRow()
    .addComponents(
        new MessageButton()
            .setCustomId('EN')
            .setLabel('EN')
            .setDisabled(true)
            .setStyle('SECONDARY')
    )
    .addComponents(
        new MessageButton()
            .setCustomId('swap')
            .setEmoji('🔁')
            .setStyle('PRIMARY')
    )
    .addComponents(
        new MessageButton()
            .setCustomId('RU')
            .setLabel('RU')
            .setDisabled(true)
            .setStyle('SECONDARY')
    );
    return msg.channel.send({content: 'Выберите языки', components: [row]});
};

const translateMessage = (msg, text) => {
    translate(text, langsObject)
        .then((res) => {
            msg.reply(res);
            const note = { Слово: text, Перевод: res };
            vocabulary.push(note);
            writeDownToVocabulary(vocabulary);
        })
        .catch((err) => {
            return msg.reply({ embeds: [utils.errorHandler()]});
        });
};

const pong = msg => msg.reply('pong!');

export const botActions = {
    displayLanguages,
    helpHandler,
    clearVocabulary,
    translateMessage,
    pong,
    downloadVocabulary,
};
