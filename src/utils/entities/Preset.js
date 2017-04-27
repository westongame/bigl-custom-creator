import PresetItem from './PresetItem';

export default class Preset {
    constructor(config) {
        this.children = config.map((itemConfig) => new PresetItem(itemConfig));

        this.validate = this.validate.bind(this);
        this.updateChild = this.updateChild.bind(this);
        this.generateMarkupData = this.generateMarkupData.bind(this);
        this.serialize = this.serialize.bind(this);
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

    serialize() {
        return {
            children: this.children.map((block) => ({
                title: block.title,
                link: block.link,
                imageSrc: block.imageSrc,
                row: block.row,
                column: block.column,
            })),
        };
    }
}
