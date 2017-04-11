import React from 'react';
import PropTypes from 'prop-types';
import { tanokComponent } from 'tanok';
import classNames from 'classnames';

import CustomPropTypes from '../../customPropTypes';
import TextInput from '../TextInput';

import css from '../../style/blocks/edit-menu/index.styl';
import cssInput from '../../style/blocks/textbox/index.styl';
import cssButton from '../../style/blocks/button/index.styl';

import IcoCrossCircle from './cross-circle.svg';

@tanokComponent
export default class EditMenuPreset extends React.Component {
    constructor(props) {
        super(props);

        this.addMenuLink = this.addMenuLink.bind(this);
        this.deleteMenuLink = this.deleteMenuLink.bind(this);
        this.updateTextInput = this.updateTextInput.bind(this);
        this.updateTitleInput = this.updateTitleInput.bind(this);
        this.renderLinkItem = this.renderLinkItem.bind(this);
    }

    addMenuLink() {
        const newMenuPresets = this.props.menuPresets;

        newMenuPresets[this.props.editingIndex].links.push({});

        this.send('updateMenuPresets', newMenuPresets);
    }

    deleteMenuLink(index) {
        const newMenuPresets = this.props.menuPresets;

        newMenuPresets[this.props.editingIndex].links.splice(index, 1);

        this.send('updateMenuPresets', newMenuPresets);
    }

    updateTextInput(target, index, value) {
        const newMenuPresets = this.props.menuPresets;

        newMenuPresets[this.props.editingIndex].links[index][target] = value;
        newMenuPresets[this.props.editingIndex].links[index][`${target}Error`] = false;

        this.send('updateMenuPresets', newMenuPresets);
    }

    updateTitleInput(value) {
        const newMenuPresets = this.props.menuPresets;

        newMenuPresets[this.props.editingIndex].title = value;
        newMenuPresets[this.props.editingIndex].titleError = false;

        this.send('updateMenuPresets', newMenuPresets);
    }

    renderLinkItem(item, index) {
        return (
            <div
                className={css.editMenu__item}
                key={index}
            >
                <div className={css.editMenu__inputHolder}>
                    <div className={css.editMenu__inputWrapper}>
                        <TextInput
                            className={classNames(
                                cssInput.textbox,
                                { [cssInput.textbox_state_error]: item.textError }
                            )}
                            value={item.text}
                            placeholder='Link text'
                            update={(value) => this.updateTextInput('text', index, value)}
                        />
                    </div>
                    <div className={css.editMenu__inputWrapper}>
                        <TextInput
                            className={classNames(
                                cssInput.textbox,
                                { [cssInput.textbox_state_error]: item.hrefError }
                            )}
                            value={item.href}
                            placeholder='URL'
                            update={(value) => this.updateTextInput('href', index, value)}
                        />
                    </div>
                </div>
                <div
                    className={css.editMenu__delBtnHolder}
                    onClick={() => this.deleteMenuLink(index)}
                >
                    <IcoCrossCircle className={css.editMenu__delBtn} />
                </div>
            </div>
        );
    }

    render() {
        const currentMenuPreset = this.props.menuPresets[this.props.editingIndex];

        return (
            <div className={css.editMenu}>
                <div className={css.editMenu__titleContainer}>
                    <TextInput
                        className={classNames(
                            cssInput.textbox,
                            { [cssInput.textbox_state_error]: currentMenuPreset.titleError }
                        )}
                        value={currentMenuPreset.title}
                        placeholder='Menu title'
                        update={this.updateTitleInput}
                    />
                </div>

                {currentMenuPreset.links.map((item, index) => this.renderLinkItem(item, index))}

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
    editingIndex: PropTypes.number,
    menuPresets: PropTypes.arrayOf(CustomPropTypes.menuPreset).isRequired,
};
