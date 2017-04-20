import { TanokDispatcher, on } from 'tanok';

import { Preset, MenuPreset } from './utils/entities';
import { isHistoryInitialized, initHistory, saveHistory, historyBack, historyForward } from './utils/history';

function effect(fn, state) {
    return fn.bind(null, state);
}

export default class AppDispatcher extends TanokDispatcher {
    @on('init')
    init(payload, state) {
        if (process.env.NODE_ENV === 'development') {
            localStorage.clear();
        }
        if (!isHistoryInitialized()) {
            state.menuPresets = [new MenuPreset()];
        }
        return [initHistory(state)];
    }

    @on('Undo')
    Undo(payload, state) {
        return [historyBack(state)];
    }

    @on('Redo')
    Redo(payload, state) {
        return [historyForward(state)];
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
        state.content[state.editingIndex] = payload;
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
