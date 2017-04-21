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

        this.onKeyDown = this.onKeyDown.bind(this);
        this.onErrorPopupClick = this.onErrorPopupClick.bind(this);
        this.renderErrorPopup = this.renderErrorPopup.bind(this);
    }

    componentDidMount() {
        document.body.addEventListener('keydown', this.onKeyDown);
    }

    componentWillUnmount() {
        document.body.removeEventListener('keydown', this.onKeyDown);
    }

    onKeyDown(e) {
        const yKey = e.keyCode === 89;
        const zKey = e.keyCode === 90;

        if (e.ctrlKey) {
            if (zKey) {
                e.preventDefault();
                this.send(e.shiftKey ? 'Redo' : 'Undo');
            }
            if (yKey) {
                e.preventDefault();
                this.send(e.shiftKey ? 'Undo' : 'Redo');
            }
        }
    }

    onErrorPopupClick() {
        this.send('toggleErrorPopup');
    }

    renderErrorPopup() {
        return (
            <div className={cssPopup.popup}>
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
        );
    }

    render() {
        return (
            <div className={css.editor}>
                <div className={css.editor__barContainer}>
                    <TopBar
                        tanokStream={this.props.tanokStream}
                        isPreviewMode={this.props.isPreviewMode}
                        previewDevice={this.props.previewDevice}
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
                                this.renderErrorPopup()
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
