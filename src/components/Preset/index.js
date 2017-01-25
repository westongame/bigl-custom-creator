import React from 'react';

import cssGrid from '../../style/blocks/grid/index.styl';
import cssImage from '../../style/blocks/image-holder/index.styl';

import IcoPlaceholder from './image.svg';

export default class Preset extends React.Component {
    render () {
        return (
            <div className={cssGrid.grid}>
                <div className={[cssGrid.grid__item, cssGrid.grid__item_width_oneFourth].join(' ')}>
                    <div className={cssImage.imageHolder}>
                        <img className={cssImage.imageHolder__img} src="http://static-cache.ua.uaprom.net/custom-view/BIGL/custom-100/custom-100-img1.png" alt="" />
                    </div>
                </div>
                <div className={[cssGrid.grid__item, cssGrid.grid__item_width_oneFourth].join(' ')}>
                    <div className={cssImage.imageHolder}>
                        <IcoPlaceholder className={cssImage.imageHolder__placeholder} />
                    </div>
                </div>
                <div className={[cssGrid.grid__item, cssGrid.grid__item_width_oneHalf].join(' ')}>
                    <div className={cssImage.imageHolder}>
                        <img className={cssImage.imageHolder__img} src="http://static-cache.ua.uaprom.net/custom-view/BIGL/custom-100/custom-100-img3.png" alt="" />
                    </div>
                </div>
            </div>
        );
    }
}
