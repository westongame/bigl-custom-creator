import React from 'react';
import { tanokComponent } from 'tanok';
import classNames from 'classnames';

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

    addMenuLink() {
        const newMenuPresets = this.props.menuPresets;

        newMenuPresets.structure[this.props.editingIndex].links.push({});

        this.updateMenuPresets(newMenuPresets);
    }

    deleteMenuLink(index) {
        const newMenuPresets = this.props.menuPresets;

        newMenuPresets.structure[this.props.editingIndex].links.splice(index, 1);

        this.updateMenuPresets(newMenuPresets);
    }

    handleTextInputChange(target, index, event) {
        const newMenuPresets = this.props.menuPresets;

        newMenuPresets.structure[this.props.editingIndex].links[index][target] = event.currentTarget.value;
        newMenuPresets.structure[this.props.editingIndex].links[index][`${target}Error`] = false;

        this.updateMenuPresets(newMenuPresets);
    }

    handleTitleInputChange(event) {
        const newMenuPresets = this.props.menuPresets;

        newMenuPresets.structure[this.props.editingIndex].title = event.currentTarget.value;
        newMenuPresets.structure[this.props.editingIndex].titleError = false;

        this.updateMenuPresets(newMenuPresets);
    }

    updateMenuPresets(newMenuPresets) {
        this.send('updateMenuPresets', newMenuPresets);
    }

    renderLinkItems() {
        return this.props.menuPresets.structure[this.props.editingIndex].links.map((item, index) =>
            <div
                className={css.editMenu__item}
                key={index}
            >
                <div className={css.editMenu__inputHolder}>
                    <div className={css.editMenu__inputWrapper}>
                        <input
                            className={classNames(
                                cssInput.textbox,
                                { [cssInput.textbox_state_error]: item.textError }
                            )}
                            type='text'
                            value={item.text ? item.text : ''}
                            placeholder='Link text'
                            onChange={(e) => this.handleTextInputChange('text', index, e)}
                            onFocus={this.onFocus}
                        />
                    </div>
                    <div className={css.editMenu__inputWrapper}>
                        <input
                            className={classNames(
                                cssInput.textbox,
                                { [cssInput.textbox_state_error]: item.hrefError }
                            )}
                            type='text'
                            value={item.href ? item.href : ''}
                            placeholder='URL'
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
                    <input
                        className={classNames(
                            cssInput.textbox,
                            {
                                [cssInput.textbox_state_error]:
                                    this.props.menuPresets.structure[this.props.editingIndex].titleError,
                            }
                        )}
                        type='text'
                        value={
                            this.props.menuPresets.structure[this.props.editingIndex].title ?
                            this.props.menuPresets.structure[this.props.editingIndex].title :
                            ''
                        }
                        placeholder='Menu title'
                        onChange={this.handleTitleInputChange}
                        onFocus={this.onFocus}
                    />
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
    editingIndex: React.PropTypes.number,
    menuPresets: React.PropTypes.object.isRequired,
};
