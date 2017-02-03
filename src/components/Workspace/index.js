import React from 'react';
import { tanokComponent } from 'tanok';

import SideBar from '../SideBar';
import Content from '../Content';

import css from '../../style/blocks/workspace/index.styl';

@tanokComponent
export default class Workspace extends React.Component {
    constructor(props) {
        super(props);

        this.onFocus = this.onFocus.bind(this);
        this.onBlur = this.onBlur.bind(this);
    }

    onFocus(e) {
        e.currentTarget.select();
    }

    onBlur(e) {
        this.send('onTitleEdit', e.currentTarget.value);
    }

    render () {
        return (
            <div className={css.workspace}>
                <div className={css.workspace__wrapper}>
                    <input
                        className={css.workspace__titleInput}
                        type="text"
                        defaultValue="Untitled"
                        onFocus={this.onFocus}
                        onBlur={this.onBlur}
                    />
                    <div className={css.workspace__contentContainer}>
                        <div className={css.workspace__sidebar}>
                            <SideBar />
                        </div>
                        <div className={css.workspace__content}>
                            <Content tanokStream={this.props.tanokStream} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
