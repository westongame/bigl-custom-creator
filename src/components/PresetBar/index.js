import React from 'react';

import IcoMove from './move.svg';
import IcoPencil from './pencil.svg';
import IcoTrash from './trash.svg';

import css from '../../style/blocks/preset-bar/index.styl';

export default function PresetBar(props) {
    return (
        <div className={css.presetBar}>
            <div className={css.presetBar__container}>
                <div className={css.presetBar__item}>
                    <div
                        className={[css.presetBar__button, css.presetBar__button_type_move].join(' ')}
                        title='Move'
                    >
                        <IcoMove className={css.presetBar__buttonIco} />
                    </div>
                </div>
                <div className={[css.presetBar__item, css.presetBar__item_type_right].join(' ')}>
                    <div
                        className={css.presetBar__button}
                        title='Edit'
                        onClick={props.onEdit}
                    >
                        <IcoPencil className={css.presetBar__buttonIco} />
                    </div>
                    <div
                        className={css.presetBar__button}
                        title='Remove'
                        onClick={props.onDelete}
                    >
                        <IcoTrash className={css.presetBar__buttonIco} />
                    </div>
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
    onEdit: React.PropTypes.func.isRequired,
    onDelete: React.PropTypes.func.isRequired,
};
