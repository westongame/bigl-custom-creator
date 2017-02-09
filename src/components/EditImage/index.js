import React from 'react';

import IcoPlaceholder from './empty-image.svg';

import css from '../../style/blocks/image-edit/index.styl';
import cssPane from '../../style/blocks/pane/index.styl';
import cssImage from '../../style/blocks/image-holder/index.styl';

export default class EditImage extends React.Component {
    render() {
        let image = <IcoPlaceholder />;

        if (this.props.imageSrc) {
            image = (
                <div className={cssImage.imageHolder}>
                    <img src={this.props.imageSrc} className={cssImage.imageHolder__img} />
                </div>
            )
        }

        return (
            <div className={css.imageEdit}>
                <div className={css.imageEdit__imgContainer}>
                    {image}
                </div>
                <div className={css.imageEdit__textContainer}>
                    <label className={cssPane.pane__btnHolder}>
                        <div className={cssPane.pane__btn}>
                            { this.props.imageName || 'Upload an image' }
                        </div>
                        <input
                            type='file'
                            onChange={this.props.onChange}
                            className={css.imageEdit__link}
                        />
                    </label>
                </div>
            </div>
        );
    }
}
