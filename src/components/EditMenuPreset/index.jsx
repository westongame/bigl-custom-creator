import React from 'react';
import PropTypes from 'prop-types';
import { tanokComponent } from 'tanok';

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
        this.syncMenuText = this.syncMenuText.bind(this);
        this.updateTextInput = this.updateTextInput.bind(this);
        this.renderLinkItem = this.renderLinkItem.bind(this);
    }

    addMenuLink() {
        this.send('addMenuLink');
    }

    deleteMenuLink(index) {
        this.send('deleteMenuLink', index);
    }

    syncMenuText(index, prop, value) {
        this.send('syncMenuText', [index, { [prop]: value }]);
    }

    updateTextInput(index, prop, value) {
        this.send('updateMenuPreset', [index, {
            [prop]: value,
            [`${prop}Error`]: false,
        }]);
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
                            onChange={(e) => this.syncMenuText(index, 'text', e.target.value)}
                            update={(value) => this.updateTextInput(index, 'text', value)}
                        />
                    </div>
                    <div className={css.inputWrapper}>
                        <Textbox
                            value={item.href}
                            placeholder='URL'
                            isError={item.hrefError}
                            update={(value) => this.updateTextInput(index, 'href', value)}
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
                        onChange={(e) => this.syncMenuText(null, 'title', e.target.value)}
                        update={(value) => this.updateTextInput(null, 'href', value)}
                    />
                </div>

                {currentMenuPreset.links.map(this.renderLinkItem)}

                <div className={css.item}>
                    <Button theme={'green'} onClick={this.addMenuLink}>
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
