import { TanokDispatcher, on } from 'tanok';

export default class AppDispatcher extends TanokDispatcher {
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
}
