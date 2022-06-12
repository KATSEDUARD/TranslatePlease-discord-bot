import { utils } from '../utils/utils.js';
import { langsObject } from '../store/languages.js';

const onButton = async interaction => {
    if (!interaction.isButton()) return;

    const components = interaction.message.components[0].components;
    const enBtn = await components.find(e => e.customId === 'EN');
    const ruBtn = await components.find(e => e.customId === 'RU');

    await utils.swapLanguages(langsObject);
    utils.swapButtons(interaction, enBtn, ruBtn);
};

export { onButton };