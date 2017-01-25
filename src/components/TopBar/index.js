import React from 'react';

import css from '../../style/blocks/editor-bar/index.styl';

import IcoEye from './eye.svg';

export default class TopBar extends React.Component {
    render () {
        return (
            <div className={css.editorBar}>
                <div className={css.editorBar__btnsContainer}>
                    <div className={css.editorBar__button}>
                        <IcoEye className={css.editorBar__buttonIco} />
                        <span className={css.editorBar__buttonText}>
                            Preview
                        </span>
                    </div>
                </div>
            </div>
        );
    }
}