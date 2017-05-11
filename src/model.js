export default class Model {
    constructor(initialAppData) {
        this.isPreviewMode = false;
        this.isFullScreen = false;
        this.previewDevice = 'desktop';
        this.showErrorPopup = false;
        this.editMode = '';
        this.editingIndex = null;
        this.customTitle = { text: '', error: false };
        this.menuPresets = [];
        this.content = [];
        this.presetTemplates = initialAppData.presetTemplates;
        this.onExportJSON = initialAppData.onExportJSON;

        if (initialAppData.importJSON) {
            this.customTitle.text = initialAppData.importJSON.title;
            this.menuPresets = initialAppData.importJSON.menu;
            this.content = initialAppData.importJSON.content;
        }
    }
}
