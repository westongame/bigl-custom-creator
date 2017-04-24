import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import CustomPropTypes from '../../customPropTypes';

import ImageHolder from '../ImageHolder';

import css from './preset.styl';

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
                    css.column,
                    { [css.column_size_big]: column.size >= 2 },
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
            <div className={css.row} key={id}>
                {row.content.map(this.makeGridItem)}
            </div>
        );
    }

    makeGridItem(content, id) {
        const linkAttrs = {};

        if (this.props.isPreviewMode) {
            linkAttrs.href = content.link;
            linkAttrs.title = content.title;
        }

        return (
            <a
                className={css.item}
                key={id}
                {...linkAttrs}
            >
                <ImageHolder
                    typeBordered={!this.props.isPreviewMode}
                    imgSrc={content.imageSrc}
                    imgAlt={content.title}
                />
            </a>
        );
    }

    render() {
        const { isPreviewMode, previewDevice, structure } = this.props;

        return (
            <div
                className={classNames(
                    css.root,
                    { [css.root_type_smartphonePreview]: isPreviewMode && previewDevice === 'smartphone' },
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
