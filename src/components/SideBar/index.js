import React from 'react';
import { tanokComponent } from 'tanok';

import PresetBar from '../PresetBar';
import MenuPreset from '../MenuPreset';

import css from '../../style/blocks/sidebar/index.styl';

@tanokComponent
export default class Sidebar extends React.Component {
    constructor(props) {
        super(props);

        this.onAdd = this.onAdd.bind(this);
        this.renderItems = this.renderItems.bind(this);
    }

    onEdit(item) {
        this.send('onPresetEdit', false);
        this.send('editingMenuPresetIndex', this.props.menuPresets.indexOf(item));
        this.send('onMenuPresetEdit', true);
    }

    onDelete(item) {
        const updatedMenuPresets = this.props.menuPresets;
        const itemIndex = updatedMenuPresets.indexOf(item);

        delete updatedMenuPresets[itemIndex];

        this.send('updateMenuPresets', updatedMenuPresets);
    }

    onAdd() {
        const updatedMenuPresets = this.props.menuPresets;

        updatedMenuPresets.push(
            {
                title: 'Title',
                links: [
                    {
                        text: 'Link'
                    }
                ]
            }
        );

        this.send('updateMenuPresets', updatedMenuPresets);
    }
    
    renderItems() {
        const items = [];

        this.props.menuPresets.forEach((item, index) => {
            items.push(
                <div
                    className={css.sidebar__item}
                    key={index}
                >
                    <PresetBar
                        onEdit={this.onEdit.bind(this, item)}
                        onDelete={this.onDelete.bind(this, item)}
                    />
                    <MenuPreset menuProps={item} />
                </div>
            );
        });

        return items;
    }

    render () {
        return (
            <div className={css.sidebar}>
                {this.renderItems()}
                <div className={css.sidebar__item}>
                    <button onClick={this.onAdd}>Add menu preset</button>
                </div>
            </div>
        );
    }
}

Sidebar.propTypes = {
    menuPresets: React.PropTypes.array
};
