import React from 'react';

import Workspace from './Workspace';
import Pane from './Pane';
import TopBar from './TopBar';
import BottomBar from './BottomBar';

import css from '../style/blocks/editor/index.styl';

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.addMenuPreset = this.addMenuPreset.bind(this);
    }

    addMenuPreset() {
        this.state.menuPresets.push(
            {
                title: 'Title',
                links: [
                    {
                        text: 'Link'
                    }
                ]
            }
        );

        this.setState({
            menuPresets: this.state.menuPresets
        });
    }

    render() {
        return (
            <div className={css.editor}>
                <div className={css.editor__workspaceContainer}>
                    <Workspace
                        menuPresets={this.props.menuPresets}
                        tanokStream={this.props.tanokStream}
                    />
                </div>
                <div className={css.editor__paneContainer}>
                    <Pane
                        tanokStream={this.props.tanokStream}
                        isEditingMenuPreset={this.props.isEditingMenuPreset}
                        menuPresets={this.props.menuPresets}
                        indexOfEditingMenuPreset={this.props.indexOfEditingMenuPreset}
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