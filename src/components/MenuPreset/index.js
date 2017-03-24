import React from 'react';
import classNames from 'classnames';

import css from '../../style/blocks/category-tree/index.styl';

export default class MenuPreset extends React.Component {
    constructor(props) {
        super(props);

        this.renderLinks = this.renderLinks.bind(this);
    }

    renderLinks() {
        return this.props.menuProps.links.map((item, index) =>
            <div className={css.categoryTree__item} key={index}>
                <a className={css.categoryTree__link} href={item.href ? item.href : '#'}>
                    {item.text ? item.text : 'New link'}
                </a>
            </div>
        );
    }

    render() {
        return (
            <div
                className={classNames(
                    css.categoryTree,
                    { [css.categoryTree_type_bordered]: !this.props.isPreviewMode }
                )}
            >
                <div className={css.categoryTree__title}>
                    {this.props.menuProps.title ? this.props.menuProps.title : 'New menu'}
                </div>
                <div className={css.categoryTree__container}>
                    {this.renderLinks()}
                </div>
            </div>
        );
    }
}

MenuPreset.propTypes = {
    isPreviewMode: React.PropTypes.bool,
    menuProps: React.PropTypes.object,
};
