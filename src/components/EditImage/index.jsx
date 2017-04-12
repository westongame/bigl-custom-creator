import React from 'react';
import PropTypes from 'prop-types';

import { ImgPlaceholder } from '../../svg';

import css from '../../style/blocks/image-edit/index.styl';
import cssImage from '../../style/blocks/image-holder/index.styl';

export default function EditImage(props) {
    let image = <ImgPlaceholder />;

    if (props.imageSrc) {
        image = (
            <div className={cssImage.imageHolder}>
                <img src={props.imageSrc} className={cssImage.imageHolder__img} alt={props.imageName || ''} />
            </div>
        );
    }

    return (
        <div className={css.imageEdit}>
            <input
                id={`imageUpload-${props.itemId}`}
                type='file'
                onChange={props.onChange}
                className={css.imageEdit__input}
            />
            <label
                className={css.imageEdit__imgContainer}
                htmlFor={`imageUpload-${props.itemId}`}
            >
                {image}
            </label>
            <div className={css.imageEdit__textContainer}>
                {
                    props.imageName ?
                        <div className={css.imageEdit__title}>
                            {props.imageName}
                        </div>
                    : null
                }
                <label
                    className={css.imageEdit__link}
                    htmlFor={`imageUpload-${props.itemId}`}
                >
                    Upload an image
                </label>
            </div>
        </div>
    );
}

EditImage.propTypes = {
    imageSrc: PropTypes.string,
    imageName: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    itemId: PropTypes.number.isRequired,
};
