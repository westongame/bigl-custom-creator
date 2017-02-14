import React from 'react';
import { tanokComponent } from 'tanok';

import EditMenuPreset from '../EditMenuPreset';
import AddPreset from '../AddPreset';
import EditPreset from '../EditPreset';

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
        this.send('onMenuPresetEdit', false);
    }

    renderActionsSection() {
        if (this.props.isEditingMenuPreset) {
            return (
                <div>
                    <div className={css.pane__title}>Edit menu</div>
                    <div className={css.pane__menuEditContainer}>
                        <EditMenuPreset
                            tanokStream={this.props.tanokStream}
                            menuPresets={this.props.menuPresets}
                            indexOfEditingMenuPreset={this.props.indexOfEditingMenuPreset}
                            editingMenuPresetLinksCount={this.props.editingMenuPresetLinksCount}
                        />
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

        if (this.props.isEditingPreset) {
            return (
                <div>
                    <div className={css.pane__title}>Edit preset</div>
                    <div className={css.pane__imageEditContainer}>
                        <EditPreset
                            tanokStream={this.props.tanokStream}
                            block={this.props.content[this.props.contentEditIndex]}
                        />
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

        return <AddPreset tanokStream={this.props.tanokStream} />;
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
    tanokStream: React.PropTypes.object.isRequired,
    content: React.PropTypes.array.isRequired, // TODO more specific proptype needed
    contentEditIndex: React.PropTypes.number.isRequired,
    menuPresets: React.PropTypes.array.isRequired,
    isEditingMenuPreset: React.PropTypes.bool.isRequired,
    indexOfEditingMenuPreset: React.PropTypes.number.isRequired,
    editingMenuPresetLinksCount: React.PropTypes.number.isRequired,
    isEditingPreset: React.PropTypes.bool.isRequired,
};
