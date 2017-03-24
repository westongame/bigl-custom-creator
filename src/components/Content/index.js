import React from 'react';
import { tanokComponent } from 'tanok';

import PresetBar from '../PresetBar';
import Preset from '../Preset';

import css from '../../style/blocks/content/index.styl';

@tanokComponent
export default class Content extends React.Component {
    constructor(props) {
        super(props);

        this.onEdit = this.onEdit.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.onMove = this.onMove.bind(this);
        this.checkErrors = this.checkErrors.bind(this);
    }

    onEdit(index) {
        this.send('updateEditMode', 'content');
        this.send('setContentEditIndex', index);
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
        this.send('movePreset', {
            array: 'content',
            index,
            direction,
        });
    }

    checkErrors(preset) {
        return preset.some((item) => item.imageError || item.titleError || item.linkError);
    }

    render() {
        const { content } = this.props;
        let placeholder = (
            <div className={css.content__placeholder}>
                Add some presets here
            </div>
        );

        if (this.props.isPreviewMode) {
            placeholder = null;
        }

        return (
            <div className={css.content}>
                {content.length
                    ? content.map((item, index) => (
                        <div key={index} className={css.content__item}>
                            {
                                !this.props.isPreviewMode ?
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
                                : null
                            }
                            <Preset
                                isPreviewMode={this.props.isPreviewMode}
                                structure={item}
                            />
                        </div>
                    ))
                    : placeholder
                }
            </div>
        );
    }
}

Content.propTypes = {
    isPreviewMode: React.PropTypes.bool.isRequired,
    editMode: React.PropTypes.string,
    editingIndex: React.PropTypes.number,
    content: React.PropTypes.array.isRequired, // TODO more specific proptype needed
};
