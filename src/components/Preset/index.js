import React from 'react';

import cssGrid from '../../style/blocks/grid/index.styl';
import cssImage from '../../style/blocks/image-holder/index.styl';

import IcoPlaceholder from './empty-image.svg';

export default class Preset extends React.Component {
    makeGridColumn(structure, key) {
        return (
            <div key={key} className={cssGrid.grid__column}>
                {this.generateMarkup(structure)}
            </div>
        )
    }

    makeGridItem(content, key) {
        let image = <IcoPlaceholder className={cssImage.imageHolder__placeholder} />;
        if (content.imageSrc && content.title) {
            image = <img className={cssImage.imageHolder__img} src={content.imageSrc} alt={content.title} />
        }

        return (
            <div key={key} className={cssGrid.grid__row}>
                <div className={cssGrid.grid__item}>
                    <div className={cssImage.imageHolder}>
                        {image}
                    </div>
                </div>
            </div>
        )
    }

    generateMarkup(structure) {
        if (structure.columns) {
            return (
                <div className={cssGrid.grid__row}>
                    {structure.columns.map((structure, key) => this.makeGridColumn(structure, key))}
                </div>
            )
        } else if (structure.items) {
            return structure.items.map((content, key) => this.makeGridItem(content, key))
        }
    }

    render () {
        return (
            <div className={cssGrid.grid}>
                {this.generateMarkup(this.props.structure)}
            </div>
        )
    }
}

Preset.propTypes = {
    structure: React.PropTypes.object, // TODO more specific proptype needed
};
