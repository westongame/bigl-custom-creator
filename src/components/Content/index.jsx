import React from 'react';
import PropTypes from 'prop-types';
import { tanokComponent } from 'tanok';

import CustomPropTypes from '../../customPropTypes';
import PresetBar from '../PresetBar';
import Preset from '../Preset';
import Button from '../Button';

import css from './content.styl';

@tanokComponent
export default class Content extends React.Component {
    constructor(props) {
        super(props);

        this.onEdit = this.onEdit.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.onMove = this.onMove.bind(this);
        this.checkErrors = this.checkErrors.bind(this);
        this.placeholderBtnClick = this.placeholderBtnClick.bind(this);
        this.renderStartMessage = this.renderStartMessage.bind(this);
    }

    onEdit(index) {
        this.send('setEditMode', ['content', index]);
    }

    onDelete(index) {
        this.send('deletePreset', index);
    }

    onMove(index, direction) {
        this.send('movePreset', {
            array: 'content',
            index,
            direction,
        });
    }

    checkErrors(preset) {
        return preset.children.some((item) => item.imageError || item.titleError || item.linkError);
    }

    placeholderBtnClick() {
        this.send('setEditMode', ['', 0]);
    }

    renderStartMessage() {
        return (
            <div className={css.placeholder}>
                {
                    this.props.editMode ?
                        <Button
                            theme={'green'}
                            onClick={this.placeholderBtnClick}
                        >
                            +
                        </Button>
                    :
                        <div>
                            Add some presets here
                        </div>
                }
            </div>
        );
    }

    render() {
        const { content } = this.props;

        return (
            <div className={css.root}>
                {content.length
                    ? content.map((item, index) => (
                        <div key={index} className={css.item}>
                            <PresetBar
                                editMode={this.props.editMode}
                                editingIndex={this.props.editingIndex}
                                itemIndex={index}
                                itemMode='content'
                                itemError={this.checkErrors(item)}
                                onEdit={() => this.onEdit(index)}
                                onDelete={() => this.onDelete(index)}
                                onMove={(direction) => this.onMove(index, direction)}
                                contentLength={content.length}
                            />
                            <Preset structure={item.generateMarkupData()} />
                        </div>
                    ))
                    : this.renderStartMessage()
                }
            </div>
        );
    }
}

Content.propTypes = {
    editMode: PropTypes.string,
    editingIndex: PropTypes.number,
    content: PropTypes.arrayOf(CustomPropTypes.preset).isRequired,
};
