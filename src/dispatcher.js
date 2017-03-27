import { TanokDispatcher, on } from 'tanok';
import { menuPresetTemplate } from './templates/menuPreset';

function saveAppState(state) {
    return function writeToStorage() {
        try {
            const persistedState = JSON.stringify(state);
            if (localStorage.getItem('bccAppState') !== persistedState) {
                localStorage.setItem('bccAppState', persistedState);
            }
        } catch (err) {
            throw new Error(`Unable to save application state`);
        }
    };
}

export default class AppDispatcher extends TanokDispatcher {
    @on('init')
    init(payload, state) {
        try {
            const persistedState = localStorage.getItem('bccAppState');
            if (persistedState) {
                const stateProps = JSON.parse(persistedState);
                Object.keys(stateProps).forEach((item) => {
                    state[item] = stateProps[item];
                });
            } else {
                state.menuPresets = JSON.parse(JSON.stringify(menuPresetTemplate));
            }
        } catch (err) {
            throw new Error(`Unable to get saved application state`);
        }
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
        return [state, saveAppState(state)];
    }

    @on('updateMenuPresets')
    updateMenuPresets(payload, state) {
        state.menuPresets = payload;
        return [state, saveAppState(state)];
    }

    @on('updateContentPresets')
    updateContentPresets(payload, state) {
        state.content = payload;
        return [state, saveAppState(state)];
    }

    @on('setContentEditIndex')
    setContentEditIndex(payload, state) {
        state.editingIndex = payload;
        return [state];
    }

    @on('updateContentItem')
    updateContentItem(payload, state) {
        state.content[state.editingIndex] = payload;
        return [state, saveAppState(state)];
    }

    @on('addPreset')
    addPreset(payload, state) {
        state.content.push(payload);
        return [state, saveAppState(state)];
    }

    @on('deletePreset')
    deletePreset(payload, state) {
        state.content.splice(payload, 1);
        return [state, saveAppState(state)];
    }

    @on('movePreset')
    movePreset(payload, state) {
        const presetItem = state[payload.array].splice(payload.index + payload.direction, 1)[0];
        state[payload.array].splice(payload.index, 0, presetItem);
        return [state, saveAppState(state)];
    }
}
