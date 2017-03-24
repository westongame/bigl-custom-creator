import React from 'react';
import { tanokComponent } from 'tanok';

import EditMenuPreset from '../EditMenuPreset';
import AddPreset from '../AddPreset';
import EditPreset from '../EditPreset';

import css from '../../style/blocks/pane/index.styl';
import cssButton from '../../style/blocks/button/index.styl';

@tanokComponent
export default class Pane extends React.Component {
    constructor(props) {
        super(props);
        this.renderActionsSection = this.renderActionsSection.bind(this);
        this.onEditCancel = this.onEditCancel.bind(this);
    }

    onEditCancel() {
        this.send('updateEditMode', '');
    }

    renderActionsSection() {
        if (this.props.editMode === 'menu') {
            return (
                <div>
                    <div className={css.pane__title}>Edit menu</div>
                    <div className={css.pane__menuEditContainer}>
                        <EditMenuPreset
                            tanokStream={this.props.tanokStream}
                            editingIndex={this.props.editingIndex}
                            menuPresets={this.props.menuPresets}
                        />
                    </div>
                    <div className={css.pane__btnHolder}>
                        <div
                            className={cssButton.button}
                            onClick={this.onEditCancel}
                        >
                            Close
                        </div>
                    </div>
                </div>
            );
        } else if (this.props.editMode === 'content') {
            return (
                <div>
                    <div className={css.pane__title}>Edit preset</div>
                    <div className={css.pane__imageEditContainer}>
                        <EditPreset
                            tanokStream={this.props.tanokStream}
                            block={this.props.content[this.props.editingIndex]}
                        />
                    </div>
                    <div className={css.pane__btnHolder}>
                        <div
                            className={cssButton.button}
                            onClick={this.onEditCancel}
                        >
                            Close
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
    editMode: React.PropTypes.string.isRequired,
    menuPresets: React.PropTypes.array.isRequired,
    content: React.PropTypes.array.isRequired, // TODO more specific proptype needed
    editingIndex: React.PropTypes.number,
};
