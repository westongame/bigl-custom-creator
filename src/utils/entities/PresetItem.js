export default class PresetItem {
    constructor(config) {
        this.row = config.row;
        this.column = config.column;
        this.title = config.title || '';
        this.link = config.link || '';
        this.imageSrc = config.imageSrc || '';
        this.imageName = config.imageName || '';
        this.imageError = config.imageError || false;
        this.titleError = config.titleError || false;
        this.linkError = config.linkError || false;

        this.validate = this.validate.bind(this);
        this.update = this.update.bind(this);
    }

    validate() {
        //
        this.imageError = !this.imageSrc;
        this.titleError = !this.title;
        this.linkError = !this.link;
        //
        return !!this.imageSrc && !!this.link && !!this.title;
    }

    update(updates) {
        Object.keys(updates).forEach((prop) => {
            this[prop] = updates[prop];
        });
    }
}
