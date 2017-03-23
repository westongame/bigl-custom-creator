import { menuPresetTemplate } from './templates/menuPreset';

export default class Model {
    constructor() {
        this.isPreviewMode = false;
        this.showErrorPopup = false;
        this.editMode = '';
        this.editingIndex = null;
        this.customTitle = {
            text: '',
            error: false,
            isEditing: false,
        };
        this.menuPresets = {
            structure: JSON.parse(JSON.stringify(menuPresetTemplate)),
            editingLinksCount: null, // TODO i think it can be removed
        };
        this.content = [];
        this.contentEditIndex = 0; // TODO replace this state with 'editingIndex'
    }
}
