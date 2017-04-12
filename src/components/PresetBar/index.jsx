import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { IcoChevronUp, IcoChevronDown, IcoTrash, IcoPencil } from '../../svg';

import css from '../../style/blocks/preset-bar/index.styl';

export default function PresetBar(props) {
    return (
        <div
            className={classNames(
                css.presetBar,
                {
                    [css.presetBar_type_content]:
                        props.itemMode === 'content',
                    [css.presetBar_state_active]:
                        props.itemIndex === props.editingIndex && props.editMode === props.itemMode,
                    [css.presetBar_state_error]: props.itemError,
                }
            )}
        >
            <div className={css.presetBar__container}>
                {
                    props.itemIndex < props.contentLength - 1 ?
                        <div
                            className={css.presetBar__button}
                            title='Move Down'
                            onClick={() => props.onMove(1)}
                        >
                            <IcoChevronDown className={css.presetBar__buttonIco} />
                        </div>
                    : null
                }
                {
                    props.itemIndex > 0 ?
                        <div
                            className={css.presetBar__button}
                            title='Move Up'
                            onClick={() => props.onMove(-1)}
                        >
                            <IcoChevronUp className={css.presetBar__buttonIco} />
                        </div>
                    : null
                }
                <div
                    className={[css.presetBar__button, css.presetBar__button_type_right].join(' ')}
                    title='Edit'
                    onClick={props.onEdit}
                >
                    <IcoPencil className={css.presetBar__buttonIco} />
                </div>
                <div
                    className={[css.presetBar__button, css.presetBar__button_type_right].join(' ')}
                    title='Remove'
                    onClick={props.onDelete}
                >
                    <IcoTrash className={css.presetBar__buttonIco} />
                </div>
            </div>
            <div
                className={css.presetBar__clickableLayer}
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
