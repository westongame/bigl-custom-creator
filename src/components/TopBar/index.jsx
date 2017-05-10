import React from 'react';
import PropTypes from 'prop-types';
import { tanokComponent } from 'tanok';
import classNames from 'classnames';

import {
    IcoEye,
    IcoDownload,
    IcoUpload,
    IcoSmartphone,
    IcoTablet,
    IcoScreen,
    IcoCross,
    IcoUndo,
    IcoRedo,
    IcoExpand,
    IcoContract,
} from '../../svg';

import css from './topBar.styl';

@tanokComponent
export default class TopBar extends React.Component {
    constructor(props) {
        super(props);

        this.onUndo = this.onUndo.bind(this);
        this.onRedo = this.onRedo.bind(this);
        this.onImport = this.onImport.bind(this);
        this.onExport = this.onExport.bind(this);
        this.toggleFullScreen = this.toggleFullScreen.bind(this);
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

    onImport(e) {
        this.send('ImportJSON', e);
    }

    onExport(e) {
        this.send('ExportJSON', e);
    }

    toggleFullScreen() {
        this.send('toggleFullScreen');
    }

    togglePreviewMode() {
        this.send('previewMode');
    }

    togglePreviewDevice(device) {
        this.send('previewDevice', device);
    }

    renderPreviewBar() {
        return (
            <div className={css.container}>
                <div className={css.btnsContainer}>
                    <div
                        className={classNames(
                            css.button,
                            { [css.button_state_active]: this.props.previewDevice === 'smartphone' }
                        )}
                        onClick={() => this.togglePreviewDevice('smartphone')}
                    >
                        <IcoSmartphone className={css.buttonIco} />
                    </div>
                    <div
                        className={classNames(
                            css.button,
                            { [css.button_state_active]: this.props.previewDevice === 'tablet' }
                        )}
                        onClick={() => this.togglePreviewDevice('tablet')}
                    >
                        <IcoTablet className={css.buttonIco} />
                    </div>
                    <div
                        className={classNames(
                            css.button,
                            { [css.button_state_active]: this.props.previewDevice === 'desktop' }
                        )}
                        onClick={() => this.togglePreviewDevice('desktop')}
                    >
                        <IcoScreen className={css.buttonIco} />
                    </div>
                </div>
                <div className={css.btnsContainer}>
                    <div
                        className={css.button}
                        onClick={this.togglePreviewMode}
                    >
                        <IcoCross className={css.buttonIco} />
                        <span className={css.buttonText}>
                            Exit Preview
                        </span>
                    </div>
                </div>
            </div>
        );
    }

    renderBar() {
        return (
            <div className={css.container}>
                <div className={css.btnsContainer}>
                    {process.env.NODE_ENV === 'development' ?
                        <a
                            className={css.button}
                            onClick={() => {
                                localStorage.clear();
                                window.location.reload();
                            }}
                            title='Clear LocalStorage'
                        >
                            <span className={css.buttonText}>
                                Clear LocalStorage
                            </span>
                        </a>
                        : null
                    }
                    <a
                        className={css.button}
                        onClick={this.onUndo}
                        title='Ctrl+Z'
                    >
                        <IcoUndo className={css.buttonIco} />
                        <span className={css.buttonText}>
                            Undo
                        </span>
                    </a>
                    <div
                        className={css.button}
                        onClick={this.onRedo}
                        title='Ctrl+Y'
                    >
                        <IcoRedo className={css.buttonIco} />
                        <span className={css.buttonText}>
                            Redo
                        </span>
                    </div>
                </div>
                <div className={css.btnsContainer}>
                    <label className={css.button}>
                        <input type='file' onChange={this.onImport} className={css.hiddenInput} />
                        <IcoUpload className={css.buttonIco} />
                        <span className={css.buttonText}>
                            Import JSON
                        </span>
                    </label>
                    <a
                        className={css.button}
                        onClick={this.onExport}
                    >
                        <IcoDownload className={css.buttonIco} />
                        <span className={css.buttonText}>
                            Export JSON
                        </span>
                    </a>
                    <div
                        className={css.button}
                        onClick={this.togglePreviewMode}
                    >
                        <IcoEye className={css.buttonIco} />
                        <span className={css.buttonText}>
                            Preview
                        </span>
                    </div>
                    <div
                        className={css.button}
                        onClick={this.toggleFullScreen}
                    >
                        {this.props.isFullScreen
                            ? <IcoContract className={css.buttonIco} />
                            : <IcoExpand className={css.buttonIco} />
                        }
                        <span className={css.buttonText}>
                            Full Screen
                        </span>
                    </div>
                </div>
            </div>
        );
    }

    render() {
        return (
            <div className={css.root}>
                { this.props.isPreviewMode ? this.renderPreviewBar() : this.renderBar() }
            </div>
        );
    }
}

TopBar.propTypes = {
    isPreviewMode: PropTypes.bool.isRequired,
    isFullScreen: PropTypes.bool.isRequired,
    previewDevice: PropTypes.string.isRequired,
};
