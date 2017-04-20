import React from 'react';
import PropTypes from 'prop-types';
import { tanokComponent } from 'tanok';
import classNames from 'classnames';

import CustomPropTypes from '../../customPropTypes';
import SideBar from '../SideBar';
import Content from '../Content';
import TextInput from '../TextInput';

import css from '../../style/blocks/workspace/index.styl';

@tanokComponent
export default class Workspace extends React.Component {
    constructor(props) {
        super(props);

        this.updateTitle = this.updateTitle.bind(this);
    }

    updateTitle(value) {
        this.send('updateCustomTitle', {
            text: value,
            error: false,
        });
    }

    render() {
        return (
            <div className={css.workspace}>
                <div className={css.workspace__wrapper}>
                    <div
                        className={classNames(
                            css.workspace__titleInputHolder,
                            { [css.workspace__titleInputHolder_state_error]: this.props.customTitle.error }
                        )}
                    >
                        <TextInput
                            className={css.workspace__titleInput}
                            type='text'
                            placeholder='Write some title here'
                            value={this.props.customTitle.text}
                            update={this.updateTitle}
                        />
                        <div className={css.workspace__titleInputHighlighter}></div>
                    </div>
                    <div className={css.workspace__contentContainer}>
                        <div className={css.workspace__sidebar}>
                            <SideBar
                                tanokStream={this.props.tanokStream}
                                editMode={this.props.editMode}
                                editingIndex={this.props.editingIndex}
                                menuPresets={this.props.menuPresets}
                            />
                        </div>
                        <div className={css.workspace__content}>
                            <Content
                                tanokStream={this.props.tanokStream}
                                editMode={this.props.editMode}
                                editingIndex={this.props.editingIndex}
                                content={this.props.content}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Workspace.propTypes = {
    tanokStream: PropTypes.object.isRequired,
    editMode: PropTypes.string.isRequired,
    editingIndex: PropTypes.number,
    customTitle: PropTypes.object,
    menuPresets: PropTypes.arrayOf(CustomPropTypes.menuPreset).isRequired,
    content: PropTypes.arrayOf(CustomPropTypes.preset).isRequired,
};
