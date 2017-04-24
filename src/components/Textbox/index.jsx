import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import TextInput from '../TextInput';

import css from './textbox.styl';

export default function Textbox(props) {
    return (
        <TextInput
            className={classNames(
                css.root,
                { [css.root_state_error]: props.isError }
            )}
            value={props.value}
            placeholder={props.placeholder}
            onChange={props.onChange}
            onFocus={props.onFocus}
            onBlur={props.onBlur}
            update={props.update}
        />
    );
}

Textbox.propTypes = {
    value: PropTypes.string,
    placeholder: PropTypes.string,
    isError: PropTypes.bool,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    update: PropTypes.func,
};
