import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { tanokComponent } from 'tanok';

import CustomPropTypes from '../../customPropTypes';

import Preview from '../Preview';
import Workspace from '../Workspace';
import Pane from '../Pane';
import TopBar from '../TopBar';
import Popup from '../Popup';
import Button from '../Button';

import css from './editor.styl';

@tanokComponent
export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.onKeyDown = this.onKeyDown.bind(this);
        this.onErrorPopupClick = this.onErrorPopupClick.bind(this);
        this.renderWorkspace = this.renderWorkspace.bind(this);
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

    renderWorkspace() {
        return (
            <div>
                <div className={css.workspaceContainer}>
                    <Workspace
                        tanokStream={this.props.tanokStream}
                        editMode={this.props.editMode}
                        editingIndex={this.props.editingIndex}
                        customTitle={this.props.customTitle}
                        menuPresets={this.props.menuPresets}
                        content={this.props.content}
                    />
                </div>
                <div className={css.paneContainer}>
                    <Pane
                        tanokStream={this.props.tanokStream}
                        editMode={this.props.editMode}
                        editingIndex={this.props.editingIndex}
                        menuPresets={this.props.menuPresets}
                        content={this.props.content}
                        presetTemplates={this.props.presetTemplates}
                    />
                </div>
                { this.props.showErrorPopup ?
                    <Popup
                        closePopup={this.onErrorPopupClick}
                    >
                        <div>Fix errors pls</div>
                        <br />
                        <Button>
                            Ok
                        </Button>
                    </Popup>
                    : null
                }
            </div>
        );
    }

    render() {
        return (
            <div
                className={classNames(
                    css.root,
                    { [css.root_type_fullScreen]: this.props.isFullScreen || this.props.isPreviewMode }
                )}
            >
                <div className={css.barContainer}>
                    <TopBar
                        tanokStream={this.props.tanokStream}
                        isPreviewMode={this.props.isPreviewMode}
                        previewDevice={this.props.previewDevice}
                        isFullScreen={this.props.isFullScreen}
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
                    : this.renderWorkspace()
                }
            </div>
        );
    }
}

App.propTypes = {
    tanokStream: PropTypes.object.isRequired,
    isPreviewMode: PropTypes.bool.isRequired,
    isFullScreen: PropTypes.bool.isRequired,
    previewDevice: PropTypes.string.isRequired,
    showErrorPopup: PropTypes.bool.isRequired,
    editMode: PropTypes.string.isRequired,
    customTitle: PropTypes.object.isRequired,
    menuPresets: PropTypes.arrayOf(CustomPropTypes.menuPreset).isRequired,
    content: PropTypes.arrayOf(CustomPropTypes.preset).isRequired,
    presetTemplates: PropTypes.arrayOf(CustomPropTypes.preset).isRequired,
    editingIndex: PropTypes.number,
};
