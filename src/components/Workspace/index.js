import React from 'react';
import { tanokComponent } from 'tanok';
import classNames from 'classnames';

import SideBar from '../SideBar';
import Content from '../Content';
import TextInput from '../TextInput';

import css from '../../style/blocks/workspace/index.styl';

@tanokComponent
export default class Workspace extends React.Component {
    constructor(props) {
        super(props);

        this.state = { editingTitle: false };
        this.onFocus = this.onFocus.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.updateTitle = this.updateTitle.bind(this);
    }

    onFocus() {
        this.setState({ editingTitle: true });
    }

    onBlur() {
        this.setState({ editingTitle: false });
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
                            {
                                [css.workspace__titleInputHolder_state_error]: this.props.customTitle.error,
                                [css.workspace__titleInputHolder_state_active]: this.state.editingTitle,
                            }
                        )}
                    >
                        <TextInput
                            className={css.workspace__titleInput}
                            type='text'
                            placeholder='Write some title here'
                            value={this.props.customTitle.text}
                            onFocus={this.onFocus}
                            onBlur={this.onBlur}
                            update={this.updateTitle}
                        />
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
    tanokStream: React.PropTypes.object.isRequired,
    editMode: React.PropTypes.string.isRequired,
    editingIndex: React.PropTypes.number,
    customTitle: React.PropTypes.object,
    menuPresets: React.PropTypes.array.isRequired,
    content: React.PropTypes.array.isRequired, // TODO more specific proptype needed
};
