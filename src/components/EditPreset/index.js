import React from 'react';
import { tanokComponent } from 'tanok';
import classNames from 'classnames';

import EditImage from '../EditImage';
import TextInput from '../TextInput';

import css from '../../style/blocks/pane/index.styl';
import cssEdit from '../../style/blocks/edit-menu/index.styl';
import cssInput from '../../style/blocks/textbox/index.styl';

@tanokComponent
export default class EditPreset extends React.Component {
    constructor(props) {
        super(props);
        this.onImageUpload = this.onImageUpload.bind(this);
        this.updateInputValue = this.updateInputValue.bind(this);
        this.renderEditItem = this.renderEditItem.bind(this);
    }

    onImageUpload(index, e) {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onload = (event) => {
            const newBlock = this.props.block;

            newBlock[index].imageSrc = event.target.result;
            newBlock[index].imageName = file.name;
            newBlock[index].imageError = false;

            this.send('updateContentItem', newBlock);
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    }

    updateInputValue(index, prop, value) {
        const newBlock = this.props.block;

        newBlock[index][prop] = value;
        newBlock[index][`${prop}Error`] = false;

        this.send('updateContentItem', newBlock);
    }

    renderEditItem(content, index) {
        return (
            <div key={index} className={css.pane__imageEditContainerItem}>
                <EditImage
                    imageSrc={content.imageSrc}
                    imageName={content.imageName}
                    onChange={(e) => this.onImageUpload(index, e)}
                    itemId={index}
                />
                <div className={cssEdit.editMenu__item}>
                    <div className={cssEdit.editMenu__inputHolder}>
                        <div className={cssEdit.editMenu__inputWrapper}>
                            <TextInput
                                className={classNames(
                                    cssInput.textbox,
                                    { [cssInput.textbox_state_error]: content.titleError }
                                )}
                                value={content.title}
                                placeholder='Title'
                                update={(value) => this.updateInputValue(index, 'title', value)}
                            />
                        </div>
                        <div className={cssEdit.editMenu__inputWrapper}>
                            <TextInput
                                className={classNames(
                                    cssInput.textbox,
                                    { [cssInput.textbox_state_error]: content.linkError }
                                )}
                                value={content.link}
                                placeholder='URL'
                                update={(value) => this.updateInputValue(index, 'link', value)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    render() {
        return (
            <div>
                {this.props.block.map(
                    (content, index) => this.renderEditItem(content, index)
                )}
            </div>
        );
    }
}

EditPreset.propTypes = {
    block: React.PropTypes.array.isRequired, // TODO more specific proptype needed
};
