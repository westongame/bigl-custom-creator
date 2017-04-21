export class PresetItem {
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
    }

    validate() {
        //
        this.imageError = !this.imageSrc;
        this.titleError = !this.title;
        this.linkError = !this.link;
        //
        return !!this.imageSrc && !!this.link && !!this.title;
    }
}

export class Preset {
    constructor(config) {
        this.children = config.map((itemConfig) => new PresetItem(itemConfig));
    }

    validate() {
        return this.children.filter((presetItem) => !presetItem.validate()).length === 0;
    }
}

export class MenuLink {
    constructor(config) {
        if (config === undefined) {
            config = {};
        }
        this.text = config.text || '';
        this.textError = config.textError || false;
        this.href = config.href || '';
        this.hrefError = config.hrefError || false;
    }

    validate() {
        //
        this.textError = !this.text;
        this.hrefError = !this.href;
        //
        return !!this.text && !!this.href;
    }
}

export class MenuPreset {
    constructor(config) {
        if (config === undefined) {
            config = {};
        }
        if (config.links === undefined) {
            config.links = [{}];
        }
        this.title = config.title || '';
        this.titleError = config.titleError || false;
        this.links = config.links.map((linkConfig) => new MenuLink(linkConfig));
    }

    validate() {
        //
        this.titleError = !this.title;
        //
        const isValidChildren = this.links.filter((link) => !link.validate()).length === 0;
        return isValidChildren && !!this.title;
    }
}
