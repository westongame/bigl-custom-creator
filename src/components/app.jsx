import React from 'react';
import PropTypes from 'prop-types';
import { tanokComponent } from 'tanok';

import CustomPropTypes from '../customPropTypes';
import Preview from './Preview';
import Workspace from './Workspace';
import Pane from './Pane';
import TopBar from './TopBar';

import css from '../style/blocks/editor/index.styl';
import cssPopup from '../style/blocks/popup/index.styl';
import cssButton from '../style/blocks/button/index.styl';

@tanokComponent
export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.onErrorPopupClick = this.onErrorPopupClick.bind(this);

        document.body.addEventListener('keydown', (e) => {
            if (e.keyCode === 90 && e.ctrlKey) {
                e.preventDefault();
                this.send('historyBack');
            }
            if (e.keyCode === 89 && e.ctrlKey) {
                e.preventDefault();
                this.send('historyForward');
            }
        });
    }

    onErrorPopupClick() {
        this.send('errorPopup', false);
    }

    render() {
        return (
            <div className={css.editor}>
                <div className={css.editor__barContainer}>
                    <TopBar
                        tanokStream={this.props.tanokStream}
                        isPreviewMode={this.props.isPreviewMode}
                        previewDevice={this.props.previewDevice}
                        customTitle={this.props.customTitle}
                        menuPresets={this.props.menuPresets}
                        contentStructure={this.props.content}
                    />
                </div>
                {
                    this.props.isPreviewMode
                    ? <Preview
                        isPreviewMode={this.props.isPreviewMode}
                        previewDevice={this.props.previewDevice}
                        customTitle={this.props.customTitle}
                        menuPresets={this.props.menuPresets}
                        contentStructure={this.props.content}
                    />
                    : <div>
                        <div className={css.editor__workspaceContainer}>
                            <Workspace
                                tanokStream={this.props.tanokStream}
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
                            />
                        </div>
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
                }
            </div>
        );
    }
}

App.propTypes = {
    tanokStream: PropTypes.object.isRequired,
    isPreviewMode: PropTypes.bool.isRequired,
    previewDevice: PropTypes.string.isRequired,
    showErrorPopup: PropTypes.bool.isRequired,
    editMode: PropTypes.string.isRequired,
    customTitle: PropTypes.object.isRequired,
    menuPresets: PropTypes.arrayOf(CustomPropTypes.menuPreset).isRequired,
    content: PropTypes.arrayOf(CustomPropTypes.preset).isRequired,
    editingIndex: PropTypes.number,
};