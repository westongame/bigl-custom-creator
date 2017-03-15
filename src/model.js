import { menuPresetTemplate } from './templates/menuPreset';

export default class Model {
    constructor() {
        this.isPreviewMode = false;
        this.content = [];
        this.menuPresets = {
            structure: menuPresetTemplate,
            isEditing: false,
            editingIndex: 0,
            editingLinksCount: 0,
        };
        this.contentEditIndex = 0;
        this.isEditingPreset = false;
        this.customTitle = 'Untitled';
    }
}
