import React from 'react';
import { tanokComponent } from 'tanok';
import classNames from 'classnames';

import Workspace from './Workspace';
import Pane from './Pane';
import TopBar from './TopBar';
import BottomBar from './BottomBar';

import IcoCross from './cross.svg';

import css from '../style/blocks/editor/index.styl';

@tanokComponent
export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.exitPreviewMode = this.exitPreviewMode.bind(this);
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
                        menuPresets={this.props.menuPresets.structure}
                        content={this.props.content}
                    />
                </div>
                <div className={css.editor__paneContainer}>
                    <Pane
                        tanokStream={this.props.tanokStream}
                        content={this.props.content}
                        contentEditIndex={this.props.contentEditIndex}
                        menuPresets={this.props.menuPresets.structure}
                        isEditingMenuPreset={this.props.menuPresets.isEditing}
                        indexOfEditingMenuPreset={this.props.menuPresets.editingIndex}
                        editingMenuPresetLinksCount={this.props.menuPresets.editingLinksCount}
                        isEditingPreset={this.props.isEditingPreset}
                    />
                </div>
                <div className={[css.editor__barContainer, css.editor__barContainer_position_bottom].join(' ')}>
                    <BottomBar
                        customTitle={this.props.customTitle}
                        menuStructure={this.props.menuPresets.structure}
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
            </div>
        );
    }
}

App.propTypes = {
    tanokStream: React.PropTypes.object.isRequired,
    isPreviewMode: React.PropTypes.bool.isRequired,
    isEditingPreset: React.PropTypes.bool.isRequired,
    contentEditIndex: React.PropTypes.number.isRequired,
    customTitle: React.PropTypes.string.isRequired,
    menuPresets: React.PropTypes.object.isRequired,
    content: React.PropTypes.array.isRequired, // TODO more specific proptype needed
};
