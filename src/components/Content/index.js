import React from 'react';

import css from '../../style/blocks/content/index.styl';
import gridCss from '../../style/blocks/grid/index.styl';
import imageCss from '../../style/blocks/image-holder/index.styl';

const placeholder = require('./image.svg');

export default class Content extends React.Component {
    render () {
        return (
            <div className={css.content}>

                <div className={css.content__item}>
                    <div className={css.content__itemBar}>
                        <div className="content__bar-right-container">
                            <div className="content__bar-button">
                            </div>
                        </div>
                    </div>
                    <div className={gridCss.grid}>
                        <div className={[gridCss.grid__item, gridCss.grid__item_width_oneFourth].join(' ')}>
                            <div className={imageCss.imageHolder}>
                                <img className={imageCss.imageHolder__img} src="http://static-cache.ua.uaprom.net/custom-view/BIGL/custom-100/custom-100-img1.png" alt="" />
                            </div>
                        </div>
                        <div className={[gridCss.grid__item, gridCss.grid__item_width_oneFourth].join(' ')}>
                            <div className={imageCss.imageHolder}>
                                <img className={imageCss.imageHolder__img} src={placeholder} alt="" style={{maxWidth: 200 + 'px'}} />
                            </div>
                        </div>
                        <div className={[gridCss.grid__item, gridCss.grid__item_width_oneHalf].join(' ')}>
                            <div className={imageCss.imageHolder}>
                                <img className={imageCss.imageHolder__img} src="http://static-cache.ua.uaprom.net/custom-view/BIGL/custom-100/custom-100-img3.png" alt="" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className={css.content__item}>
                    <div className={gridCss.grid}>
                        <div className={[gridCss.grid__item, gridCss.grid__item_width_oneFourth].join(' ')}>
                            <div className={imageCss.imageHolder}>
                                <img className={imageCss.imageHolder__img} src={placeholder} alt="" style={{maxWidth: 200 + 'px'}} />
                            </div>
                        </div>
                        <div className={[gridCss.grid__item, gridCss.grid__item_width_oneFourth].join(' ')}>
                            <div className={imageCss.imageHolder}>
                                <img className={imageCss.imageHolder__img} src={placeholder} alt="" style={{maxWidth: 200 + 'px'}} />
                            </div>
                        </div>
                        <div className={[gridCss.grid__item, gridCss.grid__item_width_oneFourth].join(' ')}>
                            <div className={imageCss.imageHolder}>
                                <img className={imageCss.imageHolder__img} src={placeholder} alt="" style={{maxWidth: 200 + 'px'}} />
                            </div>
                        </div>
                        <div className={[gridCss.grid__item, gridCss.grid__item_width_oneFourth].join(' ')}>
                            <div className={imageCss.imageHolder}>
                                <img className={imageCss.imageHolder__img} src={placeholder} alt="" style={{maxWidth: 200 + 'px'}} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className={css.content__item}>
                    <div className={gridCss.grid}>
                        <div className={[gridCss.grid__item, gridCss.grid__item_width_oneHalf].join(' ')}>
                            <div className={imageCss.imageHolder}>
                                <img className={imageCss.imageHolder__img} src={placeholder} alt="" style={{maxWidth: 200 + 'px'}} />
                            </div>
                        </div>
                        <div className={[gridCss.grid__item, gridCss.grid__item_width_oneFourth].join(' ')}>
                            <div className={imageCss.imageHolder}>
                                <img className={imageCss.imageHolder__img} src={placeholder} alt="" style={{maxWidth: 200 + 'px'}} />
                            </div>
                        </div>
                        <div className={[gridCss.grid__item, gridCss.grid__item_width_oneFourth].join(' ')}>
                            <div className={imageCss.imageHolder}>
                                <img className={imageCss.imageHolder__img} src={placeholder} alt="" style={{maxWidth: 200 + 'px'}} />
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}