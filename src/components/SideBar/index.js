import React from 'react';
import { tanokComponent } from 'tanok';
import { menuPresetTemplate } from '../../templates/menuPreset';

import PresetBar from '../PresetBar';
import MenuPreset from '../MenuPreset';

import css from '../../style/blocks/sidebar/index.styl';
import cssButton from '../../style/blocks/button/index.styl';

@tanokComponent
export default class Sidebar extends React.Component {
    constructor(props) {
        super(props);

        this.updateMenuPresets = this.updateMenuPresets.bind(this);
        this.onEdit = this.onEdit.bind(this);
        this.onAdd = this.onAdd.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.renderItems = this.renderItems.bind(this);
        this.checkErrors = this.checkErrors.bind(this);
    }

    onEdit(item, index) {
        this.send('updateEditMode', 'menu');
        this.send('updateEditingIndex', index);

        const newMenuPresets = this.props.menuPresets;

        newMenuPresets.editingLinksCount = item.links.length;

        this.updateMenuPresets(newMenuPresets);
    }

    onDelete(index) {
        this.send('updateEditMode', '');

        const newMenuPresets = this.props.menuPresets;

        newMenuPresets.structure.splice(index, 1);

        this.updateMenuPresets(newMenuPresets);
    }

    onAdd() {
        const newMenuPresets = this.props.menuPresets;
        const menuPreset = JSON.parse(JSON.stringify(menuPresetTemplate[0]));

        newMenuPresets.structure.push(menuPreset);

        this.updateMenuPresets(newMenuPresets);
    }

    checkErrors(item) {
        return item.titleError || item.links.some((link) => link.textError || link.hrefError);
    }

    updateMenuPresets(newMenuPresets) {
        this.send('updateMenuPresets', newMenuPresets);
    }

    renderItems() {
        const items = [];

        this.props.menuPresets.structure.forEach((item, index) => {
            items.push(
                <div
                    className={css.sidebar__item}
                    key={index}
                >
                    {
                        !this.props.isPreviewMode ?
                            <PresetBar
                                editMode={this.props.editMode}
                                editingIndex={this.props.editingIndex}
                                itemIndex={index}
                                itemMode='menu'
                                itemError={this.checkErrors(item)}
                                onEdit={() => this.onEdit(item, index)}
                                onDelete={() => this.onDelete(index)}
                            />
                            : null
                    }
                    <MenuPreset menuProps={item} />
                </div>
            );
        });

        return items;
    }

    render() {
        return (
            <div className={css.sidebar}>
                {this.renderItems()}
                {
                    !this.props.isPreviewMode ?
                        <div className={css.sidebar__btnHolder}>
                            <div
                                className={[cssButton.button, cssButton.button_theme_green].join(' ')}
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
    isPreviewMode: React.PropTypes.bool.isRequired,
    editMode: React.PropTypes.string.isRequired,
    editingIndex: React.PropTypes.number,
    menuPresets: React.PropTypes.object.isRequired,
};
