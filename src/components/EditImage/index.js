import React from 'react';

import IcoPlaceholder from './empty-image.svg';

import css from '../../style/blocks/image-edit/index.styl';
import cssPane from '../../style/blocks/pane/index.styl';
import cssImage from '../../style/blocks/image-holder/index.styl';
import cssButton from '../../style/blocks/button/index.styl';

export default function EditImage(props) {
    let image = <IcoPlaceholder />;

    if (props.imageSrc) {
        image = (
            <div className={cssImage.imageHolder}>
                <img src={props.imageSrc} className={cssImage.imageHolder__img} alt={props.imageName || ''} />
            </div>
        );
    }

    return (
        <div className={css.imageEdit}>
            <div className={css.imageEdit__imgContainer}>
                {image}
            </div>
            <div className={css.imageEdit__textContainer}>
                <label className={cssPane.pane__btnHolder}>
                    <div className={cssButton.button}>
                        {props.imageName || 'Upload an image'}
                    </div>
                    <input
                        type='file'
                        onChange={props.onChange}
                        className={css.imageEdit__link}
                    />
                </label>
            </div>
        </div>
    );
}

EditImage.propTypes = {
    imageSrc: React.PropTypes.string,
    imageName: React.PropTypes.string,
    onChange: React.PropTypes.func.isRequired,
};
