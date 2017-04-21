import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import CustomPropTypes from '../../customPropTypes';
import { ImgPlaceholder } from '../../svg';

import cssGrid from '../../style/blocks/grid/index.styl';
import cssImage from '../../style/blocks/image-holder/index.styl';

export default class Preset extends React.Component {
    constructor(props) {
        super(props);

        this.makeGridColumn = this.makeGridColumn.bind(this);
        this.makeGridRow = this.makeGridRow.bind(this);
        this.makeGridItem = this.makeGridItem.bind(this);
    }

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
                    ? column.rows.map(this.makeGridRow)
                    : column.rows[0].content.map(this.makeGridItem)
                }
            </div>
        );
    }

    makeGridRow(row, id) {
        return (
            <div key={id} className={cssGrid.grid__row}>
                {row.content.map(this.makeGridItem)}
            </div>
        );
    }

    makeGridItem(content, id) {
        const linkAttrs = {};
        let image = <ImgPlaceholder className={cssImage.imageHolder__placeholder} />;

        if (content.imageSrc) {
            image = <img className={cssImage.imageHolder__img} src={content.imageSrc} alt={content.title || ''} />;
        }

        if (this.props.isPreviewMode) {
            linkAttrs.href = content.link;
            linkAttrs.title = content.title;
        }

        return (
            <a key={id} className={cssGrid.grid__item} {...linkAttrs}>
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

    render() {
        const { isPreviewMode, previewDevice, structure } = this.props;

        return (
            <div
                className={classNames(
                    cssGrid.grid,
                    { [cssGrid.grid_type_smartphonePreview]: isPreviewMode && previewDevice === 'smartphone' },
                )}
            >
                {structure.map(this.makeGridColumn)}
            </div>
        );
    }
}

Preset.propTypes = {
    isPreviewMode: PropTypes.bool,
    previewDevice: PropTypes.string,
    structure: CustomPropTypes.presetMarkupData.isRequired,
};
