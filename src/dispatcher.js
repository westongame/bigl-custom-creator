import { TanokDispatcher, on } from 'tanok';

export default class AppDispatcher extends TanokDispatcher {
    @on('editingMenuPresetIndex')
    editingMenuPresetIndex(payload, state) {
        state.indexOfEditingMenuPreset = payload;
        return [state];
    }

    @on('onMenuPresetEdit')
    onMenuPresetEdit(payload, state) {
        state.isEditingMenuPreset = payload;
        return [state];
    }

    @on('onPresetEdit')
    onPresetEdit(payload, state) {
        state.isEditingPreset = payload;
        return [state];
    }
    
    @on('onTitleEdit')
    onTitleEdit(payload, state) {
        state.customTitle = payload;
        return [state];
    }

    @on('updateMenuPresets')
    updateMenuPresets(payload, state) {
        state.menuPresets = payload;
        return [state];
    }
}
