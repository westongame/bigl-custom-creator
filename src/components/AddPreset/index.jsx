import React from 'react';
import PropTypes from 'prop-types';
import { tanokComponent } from 'tanok';

import CustomPropTypes from '../../customPropTypes';

import Preset from '../Preset';

import css from '../../style/blocks/pane/index.styl';

@tanokComponent
export default class AddPreset extends React.Component {
    render() {
        return (
            <div>
                <div className={css.pane__title}>Presets</div>
                {this.props.presetTemplates.map((item, index) => (
                    <div
                        key={index}
                        className={css.pane__presetContainer}
                        onClick={() => this.send('addPreset', item.children)}
                    >
                        <Preset structure={item.generateMarkupData()} />
                    </div>
                ))}
            </div>
        );
    }
}

AddPreset.propTypes = {
    presetTemplates: PropTypes.arrayOf(CustomPropTypes.preset).isRequired,
};
