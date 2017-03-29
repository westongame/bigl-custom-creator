import { TanokDispatcher, on } from 'tanok';
import { menuPresetTemplate } from './templates/menuPreset';

const HISTORY_LIMIT = 20;

function saveAppState(state) {
    return function writeToStorage() {
        try {
            const history = JSON.parse(localStorage.getItem('bccAppState-history'));
            const currentId = history.idMap[history.step];
            const newState = JSON.stringify(state);
            const savedState = localStorage.getItem(`bccAppState-${currentId}`);

            if (savedState !== newState) {
                const newId = Date.now();

                localStorage.setItem(`bccAppState-${newId}`, newState);
                history.idMap.splice(0, history.step, newId);
                history.step = 0;

                if (history.idMap.length > HISTORY_LIMIT) {
                    localStorage.removeItem(`bccAppState-${history.idMap.pop()}`);
                }

                localStorage.setItem('bccAppState-history', JSON.stringify(history));
            }
        } catch (err) {
            throw new Error(`Unable to save application state`);
        }
    };
}

export default class AppDispatcher extends TanokDispatcher {
    @on('init')
    init(payload, state) {
        const initialHistoryState = {
            step: 0,
            idMap: [0],
        };

        state.menuPresets = JSON.parse(JSON.stringify(menuPresetTemplate));

        //
        localStorage.clear();
        //

        try {
            const historyRaw = localStorage.getItem('bccAppState-history');

            if (historyRaw) {
                const history = JSON.parse(historyRaw);
                const currentId = history.idMap[history.step];
                const savedState = localStorage.getItem(`bccAppState-${currentId}`);

                if (savedState) {
                    const stateProps = JSON.parse(savedState);

                    Object.keys(stateProps).forEach((item) => {
                        state[item] = stateProps[item];
                    });
                }
            } else {
                localStorage.setItem('bccAppState-history', JSON.stringify(initialHistoryState));
                localStorage.setItem('bccAppState-0', JSON.stringify(state));
            }
        } catch (err) {
            throw new Error(`Unable to get saved application state`);
        }

        return [state];
    }

    @on('historyBack')
    historyBack(payload, state) {
        try {
            const historyRaw = localStorage.getItem('bccAppState-history');

            if (historyRaw) {
                const history = JSON.parse(historyRaw);
                const previousId = history.idMap[history.step + 1];
                const previousState = localStorage.getItem(`bccAppState-${previousId}`);

                if (previousState) {
                    const stateProps = JSON.parse(previousState);

                    Object.keys(stateProps).forEach((item) => {
                        state[item] = stateProps[item];
                    });

                    history.step++;
                    localStorage.setItem('bccAppState-history', JSON.stringify(history));
                }
            }
        } catch (err) {
            throw new Error(`Unable to rewind changes`);
        }
        return [state];
    }

    @on('historyForward')
    historyForward(payload, state) {
        try {
            const historyRaw = localStorage.getItem('bccAppState-history');

            if (historyRaw) {
                const history = JSON.parse(historyRaw);
                const nextId = history.idMap[history.step - 1];
                const nextState = localStorage.getItem(`bccAppState-${nextId}`);

                if (nextState) {
                    const stateProps = JSON.parse(nextState);

                    Object.keys(stateProps).forEach((item) => {
                        state[item] = stateProps[item];
                    });

                    history.step--;
                    localStorage.setItem('bccAppState-history', JSON.stringify(history));
                }
            }
        } catch (err) {
            throw new Error(`Unable to rewind changes`);
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
