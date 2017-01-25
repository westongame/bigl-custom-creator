import React from 'react';

import Preset from '../Preset'

import css from '../../style/blocks/content/index.styl';

export default class Content extends React.Component {
    render () {
        return (
            <div className={css.content}>
                <div className={css.content__item}>
                    <div className={css.content__itemBar}>
                        <div className="content__bar-right-container">
                            <div className="content__bar-button">
                            </div>
                        </div>
                    </div>
                    <Preset />
                </div>
            </div>
        );
    }
}