import React from 'react';

import MenuPreset from '../MenuPreset';

import css from '../../style/blocks/sidebar/index.styl';

export default class Sidebar extends React.Component {
    render () {
        return (
            <div className={css.sidebar}>
                <div className={css.sidebar__item}>
                    <MenuPreset />
                </div>
            </div>
        );
    }
}
