import React from 'react';

import Content from '../Content';

import css from '../../style/blocks/workspace/index.styl';

export default class Workspace extends React.Component {
    render () {
        return (
            <div className={css.workspace}>
                <div className={css.workspace__wrapper}>
                    <div className={css.workspace__titleContainer}>
                        Всё до 100 грн
                    </div>
                    <div className={css.workspace__contentContainer}>
                        <div className={css.workspace__sidebar}>
                            sidebar
                        </div>
                        <div className={css.workspace__content}>
                            <Content />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}