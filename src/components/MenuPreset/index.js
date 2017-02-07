import React from 'react';

import css from '../../style/blocks/category-tree/index.styl';

export default class MenuPreset extends React.Component {
    constructor (props) {
        super(props);

        this.renderLinks = this.renderLinks.bind(this);
    }

    renderLinks() {
        const items = [];

        this.props.menuProps.links.forEach((item, index) => {
            items.push(
                <div className={css.categoryTree__item} key={index}>
                    <a className={css.categoryTree__link} href={item.href}>
                        {item.text}
                    </a>
                </div>
            );
        });

        return items;
    }

    render() {
        return (
            <div className={css.categoryTree}>
                <div className={css.categoryTree__title}>
                    {this.props.menuProps.title}
                </div>
                <div className={css.categoryTree__container}>
                    {this.renderLinks()}
                </div>
            </div>
        );
    }
}

MenuPreset.propTypes = {
    menuProps: React.PropTypes.object
};
