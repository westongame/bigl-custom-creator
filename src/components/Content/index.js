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
    }

    onEdit() {
        this.send('onPresetEdit', true);
    }

    render () {
        return (
            <div className={css.content}>
                <div className={css.content__item}>
                    <PresetBar onEdit={this.onEdit} />
                    <Preset />
                </div>
            </div>
        );
    }
}
