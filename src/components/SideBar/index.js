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

    onEdit(item, index) {
        this.send('onPresetEdit', false);
        this.send('editingMenuPresetIndex', index);
        this.send('editingMenuPresetLinksCount', item.links.length);
        this.send('onMenuPresetEdit', true);
    }

    onDelete(index) {
        const updatedMenuPresets = this.props.menuPresets;

        delete updatedMenuPresets[index];

        this.send('onMenuPresetEdit', false);
        this.send('updateMenuPresets', updatedMenuPresets);
    }

    onAdd() {
        const updatedMenuPresets = this.props.menuPresets;

        updatedMenuPresets.push(
            {
                title: 'Menu title',
                links: [
                    {
                        text: 'Link',
                        href: '#'
                    },
                    {
                        text: 'Link',
                        href: '#'
                    },
                    {
                        text: 'Link',
                        href: '#'
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
                    {
                        !this.props.isPreviewMode ?
                            <PresetBar
                                onEdit={this.onEdit.bind(this, item, index)}
                                onDelete={this.onDelete.bind(this, index)}
                            />
                        : null
                    }
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
                {
                    !this.props.isPreviewMode ?
                        <div className={css.sidebar__btnHolder}>
                            <div
                                className={css.sidebar__plusBtn}
                                onClick={this.onAdd}
                            >
                                +
                            </div>
                        </div>
                    : null
                }
            </div>
        );
    }
}

Sidebar.propTypes = {
    isPreviewMode: React.PropTypes.bool,
    menuPresets: React.PropTypes.array
};
