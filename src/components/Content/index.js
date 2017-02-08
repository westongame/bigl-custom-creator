import React from 'react';
import { tanokComponent } from 'tanok';

import PresetBar from '../PresetBar';
import Preset from '../Preset'

import css from '../../style/blocks/content/index.styl';

@tanokComponent
export default class Content extends React.Component {
    constructor(props) {
        super(props);

        this.onEdit = this.onEdit.bind(this);
        this.onDelete = this.onDelete.bind(this);
    }

    onEdit(index) {
        this.send('onMenuPresetEdit', false);
        this.send('onPresetEdit', true);
        this.send('setContentEditIndex', index);
    }

    onDelete(index) {
        this.send('DeletePreset', index);
    }

    render () {
        const { content } = this.props;
        const placeholder = (
            <div className={css.content__placeholder}>
                Add some presets here ==>
            </div>
        );

        return (
            <div className={css.content}>
                { content.length
                    ? content.map((item, index) => (
                        <div key={index} className={css.content__item}>
                            <PresetBar
                                onEdit={() =>this.onEdit(index)}
                                onDelete={() => this.onDelete(index)}
                            />
                            <Preset structure={item} />
                        </div>
                    ))
                    : placeholder
                }
            </div>
        );
    }
}

Content.propTypes = {
    content: React.PropTypes.array, // TODO more specific proptype needed
};
