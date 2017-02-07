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

    onEdit() {
        this.send('onMenuPresetEdit', false);
        this.send('onPresetEdit', true);
    }

    onDelete(index) {
        this.send('DeletePreset', index);
    }

    render () {
        return (
            <div className={css.content}>
                {this.props.content.map((item, index) => (
                    <div key={index} className={css.content__item}>
                        <PresetBar
                            onEdit={this.onEdit}
                            onDelete={() => this.onDelete(index)}
                        />
                        <Preset structure={item} />
                    </div>
                ))}
            </div>
        );
    }
}

Content.propTypes = {
    content: React.PropTypes.array, // TODO more specific proptype needed
};
