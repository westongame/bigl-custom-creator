import { TanokDispatcher, on } from 'tanok';

import { Preset, MenuPreset, MenuLink } from './utils/entities';
import { isHistoryInitialized, initHistory, saveHistory, historyBack, historyForward } from './utils/history';

const restoreEntities = (state) => {
    state.content = state.content.map((config) => new Preset(config.children));
    state.menuPresets = state.menuPresets.map((config) => new MenuPreset(config));
    state.presetTemplates = state.presetTemplates.map((config) => new Preset(config.children));
};

export default class AppDispatcher extends TanokDispatcher {
    @on('init')
    init(payload, state) {
        if (!isHistoryInitialized()) {
            state.menuPresets = [new MenuPreset()];
            state.presetTemplates = state.presetTemplates.map((config) => new Preset(config));
        }
        state = initHistory(state);
        restoreEntities(state);
        return [state];
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

    @on('toggleFullScreen')
    toggleFullScreen(payload, state) {
        state.isFullScreen = !state.isFullScreen;
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

    @on('ImportJSON')
    ImportJSON(payload, state) {
        const file = payload.target.files[0];
        const reader = new FileReader();

        const importState = () => {
            return (stream) => {
                reader.onload = (event) => {
                    const importedData = JSON.parse(event.target.result);

                    state.customTitle = { text: importedData.title, error: false };
                    state.menuPresets = importedData.menu;
                    state.content = importedData.content;
                    saveHistory(state);

                    stream.send('init');
                };

                if (file) {
                    reader.readAsText(file);
                }
            };
        };

        return [state, importState()];
    }

    @on('ExportJSON')
    ExportJSON(payload, state) {
        const validate = (array) => array.filter((item) => !item.validate()).length === 0;
        const isValidMenuPresets = validate(state.menuPresets);
        const isValidContent = validate(state.content);
        const isValidTitle = !!state.customTitle.text;

        state.customTitle.error = !isValidTitle;

        if (isValidMenuPresets && isValidContent && isValidTitle) {
            const link = payload.currentTarget;
            const data = {
                title: state.customTitle.text,
                menu: state.menuPresets.map((item) => item.serialize()),
                content: state.content.map((item) => item.serialize()),
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

    @on('setEditMode')
    setEditMode(payload, state) {
        const [editMode, index] = payload;
        state.editMode = editMode;
        state.editingIndex = index;
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
        saveHistory(state);
        return [state];
    }

    @on('addMenuPreset')
    addMenuPreset(payload, state) {
        state.menuPresets.push(new MenuPreset(payload));
        saveHistory(state);
        return [state];
    }

    @on('deleteMenuPreset')
    deleteMenuPreset(payload, state) {
        state.menuPresets.splice(payload, 1);
        if (state.editingIndex === payload) {
            state.editingIndex = 0;
        } else if (state.editingIndex > payload) {
            state.editingIndex--;
        }
        if (state.menuPresets.length === 0) {
            state.editMode = '';
        }
        saveHistory(state);
        return [state];
    }

    @on('addMenuLink')
    addMenuLink(payload, state) {
        state.menuPresets[state.editingIndex].links.push(new MenuLink());
        saveHistory(state);
        return [state];
    }

    @on('deleteMenuLink')
    deleteMenuLink(payload, state) {
        state.menuPresets[state.editingIndex].links.splice(payload, 1);
        saveHistory(state);
        return [state];
    }

    @on('syncMenuText')
    syncMenuText(payload, state) {
        state.menuPresets[state.editingIndex].update(...payload);
        return [state];
    }

    @on('updateMenuPreset')
    updateMenuPreset(payload, state) {
        state.menuPresets[state.editingIndex].update(...payload);
        saveHistory(state);
        return [state];
    }

    @on('updateContentPresets')
    updateContentPresets(payload, state) {
        state.content = payload;
        saveHistory(state);
        return [state];
    }

    @on('uploadImage')
    uploadImage(payload, state) {
        const [e, index] = payload;
        const file = e.target.files[0];
        const reader = new FileReader();

        const updateImage = () => {
            return (stream) => {
                reader.onload = (event) => {
                    stream.send('updateContentItem', [index, {
                        imageSrc: event.target.result,
                        imageName: file.name,
                        imageError: false,
                    }]);
                };

                if (file) {
                    reader.readAsDataURL(file);
                }
            };
        };

        return [state, updateImage()];
    }

    @on('updateContentItem')
    updateContentItem(payload, state) {
        state.content[state.editingIndex].updateChild(...payload);
        saveHistory(state);
        return [state];
    }

    @on('addPreset')
    addPreset(payload, state) {
        state.content.push(new Preset(payload));
        saveHistory(state);
        return [state];
    }

    @on('deletePreset')
    deletePreset(payload, state) {
        state.content.splice(payload, 1);
        if (state.editingIndex === payload) {
            state.editingIndex = 0;
        } else if (state.editingIndex > payload) {
            state.editingIndex--;
        }
        if (state.content.length === 0) {
            state.editMode = '';
        }
        saveHistory(state);
        return [state];
    }

    @on('movePreset')
    movePreset(payload, state) {
        const presetItem = state[payload.array].splice(payload.index + payload.direction, 1)[0];
        state[payload.array].splice(payload.index, 0, presetItem);
        saveHistory(state);
        return [state];
    }
}
