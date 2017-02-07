import React from 'react';
import { tanokComponent } from 'tanok';

@tanokComponent
export default class EditMenuPreset extends React.Component {
    constructor(props) {
        super(props);

        this.updateMenuPresets = this.updateMenuPresets.bind(this);
        this.onFocus = this.onFocus.bind(this);
        this.handleCountInputChange = this.handleCountInputChange.bind(this);
        this.changeLinksCount = this.changeLinksCount.bind(this);
        this.renderLinkItems = this.renderLinkItems.bind(this);
    }

    updateMenuPresets(newMenuPresets) {
        this.send('updateMenuPresets', newMenuPresets);
    }

    onFocus(event) {
        event.currentTarget.select();
    }

    handleCountInputChange(event) {
        this.send('editingMenuPresetLinksCount', Number(event.currentTarget.value));

        this.changeLinksCount(event);
    }

    changeLinksCount(event) {
        const updatedMenuPresets = this.props.menuPresets;
        const updatedLinks = [];
        const value = event.currentTarget.value;

        for (let i = 0; i < value; i++) {
            updatedLinks.push(
                {
                    text: 'Link',
                    href: '#'
                }
            );
        }

        updatedMenuPresets[this.props.indexOfEditingMenuPreset].links = updatedLinks;
        this.updateMenuPresets(updatedMenuPresets);
    }

    renderLinkItems() {
        const items = [];

        this.props.menuPresets[this.props.indexOfEditingMenuPreset].links.forEach((item, index) => {
            items.push(
                <div key={index}>
                    <div>
                        link text:
                        <input
                            type="text"
                            onFocus={this.onFocus}
                        />
                    </div>
                    <div>
                        link href:
                        <input
                            type="text"
                            onFocus={this.onFocus}
                        />
                    </div>
                    <br />
                </div>
            );
        });

        return items;
    }

    render() {
        return (
            <div>
                links count:
                <input
                    type="number"
                    value={this.props.editingMenuPresetLinksCount}
                    onChange={this.handleCountInputChange}
                    onFocus={this.onFocus}
                />
                <br />
                <div>
                    {this.renderLinkItems()}
                </div>
            </div>
        );
    }
}

EditMenuPreset.propTypes = {
    menuPresets: React.PropTypes.array,
    indexOfEditingMenuPreset: React.PropTypes.number,
    editingMenuPresetLinksCount: React.PropTypes.number
};
