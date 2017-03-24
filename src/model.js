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
        this.menuPresets = [];
        this.content = [];
    }
}
