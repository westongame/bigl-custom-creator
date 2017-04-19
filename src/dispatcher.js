import { TanokDispatcher, on } from 'tanok';

import { menuPresetTemplate } from './templates';
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
            state.menuPresets = JSON.parse(JSON.stringify([menuPresetTemplate]));
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

    @on('errorPopup')
    errorPopup(payload, state) {
        state.showErrorPopup = payload;
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

    @on('setContentEditIndex')
    setContentEditIndex(payload, state) {
        state.editingIndex = payload;
        return [state];
    }

    @on('updateContentItem')
    updateContentItem(payload, state) {
        state.content[state.editingIndex] = payload;
        return [state, effect(saveHistory, state)];
    }

    @on('addPreset')
    addPreset(payload, state) {
        state.content.push(payload);
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
