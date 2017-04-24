import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { ImgPlaceholder } from '../../svg';

import css from './imageHolder.styl';

export default function ImageHolder(props) {
    let image = <ImgPlaceholder className={css.placeholder} />;

    if (props.imgSrc) {
        image = <img className={css.img} src={props.imgSrc} alt={props.imgAlt || ''} />;
    }

    return (
        <div
            className={classNames(
                css.root,
                { [css.root_type_bordered]: props.typeBordered },
            )}
        >
            {image}
        </div>
    );
}

ImageHolder.propTypes = {
    typeBordered: PropTypes.bool,
    imgSrc: PropTypes.string,
    imgAlt: PropTypes.string,
};
