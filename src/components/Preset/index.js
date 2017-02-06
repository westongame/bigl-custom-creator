import React from 'react';

import cssGrid from '../../style/blocks/grid/index.styl';
import cssImage from '../../style/blocks/image-holder/index.styl';

import IcoPlaceholder from './empty-image.svg';

export default class Preset extends React.Component {
    makeGridColumn(structure, id) {
        return (
            <div key={id} className={cssGrid.grid__column}>
                {this.generateMarkup(structure)}
            </div>
        )
    }

    makeGridItem(content, id) {
        let image = <IcoPlaceholder className={cssImage.imageHolder__placeholder} />;
        if (content.imageSrc && content.title) {
            image = <img className={cssImage.imageHolder__img} src={content.imageSrc} alt={content.title} />
        }

        return (
            <div key={id} className={cssGrid.grid__row}>
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
                    {structure.columns.map((structure, id) => this.makeGridColumn(structure, id))}
                </div>
            )
        } else if (structure.items) {
            return structure.items.map((content, id) => this.makeGridItem(content, id))
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
    structure: React.PropTypes.object
};
