import React from 'react';
import { tanokComponent } from 'tanok';

import { presetTemplates } from '../../templates';
import Preset from '../Preset';

import css from '../../style/blocks/pane/index.styl';

@tanokComponent
export default class AddPreset extends React.Component {
    constructor(props) {
        super(props);

        this.onPresetClick = this.onPresetClick.bind(this);
    }

    onPresetClick(config) {
        this.send('addPreset', config);
    }

    render() {
        return (
            <div>
                <div className={css.pane__title}>Presets</div>
                {presetTemplates.map((item, index) => (
                    <div
                        key={index}
                        className={css.pane__presetContainer}
                        onClick={() => this.onPresetClick(item)}
                    >
                        <Preset structure={{ children: item }} />
                    </div>
                ))}
            </div>
        );
    }
}
