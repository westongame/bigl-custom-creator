import { TanokDispatcher, on } from 'tanok';

import { presetTemplates } from './templates';
import { Preset, MenuPreset } from './utils/entities';
import { isHistoryInitialized, initHistory, saveHistory, historyBack, historyForward } from './utils/history';

const effect = (fn, state) => fn.bind(null, state);

const restoreEntities = (state) => {
    state.content = state.content.map((config) => new Preset(config.children));
    state.menuPresets = state.menuPresets.map((config) => new MenuPreset(config));
    state.presetTemplates = presetTemplates.map((config) => new Preset(config));
};

export default class AppDispatcher extends TanokDispatcher {
    @on('init')
    init(payload, state) {
        if (process.env.NODE_ENV === 'development') {
            localStorage.clear();
        }
        if (!isHistoryInitialized()) {
            state.menuPresets = [new MenuPreset()];
            state.presetTemplates = presetTemplates.map((config) => new Preset(config));
        }
        return [initHistory(state), effect(restoreEntities, state)];
    }

    @on('Undo')
    Undo(payload, state) {
        state = historyBack(state);
        restoreEntities(state);
        return [state];
    }

    @on('Redo')
    Redo(payload, state) {
        state = historyForward(state);
        restoreEntities(state);
        return [state];
    }

    @on('previewMode')
    previewMode(payload, state) {
        state.isPreviewMode = !state.isPreviewMode;
        return [state];
    }

    @on('previewDevice')
    previewDevice(payload, state) {
        state.previewDevice = payload;
        return [state];
    }

    @on('toggleErrorPopup')
    toggleErrorPopup(payload, state) {
        state.showErrorPopup = !state.showErrorPopup;
        return [state];
    }

    @on('downloadJSON')
    downloadJSON(payload, state) {
        const validate = (array) => array.filter((item) => !item.validate()).length === 0;
        const isValidMenuPresets = validate(state.menuPresets);
        const isValidContent = validate(state.content);
        const isValidTitle = !!state.customTitle.text;

        state.customTitle.error = !isValidTitle;

        if (isValidMenuPresets && isValidContent && isValidTitle) {
            const link = payload.currentTarget;
            const data = {
                title: state.customTitle.text,
                menu: state.menuPresets,
                content: state.contentStructure,
            };
            const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });

            link.href = URL.createObjectURL(blob);
            link.download = `${state.customTitle.text}.json`;
            URL.revokeObjectURL(blob);
        } else {
            payload.preventDefault();
            state.editMode = '';
            state.showErrorPopup = true;
        }
        return [state];
    }

    @on('updateEditMode')
    updateEditMode(payload, state) {
        state.editMode = payload;
        return [state];
    }

    @on('updateEditingIndex')
    updateEditingIndex(payload, state) {
        state.editingIndex = payload;
        return [state];
    }

    @on('updateCustomTitle')
    updateCustomTitle(payload, state) {
        state.customTitle = payload;
        return [state, effect(saveHistory, state)];
    }

    @on('addMenuPreset')
    addMenuPreset(payload, state) {
        state.menuPresets.push(new MenuPreset(payload));
        return [state, effect(saveHistory, state)];
    }

    @on('updateMenuPresets')
    updateMenuPresets(payload, state) {
        state.menuPresets = payload;
        return [state, effect(saveHistory, state)];
    }

    @on('updateContentPresets')
    updateContentPresets(payload, state) {
        state.content = payload;
        return [state, effect(saveHistory, state)];
    }

    @on('updateContentItem')
    updateContentItem(payload, state) {
        state.content[state.editingIndex] = new Preset(payload);
        return [state, effect(saveHistory, state)];
    }

    @on('addPreset')
    addPreset(payload, state) {
        state.content.push(new Preset(payload));
        return [state, effect(saveHistory, state)];
    }

    @on('deletePreset')
    deletePreset(payload, state) {
        state.content.splice(payload, 1);
        return [state, effect(saveHistory, state)];
    }

    @on('movePreset')
    movePreset(payload, state) {
        const presetItem = state[payload.array].splice(payload.index + payload.direction, 1)[0];
        state[payload.array].splice(payload.index, 0, presetItem);
        return [state, effect(saveHistory, state)];
    }
}
