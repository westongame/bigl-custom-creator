import React from 'react';
import PropTypes from 'prop-types';

import css from './popup.styl';

export default function Popup(props) {
    return (
        <div
            className={css.root}
            onClick={props.closePopup}
        >
            <div className={css.body}>
                { props.children }
            </div>
        </div>
    );
}

Popup.propTypes = {
    closePopup: PropTypes.func.isRequired,
};
