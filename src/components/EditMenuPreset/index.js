import React from 'react';
import { tanokComponent } from 'tanok';

import css from '../../style/blocks/edit-menu/index.styl';
import cssInput from '../../style/blocks/textbox/index.styl';

@tanokComponent
export default class EditMenuPreset extends React.Component {
    constructor(props) {
        super(props);

        this.updateMenuPresets = this.updateMenuPresets.bind(this);
        this.onFocus = this.onFocus.bind(this);
        this.handleCountInputChange = this.handleCountInputChange.bind(this);
        this.handleTitleInputChange = this.handleTitleInputChange.bind(this);
        this.changeLinksCount = this.changeLinksCount.bind(this);
        this.renderLinkItems = this.renderLinkItems.bind(this);
    }

    onFocus(event) {
        event.currentTarget.select();
    }

    updateMenuPresets(newMenuPresets) {
        this.send('updateMenuPresets', newMenuPresets);
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
                    href: '#',
                }
            );
        }

        updatedMenuPresets[this.props.indexOfEditingMenuPreset].links = updatedLinks;
        this.updateMenuPresets(updatedMenuPresets);
    }

    handleTextInputChange(target, index, event) {
        const updatedMenuPresets = this.props.menuPresets;
        updatedMenuPresets[this.props.indexOfEditingMenuPreset].links[index][target] = event.currentTarget.value;

        this.updateMenuPresets(updatedMenuPresets);
    }

    handleTitleInputChange(event) {
        const updatedMenuPresets = this.props.menuPresets;
        updatedMenuPresets[this.props.indexOfEditingMenuPreset].title = event.currentTarget.value;

        this.updateMenuPresets(updatedMenuPresets);
    }

    renderLinkItems() {
        const items = [];

        this.props.menuPresets[this.props.indexOfEditingMenuPreset].links.forEach((item, index) => {
            items.push(
                <div
                    className={css.editMenu__item}
                    key={index}
                >
                    <div className={css.editMenu__title}>
                        Link {index + 1}:
                    </div>
                    <div className={css.editMenu__inputHolder}>
                        <div className={css.editMenu__inputWrapper}>
                            <input
                                className={cssInput.textbox}
                                type='text'
                                value={item.text}
                                onChange={(e) => this.handleTextInputChange('text', index, e)}
                                onFocus={this.onFocus}
                            />
                        </div>
                        <div className={css.editMenu__inputWrapper}>
                            <input
                                className={cssInput.textbox}
                                type='text'
                                value={item.href}
                                onChange={(e) => this.handleTextInputChange('href', index, e)}
                                onFocus={this.onFocus}
                            />
                        </div>
                    </div>
                </div>
            );
        });

        return items;
    }

    render() {
        return (
            <div className={css.editMenu}>
                <div className={css.editMenu__item}>
                    <div className={css.editMenu__title}>
                        Menu title:
                    </div>
                    <div className={css.editMenu__inputHolder}>
                        <input
                            className={cssInput.textbox}
                            type='text'
                            value={this.props.menuPresets[this.props.indexOfEditingMenuPreset].title}
                            onChange={this.handleTitleInputChange}
                            onFocus={this.onFocus}
                        />
                    </div>
                </div>
                <div className={css.editMenu__item}>
                    <div className={css.editMenu__title}>
                        Links count:
                    </div>
                    <div className={css.editMenu__inputHolder}>
                        <input
                            className={[cssInput.textbox, cssInput.textbox_type_number].join(' ')}
                            type='number'
                            value={this.props.editingMenuPresetLinksCount}
                            onChange={this.handleCountInputChange}
                            onFocus={this.onFocus}
                        />
                    </div>
                </div>
                {this.renderLinkItems()}
            </div>
        );
    }
}

EditMenuPreset.propTypes = {
    menuPresets: React.PropTypes.array.isRequired,
    indexOfEditingMenuPreset: React.PropTypes.number.isRequired,
    editingMenuPresetLinksCount: React.PropTypes.number.isRequired,
};
