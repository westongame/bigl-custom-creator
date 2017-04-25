export default class MenuLink {
    constructor(config) {
        if (config === undefined) {
            config = {};
        }

        this.text = config.text || '';
        this.textError = config.textError || false;
        this.href = config.href || '';
        this.hrefError = config.hrefError || false;

        this.validate = this.validate.bind(this);
        this.update = this.update.bind(this);
    }

    validate() {
        //
        this.textError = !this.text;
        this.hrefError = !this.href;
        //
        return !!this.text && !!this.href;
    }

    update(updates) {
        Object.keys(updates).forEach((prop) => {
            this[prop] = updates[prop];
        });
    }
}
