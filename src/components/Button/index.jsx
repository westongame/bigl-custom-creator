import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import css from './button.styl';

export default function Button(props) {
    return (
        <div
            className={classNames(
                css.root,
                { [css.root_theme_green]: props.theme === 'green' }
            )}
            onClick={props.onClick}
        >
            { props.children }
        </div>
    );
}

Button.propTypes = {
    theme: PropTypes.string,
    onClick: PropTypes.func,
};
