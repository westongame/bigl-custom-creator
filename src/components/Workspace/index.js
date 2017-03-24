import React from 'react';
import { tanokComponent } from 'tanok';
import classNames from 'classnames';

import SideBar from '../SideBar';
import Content from '../Content';

import css from '../../style/blocks/workspace/index.styl';

@tanokComponent
export default class Workspace extends React.Component {
    constructor(props) {
        super(props);

        this.onFocus = this.onFocus.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onFocus(e) {
        e.currentTarget.select();

        const customTitle = this.props.customTitle;

        customTitle.isEditing = true;

        this.send('updateCustomTitle', customTitle);
    }

    onBlur() {
        const customTitle = this.props.customTitle;

        customTitle.isEditing = false;

        this.send('updateCustomTitle', customTitle);
    }

    onChange(e) {
        const customTitle = this.props.customTitle;

        customTitle.text = e.currentTarget.value;
        customTitle.error = false;

        this.send('updateCustomTitle', customTitle);
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
                                [css.workspace__titleInputHolder_state_active]: this.props.customTitle.isEditing,
                            }
                        )}
                    >
                        <input
                            className={css.workspace__titleInput}
                            type='text'
                            placeholder='Write some title here'
                            value={this.props.customTitle.text ? this.props.customTitle.text : ''}
                            onFocus={this.onFocus}
                            onBlur={this.onBlur}
                            onChange={this.onChange}
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
