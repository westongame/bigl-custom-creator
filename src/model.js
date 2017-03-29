export default class Model {
    constructor() {
        this.isPreviewMode = false;
        this.previewDevice = 'desktop';
        this.showErrorPopup = false;
        this.editMode = '';
        this.editingIndex = null;
        this.customTitle = {
            text: '',
            error: false,
        };
        this.menuPresets = [];
        this.content = [];
    }
}
