import React from 'react';
import PropTypes from 'prop-types';
import { tanokComponent } from 'tanok';

import CustomPropTypes from '../../customPropTypes';
import PresetBar from '../PresetBar';
import Preset from '../Preset';

import css from '../../style/blocks/content/index.styl';
import cssButton from '../../style/blocks/button/index.styl';

@tanokComponent
export default class Content extends React.Component {
    constructor(props) {
        super(props);

        this.onEdit = this.onEdit.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.onMove = this.onMove.bind(this);
        this.checkErrors = this.checkErrors.bind(this);
        this.renderStartMessage = this.renderStartMessage.bind(this);
        this.placeholderBtnClick = this.placeholderBtnClick.bind(this);
    }

    onEdit(index) {
        this.send('updateEditMode', 'content');
        this.send('updateEditingIndex', index);

        const newContent = this.props.content;

        newContent[index].error = false;

        this.send('updateContentPresets', newContent);
    }

    onDelete(index) {
        this.send('updateEditMode', '');
        this.send('deletePreset', index);
    }

    onMove(index, direction) {
        this.send('updateEditMode', '');
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
        this.send('updateEditMode', '');
    }

    renderStartMessage() {
        return (
            <div className={css.content__placeholder}>
                {
                    this.props.editMode ?
                        <div
                            className={[cssButton.button, cssButton.button_theme_green].join(' ')}
                            onClick={this.placeholderBtnClick}
                        >
                            +
                        </div>
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
            <div className={css.content}>
                {content.length
                    ? content.map((item, index) => (
                        <div key={index} className={css.content__item}>
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
                            <Preset structure={item} />
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
