import React from 'react';
import PropTypes from 'prop-types';
import { tanokComponent } from 'tanok';
import classNames from 'classnames';

import { IcoEye, IcoDownload, IcoSmartphone, IcoTablet, IcoScreen, IcoCross, IcoUndo, IcoRedo } from '../../svg';

import css from '../../style/blocks/editor-bar/index.styl';

@tanokComponent
export default class TopBar extends React.Component {
    constructor(props) {
        super(props);

        this.onUndo = this.onUndo.bind(this);
        this.onRedo = this.onRedo.bind(this);
        this.onDownload = this.onDownload.bind(this);
        this.togglePreviewMode = this.togglePreviewMode.bind(this);
        this.togglePreviewDevice = this.togglePreviewDevice.bind(this);
        this.renderPreviewBar = this.renderPreviewBar.bind(this);
        this.renderBar = this.renderBar.bind(this);
    }

    onUndo() {
        this.send('Undo');
    }

    onRedo() {
        this.send('Redo');
    }

    onDownload(e) {
        this.send('downloadJSON', e);
    }

    togglePreviewMode() {
        this.send('previewMode');
    }

    togglePreviewDevice(device) {
        this.send('previewDevice', device);
    }

    renderPreviewBar() {
        return (
            <div className={css.editorBar__container}>
                <div className={css.editorBar__btnsContainer}>
                    <div
                        className={classNames(
                            css.editorBar__button,
                            { [css.editorBar__button_state_active]: this.props.previewDevice === 'smartphone' }
                        )}
                        onClick={() => this.togglePreviewDevice('smartphone')}
                    >
                        <IcoSmartphone className={css.editorBar__buttonIco} />
                    </div>
                    <div
                        className={classNames(
                            css.editorBar__button,
                            { [css.editorBar__button_state_active]: this.props.previewDevice === 'tablet' }
                        )}
                        onClick={() => this.togglePreviewDevice('tablet')}
                    >
                        <IcoTablet className={css.editorBar__buttonIco} />
                    </div>
                    <div
                        className={classNames(
                            css.editorBar__button,
                            { [css.editorBar__button_state_active]: this.props.previewDevice === 'desktop' }
                        )}
                        onClick={() => this.togglePreviewDevice('desktop')}
                    >
                        <IcoScreen className={css.editorBar__buttonIco} />
                    </div>
                </div>
                <div className={css.editorBar__btnsContainer}>
                    <div
                        className={css.editorBar__button}
                        onClick={this.togglePreviewMode}
                    >
                        <IcoCross className={css.editorBar__buttonIco} />
                        <span className={css.editorBar__buttonText}>
                            Exit Preview
                        </span>
                    </div>
                </div>
            </div>
        );
    }

    renderBar() {
        return (
            <div className={css.editorBar__container}>
                <div className={css.editorBar__btnsContainer}>
                    <a
                        className={css.editorBar__button}
                        onClick={this.onUndo}
                        title='Ctrl+Z'
                    >
                        <IcoUndo className={css.editorBar__buttonIco} />
                        <span className={css.editorBar__buttonText}>
                            Undo
                        </span>
                    </a>
                    <div
                        className={css.editorBar__button}
                        onClick={this.onRedo}
                        title='Ctrl+Y'
                    >
                        <IcoRedo className={css.editorBar__buttonIco} />
                        <span className={css.editorBar__buttonText}>
                            Redo
                        </span>
                    </div>
                </div>
                <div className={css.editorBar__btnsContainer}>
                    <a
                        className={css.editorBar__button}
                        onClick={this.onDownload}
                    >
                        <IcoDownload className={css.editorBar__buttonIco} />
                        <span className={css.editorBar__buttonText}>
                            Download JSON
                        </span>
                    </a>
                    <div
                        className={css.editorBar__button}
                        onClick={this.togglePreviewMode}
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

    render() {
        return (
            <div className={css.editorBar}>
                { this.props.isPreviewMode ? this.renderPreviewBar() : this.renderBar() }
            </div>
        );
    }
}

TopBar.propTypes = {
    isPreviewMode: PropTypes.bool.isRequired,
    previewDevice: PropTypes.string.isRequired,
};
