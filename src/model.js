export default class Model {
    constructor() {
        this.isEditingMenuPreset = false;
        this.indexOfEditingMenuPreset = -1;
        this.isEditingPreset = false;
        this.customTitle = 'Untitled';
        this.menuPresets = [
            {
                title: 'Title',
                links: [
                    {
                        text: 'Link'
                    }
                ]
            }
        ];
    }
}
