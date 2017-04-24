import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { IcoChevronUp, IcoChevronDown, IcoTrash, IcoPencil } from '../../svg';

import css from './presetBar.styl';

export default function PresetBar(props) {
    return (
        <div
            className={classNames(
                css.root,
                {
                    [css.root_type_content]:
                        props.itemMode === 'content',
                    [css.root_state_active]:
                        props.itemIndex === props.editingIndex && props.editMode === props.itemMode,
                    [css.root_state_error]: props.itemError,
                }
            )}
        >
            <div className={css.container}>
                {
                    props.itemIndex < props.contentLength - 1 ?
                        <div
                            className={css.button}
                            title='Move Down'
                            onClick={() => props.onMove(1)}
                        >
                            <IcoChevronDown className={css.buttonIco} />
                        </div>
                    : null
                }
                {
                    props.itemIndex > 0 ?
                        <div
                            className={css.button}
                            title='Move Up'
                            onClick={() => props.onMove(-1)}
                        >
                            <IcoChevronUp className={css.buttonIco} />
                        </div>
                    : null
                }
                <div
                    className={[css.button, css.button_type_right].join(' ')}
                    title='Edit'
                    onClick={props.onEdit}
                >
                    <IcoPencil className={css.buttonIco} />
                </div>
                <div
                    className={[css.button, css.button_type_right].join(' ')}
                    title='Remove'
                    onClick={props.onDelete}
                >
                    <IcoTrash className={css.buttonIco} />
                </div>
            </div>
            <div
                className={css.clickableLayer}
                onClick={props.onEdit}
            ></div>
        </div>
    );
}

PresetBar.propTypes = {
    editMode: PropTypes.string,
    editingIndex: PropTypes.number,
    itemIndex: PropTypes.number,
    itemMode: PropTypes.string,
    itemError: PropTypes.bool,
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onMove: PropTypes.func.isRequired,
    contentLength: PropTypes.number,
};
