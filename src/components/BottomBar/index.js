import React from 'react';
import { tanokComponent } from 'tanok';

import css from '../../style/blocks/editor-bar/index.styl';

import IcoDownload from './download.svg';

@tanokComponent
export default class BottomBar extends React.Component {
    constructor(props) {
        super(props);

        this.onDownload = this.onDownload.bind(this);
        this.titleValidation = this.titleValidation.bind(this);
        this.menuValidation = this.menuValidation.bind(this);
        this.contentValidation = this.contentValidation.bind(this);
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

    render() {
        return (
            <div className={css.editorBar}>
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
                </div>
            </div>
        );
    }
}

BottomBar.propTypes = {
    customTitle: React.PropTypes.object.isRequired,
    menuPresets: React.PropTypes.array.isRequired,
    contentStructure: React.PropTypes.array.isRequired, // TODO more specific proptype needed
};
