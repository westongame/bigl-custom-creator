import React from 'react';

import css from '../../style/blocks/editor-bar/index.styl';

const download = require('./download.svg');

export default class BottomBar extends React.Component {
    render () {
        return (
            <div className={css.editorBar}>
                <div className={css.editorBar__btnsContainer}>
                    <div className={css.editorBar__button}>
                        <img className={css.editorBar__buttonIco} src={download} alt="" />
                        <span className={css.editorBar__buttonText}>
                            Download JSON
                        </span>
                    </div>
                </div>
            </div>
        );
    }
}