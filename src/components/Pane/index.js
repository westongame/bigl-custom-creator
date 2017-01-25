import React from 'react';

import css from '../../style/blocks/pane/index.styl';

export default class Pane extends React.Component {
    render () {
        return (
            <div className={css.pane}></div>
        );
    }
}
