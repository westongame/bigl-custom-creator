import React from 'react';
import { tanokComponent } from 'tanok';

import PresetBar from '../PresetBar';
import Preset from '../Preset'

import css from '../../style/blocks/content/index.styl';

@tanokComponent
export default class Content extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            barVisibility: false
        };

        this.onItemHover = this.onItemHover.bind(this);
        this.onEdit = this.onEdit.bind(this);
    }

    onItemHover() {
        this.setState({
            barVisibility: !this.state.barVisibility
        });
    }

    onEdit() {
        this.send('onPresetEdit', true);
    }

    render () {
        return (
            <div className={css.content}>
                <div
                    className={css.content__item}
                    onMouseEnter={this.onItemHover}
                    onMouseLeave={this.onItemHover}
                >
                    {
                        this.state.barVisibility ?
                            <PresetBar
                                onEdit={this.onEdit}
                            />
                        : null
                    }
                    <Preset />
                </div>
            </div>
        );
    }
}
