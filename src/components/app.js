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
                    <Workspace />
                </div>
                <div className={css.editor__paneContainer}>
                    <Pane />
                </div>
                <div className={css.editor__barContainer}>
                    <TopBar />
                </div>
                <div className={[css.editor__barContainer, css.editor__barContainer_position_bottom].join(' ')}>
                    <BottomBar />
                </div>
            </div>
        );
    }
}