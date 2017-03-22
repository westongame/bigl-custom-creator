import { TanokDispatcher, on } from 'tanok';

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
            }
        } catch (err) {
            throw new Error(`Unable to get saved application state`);
        }
        return [state];
    }

    @on('previewMode')
    previewMode(payload, state) {
        state.isPreviewMode = payload;
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
        state.contentEditIndex = payload;
        return [state];
    }

    @on('updateContentItem')
    updateContentItem(payload, state) {
        state.content[state.contentEditIndex] = payload;
        return [state, saveAppState(state)];
    }

    @on('AddPreset')
    AddPreset(payload, state) {
        state.content.push(payload);
        return [state, saveAppState(state)];
    }

    @on('DeletePreset')
    DeletePreset(payload, state) {
        state.content.splice(payload, 1);
        return [state, saveAppState(state)];
    }
}
