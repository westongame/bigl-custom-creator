import React from 'react';

import Preset from '../Preset'

import IcoMove from './move.svg';
import IcoPencil from './pencil.svg';
import IcoTrash from './trash.svg';

import css from '../../style/blocks/content/index.styl';

export default class Content extends React.Component {
    render () {
        return (
            <div className={css.content}>
                <div className={css.content__item}>
                    <div className={css.content__itemBar}>
                        <div className={css.content__barItem}>
                            <div className={[css.content__barButton, css.content__barButton_type_move].join(' ')}>
                                <IcoMove className={css.content__barButtonIco} />
                            </div>
                        </div>
                        <div className={[css.content__barItem, css.content__barItem_type_right].join(' ')}>
                            <div className={css.content__barButton}>
                                <span className={css.content__barButtonIco}>
                                    <IcoPencil className={css.content__barButtonIco} />
                                </span>
                            </div>
                            <div className={css.content__barButton}>
                                <span className={css.content__barButtonIco}>
                                    <IcoTrash className={css.content__barButtonIco} />
                                </span>
                            </div>
                        </div>
                    </div>
                    <Preset />
                </div>
            </div>
        );
    }
}