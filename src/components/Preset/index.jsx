import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import CustomPropTypes from '../../customPropTypes';
import { ImgPlaceholder } from '../../svg';

import cssGrid from '../../style/blocks/grid/index.styl';
import cssImage from '../../style/blocks/image-holder/index.styl';

export default class Preset extends React.Component {
    makeGridColumn(column, id) {
        return (
            <div
                key={id}
                className={classNames(
                    cssGrid.grid__column,
                    { [cssGrid.grid__column_size_big]: column.size >= 2 },
                )}
            >
                {column.rows.length > 1
                    ? column.rows.map((item, key) => this.makeGridRow(item, key))
                    : column.rows[0].content.map((item, key) => this.makeGridItem(item, key))
                }
            </div>
        );
    }

    makeGridRow(row, id) {
        return (
            <div
                key={id}
                className={cssGrid.grid__row}
            >
                {row.content.map((item, key) => this.makeGridItem(item, key))}
            </div>
        );
    }

    makeGridItem(content, id) {
        let image = <ImgPlaceholder className={cssImage.imageHolder__placeholder} />;

        if (content.imageSrc) {
            image = <img className={cssImage.imageHolder__img} src={content.imageSrc} alt={content.title || ''} />;
        }

        return (
            <a
                key={id}
                className={cssGrid.grid__item}
                href={content.link}
                title={content.title}
            >
                <div
                    className={classNames(
                        cssImage.imageHolder,
                        { [cssImage.imageHolder_type_bordered]: !this.props.isPreviewMode },
                    )}
                >
                    {image}
                </div>
            </a>
        );
    }

    generateMarkup(structure) {
        function contains(array, item) {
            return Array.isArray(array) ? array.indexOf(item) !== -1 : undefined;
        }

        function sameArray(array1, array2) {
            return Array.isArray(array1) && Array.isArray(array2)
                ? array1.every((item) => contains(array2, item))
                : undefined;
        }

        const columns = structure.reduce((result, item) => {
            if (
                !structure.some((col) => contains(col.column, item.column))
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

        structure.forEach((item) => {
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

        return columns.map((column, _key) => this.makeGridColumn(column, _key));
    }

    render() {
        return (
            <div
                className={classNames(
                    cssGrid.grid,
                    {
                        [cssGrid.grid_type_smartphonePreview]:
                            this.props.isPreviewMode && this.props.previewDevice === 'smartphone',
                    },
                )}
            >
                {this.generateMarkup(this.props.structure)}
            </div>
        );
    }
}

Preset.propTypes = {
    isPreviewMode: PropTypes.bool,
    previewDevice: PropTypes.string,
    structure: CustomPropTypes.preset.isRequired,
};
