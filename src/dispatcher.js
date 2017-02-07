import { TanokDispatcher, on } from 'tanok';

export default class AppDispatcher extends TanokDispatcher {
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
}
