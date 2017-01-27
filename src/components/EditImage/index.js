import React from 'react';

import IcoPlaceholder from './empty-image.svg';

import css from '../../style/blocks/image-edit/index.styl';

export default class EditImage extends React.Component {
    render() {
        return (
            <div className={css.imageEdit}>
                <div className={css.imageEdit__imgContainer}>
                    <IcoPlaceholder />
                </div>
                <div className={css.imageEdit__textContainer}>
                    <div className={css.imageEdit__title}>
                        Upload an image
                    </div>
                    <a className={css.imageEdit__link} href="/">Browse</a>
                </div>
            </div>
        );
    }
}
