import React from 'react';
import { tanokComponent } from 'tanok';

import css from '../../style/blocks/editor-bar/index.styl';

import IcoEye from './eye.svg';

@tanokComponent
export default class TopBar extends React.Component {
    constructor(props) {
        super(props);

        this.enterPreviewMode = this.enterPreviewMode.bind(this);
    }

    enterPreviewMode() {
        this.send('previewMode', true);
    }

    render() {
        return (
            <div className={css.editorBar}>
                <div className={css.editorBar__btnsContainer}>
                    <div
                        className={css.editorBar__button}
                        onClick={this.enterPreviewMode}
                    >
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
