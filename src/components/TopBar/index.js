import React from 'react';
import { tanokComponent } from 'tanok';
import classNames from 'classnames';

import css from '../../style/blocks/editor-bar/index.styl';

import IcoEye from './eye.svg';
import IcoSmartphone from './smartphone.svg';
import IcoTablet from './tablet.svg';
import IcoScreen from './screen.svg';
import IcoCross from './cross.svg';

@tanokComponent
export default class TopBar extends React.Component {
    constructor(props) {
        super(props);

        this.togglePreviewMode = this.togglePreviewMode.bind(this);
        this.togglePreviewDevice = this.togglePreviewDevice.bind(this);
    }

    togglePreviewMode() {
        this.send('previewMode');
    }

    togglePreviewDevice(device) {
        this.send('previewDevice', device);
    }

    render() {
        return (
            <div className={css.editorBar}>
                {
                    this.props.isPreviewMode ?
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
                    : null
                }
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
    previewDevice: React.PropTypes.string.isRequired,
};
