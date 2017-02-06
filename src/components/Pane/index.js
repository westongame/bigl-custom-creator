import React from 'react';
import { tanokComponent } from 'tanok';

import EditImage from '../EditImage';
import Preset from '../Preset';

import css from '../../style/blocks/pane/index.styl';

@tanokComponent
export default class Pane extends React.Component {
    constructor(props) {
        super(props);

        this.onBlur = this.onBlur.bind(this);
        this.renderActionsSection = this.renderActionsSection.bind(this);
        this.onEditCancel = this.onEditCancel.bind(this);
    }

    onBlur(event) {
        const updatedMenuPresets = this.props.menuPresets;
        const value = event.currentTarget.value;

        for (let i = 0; i < value; i++) {
            updatedMenuPresets[this.props.indexOfEditingMenuPreset].links.push(
                {
                    text: 'Link'
                }
            );
        }

        this.send('updateMenuPresets', updatedMenuPresets);
    }
    
    onEditCancel() {
        this.send('onPresetEdit', false);
    }

    renderActionsSection() {
        if (this.props.isEditingMenuPreset) {
            return (
                <div>
                    <input
                        type="number"
                        onBlur={this.onBlur}
                    />
                </div>
            );
        }

        if (this.props.isEditingPreset) {
            return (
                <div>
                    <div className={css.pane__title}>Images</div>
                    <div className={css.pane__imageEditContainer}>
                        <div className={css.pane__imageEditContainerItem}>
                            <EditImage />
                        </div>
                        <div className={css.pane__imageEditContainerItem}>
                            <EditImage />
                        </div>
                        <div className={css.pane__imageEditContainerItem}>
                            <EditImage />
                        </div>
                    </div>
                    <div className={css.pane__btnHolder}>
                        <div
                            className={css.pane__btn}
                            onClick={this.onEditCancel}
                        >
                            Cancel
                        </div>
                    </div>
                    <div className={css.pane__btnHolder}>
                        <div className={css.pane__btn}>
                            Save
                        </div>
                    </div>
                </div>
            );
        }

        return (
            <div>
                <div className={css.pane__title}>Presets</div>
                <div className={css.pane__presetContainer}>
                    <Preset />
                </div>
            </div>
        );
    }

    render() {
        return (
            <div className={css.pane}>
                <div className={css.pane__layer}>
                    {this.renderActionsSection()}
                </div>
            </div>
        );
    }
}

Pane.propTypes = {
    isEditingMenuPreset: React.PropTypes.bool,
    menuPresets: React.PropTypes.array,
    indexOfEditingMenuPreset: React.PropTypes.number,
    isEditingPreset: React.PropTypes.bool
};
