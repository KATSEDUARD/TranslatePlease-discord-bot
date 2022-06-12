import { botActions } from '../actions/botActions.js';

export const commands = [
    {
        key: 'help',
        action(msg) {
            botActions.helpHandler(msg);
        }
    },
    {
        key: 'langs',
        action(msg) {
            botActions.displayLanguages(msg);
        }
    },
    {
        key: 'tp',
        action(msg, text) {
            botActions.translateMessage(msg, text);
        }
    },
    {
        key: 'voc',
        action(msg) {
            botActions.downloadVocabulary(msg);
        }
    },
    {
        key: 'clvoc',
        action(msg) {
            botActions.clearVocabulary(msg);
        }
    },
    {
        key: 'ping',
        action(msg) {
            botActions.pong(msg);
        }
    }
];