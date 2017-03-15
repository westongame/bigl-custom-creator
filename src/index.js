import { tanok } from 'tanok';

import AppDispatcher from './dispatcher';
import Model from './model';

import App from './components/app';

import { menuPresetTemplate } from './templates/menuPreset';

import css from './style/index.styl'; // eslint-disable-line no-unused-vars

const node = document.getElementById('app');

let initialAppData = {
    isPreviewMode: false,
    content: [],
    menuPresets: {
        structure: menuPresetTemplate,
        isEditing: false,
        editingIndex: 0,
        editingLinksCount: 0,
    },
    contentEditIndex: 0,
    isEditingPreset: false,
    customTitle: 'Untitled',
};

try {
    const persistedState = localStorage.getItem('bccAppState');
    if (persistedState) {
        initialAppData = JSON.parse(persistedState);
    }
} catch (err) {
    throw new Error(`Unable to get saved application state`);
}

tanok(
    new Model(initialAppData),
    (new AppDispatcher()).collect(),
    App,
    {
        container: node,
    }
);
