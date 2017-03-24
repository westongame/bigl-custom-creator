import React from 'react';
import { tanokComponent } from 'tanok';

import css from '../../style/blocks/editor-bar/index.styl';

import IcoEye from './eye.svg';
import IcoCross from './cross.svg';

@tanokComponent
export default class TopBar extends React.Component {
    constructor(props) {
        super(props);

        this.togglePreviewMode = this.togglePreviewMode.bind(this);
    }

    togglePreviewMode() {
        this.send('previewMode');
    }

    render() {
        return (
            <div className={css.editorBar}>
                <div className={css.editorBar__btnsContainer}>
                    {
                        this.props.isPreviewMode ?
                            <div
                                className={css.editorBar__button}
                                onClick={this.togglePreviewMode}
                            >
                                <IcoCross className={css.editorBar__buttonIco} />
                                < span className={css.editorBar__buttonText}>
                                    Exit Preview
                                </span>
                            </div>
                        :
                            <div
                                className={css.editorBar__button}
                                onClick={this.togglePreviewMode}
                            >
                                <IcoEye className={css.editorBar__buttonIco} />
                                < span className={css.editorBar__buttonText}>
                                    Preview
                                </span>
                            </div>
                    }
                </div>
            </div>
        );
    }
}

TopBar.propTypes = {
    isPreviewMode: React.PropTypes.bool.isRequired,
};
