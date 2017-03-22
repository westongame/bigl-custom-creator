import React from 'react';
import { tanokComponent } from 'tanok';
import classNames from 'classnames';

import EditImage from '../EditImage';

import css from '../../style/blocks/pane/index.styl';
import cssEdit from '../../style/blocks/edit-menu/index.styl';
import cssInput from '../../style/blocks/textbox/index.styl';

@tanokComponent
export default class EditPreset extends React.Component {
    constructor(props) {
        super(props);
        this.onFocus = this.onFocus.bind(this);
        this.getItems = this.getItems.bind(this);
        this.updateBlock = this.updateBlock.bind(this);
        this.onImageUpload = this.onImageUpload.bind(this);
    }

    onFocus(event) {
        event.currentTarget.select();
    }

    onInputChange(index, prop, e) {
        const value = e.target.value;
        const newBlock = this.props.block;

        newBlock[index][prop] = value;
        newBlock[index][`${prop}Error`] = false;

        this.send('updateContentItem', newBlock);
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

        reader.readAsDataURL(file);
    }

    getItems(structure) {
        return structure.map((content, index) => (
            <div key={index} className={css.pane__imageEditContainerItem}>
                <EditImage
                    imageSrc={content.imageSrc}
                    imageName={content.imageName}
                    onChange={(e) => this.onImageUpload(index, e)}
                />
                <div className={cssEdit.editMenu__item}>
                    <div className={cssEdit.editMenu__title}>
                        Title:
                    </div>
                    <div className={cssEdit.editMenu__inputHolder}>
                        <div className={cssEdit.editMenu__inputWrapper}>
                            <input
                                className={classNames(
                                    cssInput.textbox,
                                    { [cssInput.textbox_state_error]: content.titleError }
                                )}
                                type='text'
                                value={content.title || ''}
                                onChange={(e) => this.onInputChange(index, 'title', e)}
                                onFocus={this.onFocus}
                            />
                        </div>
                    </div>
                </div>
                <div className={cssEdit.editMenu__item}>
                    <div className={cssEdit.editMenu__title}>
                        Link:
                    </div>
                    <div className={cssEdit.editMenu__inputHolder}>
                        <div className={cssEdit.editMenu__inputWrapper}>
                            <input
                                className={classNames(
                                    cssInput.textbox,
                                    { [cssInput.textbox_state_error]: content.linkError }
                                )}
                                type='text'
                                value={content.link || ''}
                                onChange={(e) => this.onInputChange(index, 'link', e)}
                                onFocus={this.onFocus}
                            />
                        </div>
                    </div>
                </div>
            </div>
        ));
    }

    updateBlock(block, index, prop, value) {
        block[index][prop] = value;
        return block;
    }

    render() {
        return <div>{this.getItems(this.props.block)}</div>;
    }
}

EditPreset.propTypes = {
    block: React.PropTypes.array.isRequired, // TODO more specific proptype needed
};
