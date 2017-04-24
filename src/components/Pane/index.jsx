import React from 'react';
import PropTypes from 'prop-types';
import { tanokComponent } from 'tanok';

import CustomPropTypes from '../../customPropTypes';

import EditMenuPreset from '../EditMenuPreset';
import EditPreset from '../EditPreset';
import Preset from '../Preset';
import Button from '../Button';

import css from './pane.styl';

@tanokComponent
export default class Pane extends React.Component {
    constructor(props) {
        super(props);

        this.renderActionsSection = this.renderActionsSection.bind(this);
        this.onPresetClick = this.onPresetClick.bind(this);
        this.onEditCancel = this.onEditCancel.bind(this);
    }

    onPresetClick(config) {
        this.send('addPreset', config);
    }

    onEditCancel() {
        this.send('updateEditMode', '');
    }

    renderActionsSection() {
        if (this.props.editMode === 'menu') {
            return (
                <div className={css.layer}>
                    <div className={css.title}>Edit menu</div>
                    <div className={css.menuEditContainer}>
                        <EditMenuPreset
                            tanokStream={this.props.tanokStream}
                            editingIndex={this.props.editingIndex}
                            menuPresets={this.props.menuPresets}
                        />
                    </div>
                    <Button
                        onClick={this.onEditCancel}
                    >
                        Close
                    </Button>
                </div>
            );
        } else if (this.props.editMode === 'content') {
            return (
                <div className={css.layer}>
                    <div className={css.title}>Edit preset</div>
                    <div className={css.imageEditContainer}>
                        <EditPreset
                            tanokStream={this.props.tanokStream}
                            block={this.props.content[this.props.editingIndex]}
                        />
                    </div>
                    <Button
                        onClick={this.onEditCancel}
                    >
                        Close
                    </Button>
                </div>
            );
        }

        return (
            <div className={css.layer}>
                <div className={css.title}>Presets</div>
                {
                    this.props.presetTemplates.map((item, index) => (
                        <div
                            className={css.presetContainer}
                            key={index}
                            onClick={() => this.onPresetClick(item.children)}
                        >
                            <Preset structure={item.generateMarkupData()} />
                        </div>
                    ))
                }
            </div>
        );
    }

    render() {
        return (
            <div className={css.root}>
                {this.renderActionsSection()}
            </div>
        );
    }
}

Pane.propTypes = {
    tanokStream: PropTypes.object.isRequired,
    editMode: PropTypes.string.isRequired,
    menuPresets: PropTypes.arrayOf(CustomPropTypes.menuPreset).isRequired,
    content: PropTypes.arrayOf(CustomPropTypes.preset).isRequired,
    presetTemplates: PropTypes.arrayOf(CustomPropTypes.preset).isRequired,
    editingIndex: PropTypes.number,
};
