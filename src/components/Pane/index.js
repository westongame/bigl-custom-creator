import React from 'react';
import { tanokComponent } from 'tanok';

import EditMenuPreset from '../EditMenuPreset';
import EditImage from '../EditImage';
import Preset from '../Preset';

import { presets } from '../../templates/presets';

import css from '../../style/blocks/pane/index.styl';

@tanokComponent
export default class Pane extends React.Component {
    constructor(props) {
        super(props);

        this.renderActionsSection = this.renderActionsSection.bind(this);
        this.onEditCancel = this.onEditCancel.bind(this);
    }

    onEditCancel() {
        this.send('onPresetEdit', false);
    }

    renderActionsSection() {
        if (this.props.isEditingMenuPreset) {
            return (
                <EditMenuPreset
                    tanokStream={this.props.tanokStream}
                    menuPresets={this.props.menuPresets}
                    indexOfEditingMenuPreset={this.props.indexOfEditingMenuPreset}
                    editingMenuPresetLinksCount={this.props.editingMenuPresetLinksCount}
                />
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
                {presets.map((item, index) => (
                    <div key={index} className={css.pane__presetContainer}>
                        <Preset structure={item} />
                    </div>
                ))}
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
    menuPresets: React.PropTypes.array,
    isEditingMenuPreset: React.PropTypes.bool,
    indexOfEditingMenuPreset: React.PropTypes.number,
    editingMenuPresetLinksCount: React.PropTypes.number,
    isEditingPreset: React.PropTypes.bool
};
