export default class Model {
    constructor(initialAppData) {
        this.isPreviewMode = initialAppData.isPreviewMode;
        this.content = initialAppData.content;
        this.menuPresets = initialAppData.menuPresets;
        this.contentEditIndex = initialAppData.contentEditIndex;
        this.isEditingPreset = initialAppData.isEditingPreset;
        this.customTitle = initialAppData.customTitle;
    }
}
