import { TanokDispatcher, on } from 'tanok';

import { presetTemplates } from './templates';
import { Preset, MenuPreset } from './utils/entities';
import { isHistoryInitialized, initHistory, saveHistory, historyBack, historyForward } from './utils/history';

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
        saveHistory(state);
        return [state];
    }

    @on('addMenuPreset')
    addMenuPreset(payload, state) {
        state.menuPresets.push(new MenuPreset(payload));
        saveHistory(state);
        return [state];
    }

    @on('updateMenuPresets')
    updateMenuPresets(payload, state) {
        state.menuPresets = payload;
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
