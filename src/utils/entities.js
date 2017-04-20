export class PresetItem {
    constructor(config) {
        this.row = config.row;
        this.column = config.column;
        this.title = config.title || '';
        this.link = config.link || '';
        this.imageSrc = config.imageSrc || '';
        this.imageName = config.imageName || '';
        this.imageError = config.imageError || false;
        this.linkError = config.linkError || false;
        this.titleError = config.titleError || false;
    }
}

export class Preset {
    constructor(config) {
        return config.map((itemConfig) => new PresetItem(itemConfig));
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
}
