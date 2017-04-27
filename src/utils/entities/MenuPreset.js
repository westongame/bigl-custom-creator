import MenuLink from './MenuLink';

export default class MenuPreset {
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

        this.validate = this.validate.bind(this);
        this.update = this.update.bind(this);
        this.serialize = this.serialize.bind(this);
    }

    validate() {
        //
        this.titleError = !this.title;
        //
        const isValidChildren = this.links.filter((link) => !link.validate()).length === 0;
        return isValidChildren && !!this.title;
    }

    update(index, updates) {
        if (index !== null) {
            this.links[index].update(updates);
        } else {
            Object.keys(updates).forEach((prop) => {
                this[prop] = updates[prop];
            });
        }
    }

    serialize() {
        return {
            title: this.title,
            links: this.links.map((link) => ({
                text: link.text,
                href: link.href,
            })),
        };
    }
}
