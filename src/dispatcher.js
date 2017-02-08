import { TanokDispatcher, on } from 'tanok';

export default class AppDispatcher extends TanokDispatcher {
    @on('previewMode')
    previewMode(payload, state) {
        state.isPreviewMode = payload;
        return [state];
    }
    
    @on('onTitleEdit')
    onTitleEdit(payload, state) {
        state.customTitle = payload;
        return [state];
    }

    @on('updateMenuPresets')
    updateMenuPresets(payload, state) {
        state.menuPresets.structure = payload;
        return [state];
    }

    @on('onMenuPresetEdit')
    onMenuPresetEdit(payload, state) {
        state.menuPresets.isEditing = payload;
        return [state];
    }

    @on('editingMenuPresetIndex')
    editingMenuPresetIndex(payload, state) {
        state.menuPresets.editingIndex = payload;
        return [state];
    }

    @on('editingMenuPresetLinksCount')
    editingMenuPresetLinksCount(payload, state) {
        state.menuPresets.editingLinksCount = payload;
        return [state];
    }

    @on('onPresetEdit')
    onPresetEdit(payload, state) {
        state.isEditingPreset = payload;
        return [state];
    }

    @on('setContentEditIndex')
    setContentEditIndex(payload, state) {
        state.contentEditIndex = payload;
        return [state];
    }

    @on('updateContentItem')
    updateContentItem(payload, state) {
        state.content[state.contentEditIndex] = payload
        return [state];
    }

    @on('AddPreset')
    AddPreset(payload, state) {
        state.content.push(payload);
        return [state];
    }

    @on('DeletePreset')
    DeletePreset(payload, state) {
        state.content.splice(payload, 1);
        return [state];
    }
}
