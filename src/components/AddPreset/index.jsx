import React from 'react';
import { tanokComponent } from 'tanok';

import Preset from '../Preset';

import { presets } from '../../templates/presets';

import css from '../../style/blocks/pane/index.styl';

@tanokComponent
export default class AddPreset extends React.Component {
    constructor(props) {
        super(props);

        this.onPresetClick = this.onPresetClick.bind(this);
    }

    onPresetClick(preset) {
        const newItem = JSON.parse(JSON.stringify(preset));
        this.send('addPreset', newItem);
    }

    render() {
        return (
            <div>
                <div className={css.pane__title}>Presets</div>
                {presets.map((item, index) => (
                    <div
                        key={index}
                        className={css.pane__presetContainer}
                        onClick={() => this.onPresetClick(item)}
                    >
                        <Preset structure={item} />
                    </div>
                ))}
            </div>
        );
    }
}
