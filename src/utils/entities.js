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

export class Preset {
    constructor(config) {
        this.children = config.map((itemConfig) => new PresetItem(itemConfig));

        this.validate = this.validate.bind(this);
        this.updateChild = this.updateChild.bind(this);
        this.generateMarkupData = this.generateMarkupData.bind(this);
    }

    validate() {
        return this.children.filter((presetItem) => !presetItem.validate()).length === 0;
    }

    updateChild(index, updates) {
        this.children[index].update(updates);
    }

    generateMarkupData() {
        function contains(array, item) {
            return Array.isArray(array) ? array.indexOf(item) !== -1 : undefined;
        }

        function sameArray(array1, array2) {
            return Array.isArray(array1) && Array.isArray(array2)
                ? array1.every((item) => contains(array2, item))
                : undefined;
        }

        const columns = this.children.reduce((result, item) => {
            if (
                !this.children.some((col) => contains(col.column, item.column))
                && !result.some((col) => contains(col.column, item.column))
            ) {
                result.push({
                    column: [].concat(item.column),
                    size: item.column.length,
                    rows: [],
                });
            }
            return result;
        }, []);

        this.children.forEach((item) => {
            const currentColumn = columns.filter(
                (col) => contains(col.column, item.column) || sameArray(col.column, item.column)
            )[0];

            const currentRow = currentColumn.rows.filter(
                (row) => contains(row.row, item.row) || sameArray(row.row, item.row)
            )[0];

            if (currentRow) {
                currentRow.content.push(item);
            } else {
                currentColumn.rows.push({
                    row: [].concat(item.row),
                    content: [item],
                });
            }
        });

        return columns;
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

        this.validate = this.validate.bind(this);
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

        this.validate = this.validate.bind(this);
    }

    validate() {
        //
        this.titleError = !this.title;
        //
        const isValidChildren = this.links.filter((link) => !link.validate()).length === 0;
        return isValidChildren && !!this.title;
    }
}
