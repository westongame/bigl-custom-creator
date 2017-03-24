import React from 'react';
import classNames from 'classnames';

import IcoUp from './chevron-up.svg';
import IcoDown from './chevron-down.svg';
import IcoTrash from './trash.svg';

import css from '../../style/blocks/preset-bar/index.styl';

export default function PresetBar(props) {
    return (
        <div
            className={classNames(
                css.presetBar,
                {
                    [css.presetBar_state_active]:
                        props.itemIndex === props.editingIndex && props.editMode === props.itemMode,
                    [css.presetBar_state_error]: props.itemError,
                }
            )}
        >
            <div className={css.presetBar__container}>
                {props.itemIndex < props.contentLength - 1 ?
                    <div
                        className={css.presetBar__button}
                        title='Move Down'
                        onClick={() => props.onMove(1)}
                    ><IcoDown className={css.presetBar__buttonIco} /></div>
                    : null
                }
                {props.itemIndex > 0 ?
                    <div
                        className={css.presetBar__button}
                        title='Move Up'
                        onClick={() => props.onMove(-1)}
                    ><IcoUp className={css.presetBar__buttonIco} /></div>
                    : null
                }
                <div
                    className={[css.presetBar__button, css.presetBar__button_type_right].join(' ')}
                    title='Remove'
                    onClick={props.onDelete}
                ><IcoTrash className={css.presetBar__buttonIco} /></div>
            </div>
            <div
                className={css.presetBar__clickableLayer}
                onClick={props.onEdit}
            ></div>
        </div>
    );
}

PresetBar.propTypes = {
    editMode: React.PropTypes.string,
    editingIndex: React.PropTypes.number,
    itemIndex: React.PropTypes.number,
    itemMode: React.PropTypes.string,
    itemError: React.PropTypes.bool,
    onEdit: React.PropTypes.func.isRequired,
    onDelete: React.PropTypes.func.isRequired,
    onMove: React.PropTypes.func.isRequired,
    contentLength: React.PropTypes.number,
};
