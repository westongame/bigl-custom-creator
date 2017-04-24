import React from 'react';
import PropTypes from 'prop-types';
import { tanokComponent } from 'tanok';

import { MenuLink } from '../../utils/entities';
import CustomPropTypes from '../../customPropTypes';

import Textbox from '../Textbox';
import Button from '../Button';

import { IcoCrossCircle } from '../../svg';

import css from './editMenuPreset.styl';

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

        newMenuPresets[this.props.editingIndex].links.push(new MenuLink());

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
                className={css.item}
                key={index}
            >
                <div className={css.inputHolder}>
                    <div className={css.inputWrapper}>
                        <Textbox
                            value={item.text}
                            placeholder='Link text'
                            isError={item.textError}
                            update={(value) => this.updateTextInput('text', index, value)}
                        />
                    </div>
                    <div className={css.inputWrapper}>
                        <Textbox
                            value={item.href}
                            placeholder='URL'
                            isError={item.hrefError}
                            update={(value) => this.updateTextInput('href', index, value)}
                        />
                    </div>
                </div>
                <div
                    className={css.delBtnHolder}
                    onClick={() => this.deleteMenuLink(index)}
                >
                    <IcoCrossCircle className={css.delBtn} />
                </div>
            </div>
        );
    }

    render() {
        const currentMenuPreset = this.props.menuPresets[this.props.editingIndex];

        return (
            <div className={css.root}>
                <div className={css.titleContainer}>
                    <Textbox
                        value={currentMenuPreset.title}
                        placeholder='Menu title'
                        isError={currentMenuPreset.titleError}
                        update={this.updateTitleInput}
                    />
                </div>

                {currentMenuPreset.links.map((item, index) => this.renderLinkItem(item, index))}

                <div className={css.item}>
                    <Button
                        theme={'green'}
                        onClick={this.addMenuLink}
                    >
                        +
                    </Button>
                </div>
            </div>
        );
    }
}

EditMenuPreset.propTypes = {
    editingIndex: PropTypes.number,
    menuPresets: PropTypes.arrayOf(CustomPropTypes.menuPreset).isRequired,
};
