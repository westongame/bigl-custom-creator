import React from 'react';
import PropTypes from 'prop-types';

import ImageHolder from '../ImageHolder';

import { ImgPlaceholder } from '../../svg';

import css from './editImage.styl';

export default function EditImage(props) {
    return (
        <div className={css.root}>
            <input
                id={`imageUpload-${props.itemId}`}
                className={css.input}
                type='file'
                onChange={props.onChange}
            />
            <label
                className={css.imgContainer}
                htmlFor={`imageUpload-${props.itemId}`}
            >
                {
                    props.imageSrc ?
                        <ImageHolder
                            imgSrc={props.imageSrc}
                            imgAlt={props.imageName}
                        />
                    : <ImgPlaceholder />
                }
            </label>
            <div className={css.textContainer}>
                {
                    props.imageName ?
                        <div className={css.title}>
                            {props.imageName}
                        </div>
                    : null
                }
                <label
                    className={css.link}
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
