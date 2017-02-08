import React from 'react';

import Workspace from './Workspace';
import Pane from './Pane';
import TopBar from './TopBar';
import BottomBar from './BottomBar';

import css from '../style/blocks/editor/index.styl';

export default class App extends React.Component {
    render() {
        return (
            <div className={css.editor}>
                <div className={css.editor__workspaceContainer}>
                    <Workspace
                        tanokStream={this.props.tanokStream}
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
                <div className={css.editor__barContainer}>
                    <TopBar />
                </div>
                <div className={[css.editor__barContainer, css.editor__barContainer_position_bottom].join(' ')}>
                    <BottomBar
                        customTitle={this.props.customTitle}
                    />
                </div>
            </div>
        );
    }
}

App.propTypes = {
    content: React.PropTypes.array, // TODO more specific proptype needed
};
