import React from 'react';
import PropTypes from 'prop-types';
import { tanokComponent } from 'tanok';

import CustomPropTypes from '../../customPropTypes';
import PresetBar from '../PresetBar';
import MenuPreset from '../MenuPreset';
import Button from '../Button';

import css from './sideBar.styl';

@tanokComponent
export default class Sidebar extends React.Component {
    constructor(props) {
        super(props);

        this.onEdit = this.onEdit.bind(this);
        this.onAdd = this.onAdd.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.onMove = this.onMove.bind(this);
        this.renderItem = this.renderItem.bind(this);
        this.checkErrors = this.checkErrors.bind(this);
    }

    onEdit(item, index) {
        this.send('updateEditMode', 'menu');
        this.send('updateEditingIndex', index);
    }

    onDelete(index) {
        this.send('updateEditMode', '');
        this.send('deleteMenuPreset', index);
    }

    onAdd() {
        this.send('addMenuPreset');
    }

    onMove(index, direction) {
        this.send('movePreset', {
            array: 'menuPresets',
            index,
            direction,
        });
    }

    checkErrors(item) {
        return item.titleError || item.links.some((link) => link.textError || link.hrefError);
    }

    renderItem(item, index) {
        return (
            <div className={css.item} key={index}>
                <PresetBar
                    editMode={this.props.editMode}
                    editingIndex={this.props.editingIndex}
                    itemIndex={index}
                    itemMode='menu'
                    itemError={this.checkErrors(item)}
                    onEdit={() => this.onEdit(item, index)}
                    onDelete={() => this.onDelete(index)}
                    onMove={(direction) => this.onMove(index, direction)}
                    contentLength={this.props.menuPresets.length}
                />
                <MenuPreset menuProps={item} />
            </div>
        );
    }

    render() {
        return (
            <div className={css.root}>
                {this.props.menuPresets.map(this.renderItem)}
                <div className={css.btnHolder}>
                    <Button
                        theme={'green'}
                        onClick={this.onAdd}
                    >
                        +
                    </Button>
                </div>
            </div>
        );
    }
}

Sidebar.propTypes = {
    editMode: PropTypes.string.isRequired,
    editingIndex: PropTypes.number,
    menuPresets: PropTypes.arrayOf(CustomPropTypes.menuPreset).isRequired,
};
