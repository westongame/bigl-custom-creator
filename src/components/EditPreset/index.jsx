import React from 'react';
import { tanokComponent } from 'tanok';

import CustomPropTypes from '../../customPropTypes';
import EditImage from '../EditImage';
import TextBox from '../Textbox';

import css from './editPreset.styl';

@tanokComponent
export default class EditPreset extends React.Component {
    constructor(props) {
        super(props);
        this.onImageUpload = this.onImageUpload.bind(this);
        this.updateInputValue = this.updateInputValue.bind(this);
        this.renderEditItem = this.renderEditItem.bind(this);
    }

    onImageUpload(index, e) {
        this.send('uploadImage', [e, index]);
    }

    updateInputValue(index, prop, value) {
        this.send('updateContentItem', [index, {
            [prop]: value,
            [`${prop}Error`]: false,
        }]);
    }

    renderEditItem(content, index) {
        return (
            <div key={index} className={css.item}>
                <div className={css.imageContainer}>
                    <EditImage
                        imageSrc={content.imageSrc}
                        imageName={content.imageName}
                        onChange={(e) => this.onImageUpload(index, e)}
                        itemId={index}
                    />
                </div>
                <TextBox
                    value={content.title}
                    placeholder='Title'
                    isError={content.titleError}
                    update={(value) => this.updateInputValue(index, 'title', value)}
                />
                <TextBox
                    value={content.link}
                    placeholder='URL'
                    isError={content.linkError}
                    update={(value) => this.updateInputValue(index, 'link', value)}
                />
            </div>
        );
    }

    render() {
        return <div className={css.root}>{this.props.block.children.map(this.renderEditItem)}</div>;
    }
}

EditPreset.propTypes = {
    block: CustomPropTypes.preset.isRequired,
};
