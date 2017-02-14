import React from 'react';
import classNames from 'classnames';

import cssGrid from '../../style/blocks/grid/index.styl';
import cssImage from '../../style/blocks/image-holder/index.styl';

import IcoPlaceholder from './empty-image.svg';

export default class Preset extends React.Component {
    makeGridColumn(structure, key) {
        return (
            <div key={key} className={cssGrid.grid__column}>
                {this.generateMarkup(structure)}
            </div>
        );
    }

    makeGridItem(content, key) {
        let image = <IcoPlaceholder className={cssImage.imageHolder__placeholder} />;

        if (content.imageSrc) {
            image = <img className={cssImage.imageHolder__img} src={content.imageSrc} alt={content.title || ''} />;
        }

        return (
            <div key={key} className={cssGrid.grid__row}>
                <a
                    className={cssGrid.grid__item}
                    href={content.link}
                    title={content.title}
                >
                    <div
                        className={classNames(
                            cssImage.imageHolder,
                            { [cssImage.imageHolder_type_preview]: this.props.isPreviewMode }
                        )}
                    >
                        {image}
                    </div>
                </a>
            </div>
        );
    }

    generateMarkup(structure) {
        if (structure.columns) {
            return (
                <div className={cssGrid.grid__row}>
                    {structure.columns.map((item, key) => this.makeGridColumn(item, key))}
                </div>
            );
        } else if (structure.items) {
            return structure.items.map((content, key) => this.makeGridItem(content, key));
        }
        return null;
    }

    render() {
        return (
            <div className={cssGrid.grid}>
                {this.generateMarkup(this.props.structure)}
            </div>
        );
    }
}

Preset.propTypes = {
    isPreviewMode: React.PropTypes.bool,
    structure: React.PropTypes.object.isRequired, // TODO more specific proptype needed
};
