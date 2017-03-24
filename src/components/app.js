import React from 'react';
import { tanokComponent } from 'tanok';
import classNames from 'classnames';

import Workspace from './Workspace';
import Pane from './Pane';
import TopBar from './TopBar';
import BottomBar from './BottomBar';

import IcoCross from './cross.svg';

import css from '../style/blocks/editor/index.styl';
import cssPopup from '../style/blocks/popup/index.styl';
import cssButton from '../style/blocks/button/index.styl';

@tanokComponent
export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.onErrorPopupClick = this.onErrorPopupClick.bind(this);
        this.exitPreviewMode = this.exitPreviewMode.bind(this);
    }

    onErrorPopupClick() {
        this.send('errorPopup', false);
    }

    exitPreviewMode() {
        this.send('previewMode', false);
    }

    render() {
        return (
            <div className={classNames(css.editor, { [css.editor_type_preview]: this.props.isPreviewMode })}>
                <div className={css.editor__barContainer}>
                    <TopBar
                        tanokStream={this.props.tanokStream}
                        isPreviewMode={this.props.isPreviewMode}
                    />
                </div>
                <div className={css.editor__workspaceContainer}>
                    <Workspace
                        tanokStream={this.props.tanokStream}
                        isPreviewMode={this.props.isPreviewMode}
                        editMode={this.props.editMode}
                        editingIndex={this.props.editingIndex}
                        customTitle={this.props.customTitle}
                        menuPresets={this.props.menuPresets}
                        content={this.props.content}
                    />
                </div>
                <div className={css.editor__paneContainer}>
                    <Pane
                        tanokStream={this.props.tanokStream}
                        editMode={this.props.editMode}
                        editingIndex={this.props.editingIndex}
                        menuPresets={this.props.menuPresets}
                        content={this.props.content}
                        editingIndex={this.props.editingIndex}
                    />
                </div>
                <div className={[css.editor__barContainer, css.editor__barContainer_position_bottom].join(' ')}>
                    <BottomBar
                        tanokStream={this.props.tanokStream}
                        customTitle={this.props.customTitle}
                        menuPresets={this.props.menuPresets}
                        contentStructure={this.props.content}
                    />
                </div>
                {
                    this.props.isPreviewMode ?
                        <div
                            className={css.editor__previewExitBtn}
                            onClick={this.exitPreviewMode}
                        >
                            <span className={css.editor__previewExitBtnText}>
                                Exit preview mode
                            </span>
                            <IcoCross className={css.editor__previewExitBtnIco} />
                        </div>
                    : null
                }
                {
                    this.props.showErrorPopup ?
                        <div
                            className={cssPopup.popup}
                            onClick={this.onErrorPopupClick}
                        >
                            <div className={cssPopup.popup__body}>
                                <div>Fix errors pls</div>
                                <br />
                                <div
                                    className={cssButton.button}
                                    onClick={this.onErrorPopupClick}
                                >
                                    Ok
                                </div>
                            </div>
                        </div>
                    : null
                }
            </div>
        );
    }
}

App.propTypes = {
    tanokStream: React.PropTypes.object.isRequired,
    isPreviewMode: React.PropTypes.bool.isRequired,
    showErrorPopup: React.PropTypes.bool.isRequired,
    editMode: React.PropTypes.string.isRequired,
    customTitle: React.PropTypes.object.isRequired,
    menuPresets: React.PropTypes.array.isRequired,
    content: React.PropTypes.array.isRequired, // TODO more specific proptype needed
    editingIndex: React.PropTypes.number,
};
