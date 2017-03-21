import React from 'react';
import { tanokComponent } from 'tanok';

import css from '../../style/blocks/edit-menu/index.styl';
import cssInput from '../../style/blocks/textbox/index.styl';
import cssButton from '../../style/blocks/button/index.styl';

import IcoCross from './cross.svg';

@tanokComponent
export default class EditMenuPreset extends React.Component {
    constructor(props) {
        super(props);

        this.updateMenuPresets = this.updateMenuPresets.bind(this);
        this.onFocus = this.onFocus.bind(this);
        this.addMenuLink = this.addMenuLink.bind(this);
        this.deleteMenuLink = this.deleteMenuLink.bind(this);
        this.handleTitleInputChange = this.handleTitleInputChange.bind(this);
        this.renderLinkItems = this.renderLinkItems.bind(this);
    }

    onFocus(event) {
        event.currentTarget.select();
    }

    updateMenuPresets(newMenuPresets) {
        this.send('updateMenuPresets', newMenuPresets);
    }

    addMenuLink() {
        const updatedMenuPresets = this.props.menuPresets;

        updatedMenuPresets[this.props.indexOfEditingMenuPreset].links.push(
            {
                text: 'Link',
                href: '#',
            }
        );

        this.updateMenuPresets(updatedMenuPresets);
    }

    deleteMenuLink(index) {
        const updatedMenuPresets = this.props.menuPresets;

        updatedMenuPresets[this.props.indexOfEditingMenuPreset].links.splice(index, 1);

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
        return this.props.menuPresets[this.props.indexOfEditingMenuPreset].links.map((item, index) =>
            <div
                className={css.editMenu__item}
                key={index}
            >
                <div className={css.editMenu__title}>
                    {index + 1}:
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
                <div
                    className={css.editMenu__delBtnHolder}
                    onClick={() => this.deleteMenuLink(index)}
                >
                    <IcoCross className={css.editMenu__delBtn} />
                </div>
            </div>
        );
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

                {this.renderLinkItems()}

                <div className={css.editMenu__item}>
                    <div
                        className={[cssButton.button, cssButton.button_theme_green].join(' ')}
                        onClick={this.addMenuLink}
                    >
                        +
                    </div>
                </div>
            </div>
        );
    }
}

EditMenuPreset.propTypes = {
    menuPresets: React.PropTypes.array.isRequired,
    indexOfEditingMenuPreset: React.PropTypes.number.isRequired,
    editingMenuPresetLinksCount: React.PropTypes.number.isRequired,
};
