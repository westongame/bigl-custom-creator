import React from 'react';

import Preset from '../Preset';

import css from '../../style/blocks/pane/index.styl';

export default class Pane extends React.Component {
    render () {
        return (
            <div className={css.pane}>
                <Preset />
            </div>
        );
    }
}
