import React from 'react';
import PropTypes from 'prop-types';
import { tanokComponent } from 'tanok';
import classNames from 'classnames';

import CustomPropTypes from '../../customPropTypes';

import css from '../../style/blocks/editor-bar/index.styl';

import IcoEye from './eye.svg';
import IcoDownload from './download.svg';
import IcoSmartphone from './smartphone.svg';
import IcoTablet from './tablet.svg';
import IcoScreen from './screen.svg';
import IcoCross from './cross.svg';

@tanokComponent
export default class TopBar extends React.Component {
    constructor(props) {
        super(props);

        this.onDownload = this.onDownload.bind(this);
        this.titleValidation = this.titleValidation.bind(this);
        this.menuValidation = this.menuValidation.bind(this);
        this.contentValidation = this.contentValidation.bind(this);
        this.togglePreviewMode = this.togglePreviewMode.bind(this);
        this.togglePreviewDevice = this.togglePreviewDevice.bind(this);
        this.renderPreviewBar = this.renderPreviewBar.bind(this);
    }

    onDownload(e) {
        const checkTitle = this.titleValidation();
        const checkMenu = this.menuValidation();
        const checkContent = this.contentValidation();

        this.contentValidation();

        this.send('updateEditMode', '');

        if (checkTitle && checkMenu && checkContent) {
            const link = e.currentTarget;
            const data = {
                title: this.props.customTitle.text,
                menu: this.props.menuPresets,
                content: this.props.contentStructure,
            };
            const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });

            link.href = URL.createObjectURL(blob);
            link.download = `${this.props.customTitle.text}.json`;
            URL.revokeObjectURL(blob);
        } else {
            e.preventDefault();

            this.send('errorPopup', true);
        }
    }

    titleValidation() {
        const newCustomTitle = this.props.customTitle;

        if (!newCustomTitle.text) {
            newCustomTitle.error = true;

            this.send('updateCustomTitle', newCustomTitle);

            return false;
        }

        return true;
    }

    menuValidation() {
        const newMenuPresets = this.props.menuPresets;
        let error = false;

        newMenuPresets.forEach((menu, index) => {
            if (!menu.title) {
                error = true;
                newMenuPresets[index].titleError = true;
            }

            menu.links.forEach((link, linkIndex) => {
                if (!link.text) {
                    error = true;
                    newMenuPresets[index].links[linkIndex].textError = true;
                }

                if (!link.href) {
                    error = true;
                    newMenuPresets[index].links[linkIndex].hrefError = true;
                }
            });
        });

        if (error) {
            this.send('updateMenuPresets', newMenuPresets);

            return false;
        }

        return true;
    }

    contentValidation() {
        const newContentStructure = this.props.contentStructure;
        let error = false;

        newContentStructure.forEach((preset, presetIndex) => {
            preset.forEach((item, index) => {
                if (!item.imageName) {
                    error = true;
                    newContentStructure[presetIndex][index].imageError = true;
                }

                if (!item.link) {
                    error = true;
                    newContentStructure[presetIndex][index].linkError = true;
                }

                if (!item.title) {
                    error = true;
                    newContentStructure[presetIndex][index].titleError = true;
                }
            });
        });

        if (error) {
            this.send('updateContentPresets', newContentStructure);

            return false;
        }

        return true;
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

    render() {
        return (
            <div className={css.editorBar}>
                {
                    this.props.isPreviewMode ?
                        this.renderPreviewBar()
                    :
                        <div className={css.editorBar__container}>
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
                }
            </div>
        );
    }
}

TopBar.propTypes = {
    isPreviewMode: PropTypes.bool.isRequired,
    previewDevice: PropTypes.string.isRequired,
    customTitle: PropTypes.object.isRequired,
    menuPresets: PropTypes.arrayOf(CustomPropTypes.menuPreset).isRequired,
    contentStructure: PropTypes.arrayOf(CustomPropTypes.preset).isRequired,
};
