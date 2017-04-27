import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import css from './menuPreset.styl';

export default class MenuPreset extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            collapse: true,
        };

        this.expandLinkClick = this.expandLinkClick.bind(this);
        this.renderLinks = this.renderLinks.bind(this);
        this.renderExpandLink = this.renderExpandLink.bind(this);
    }

    expandLinkClick() {
        this.setState({ collapse: !this.state.collapse });
    }

    renderLinks() {
        const { menuProps, isPreviewMode } = this.props;
        let links = menuProps.links;

        if (isPreviewMode && this.state.collapse) {
            links = links.slice(0, 3);
        }

        return links.map((item, index) => (
            <div className={css.item} key={index}>
                <a className={css.link} href={item.href ? item.href : '#'}>
                    {item.text ? item.text : 'New link'}
                </a>
            </div>
        ));
    }

    renderExpandLink() {
        const { menuProps, isPreviewMode } = this.props;
        const showLink = menuProps.links.length > 3;
        const hiddenItemsCount = this.props.menuProps.links.length - 3;

        if (!isPreviewMode || !showLink) {
            return null;
        }

        return (
            <div className={css.item} key='expandLink'>
                <a
                    className={css.expandLink}
                    onClick={this.expandLinkClick}
                >
                    {this.state.collapse ? `Show ${hiddenItemsCount} more` : `Hide items`}
                </a>
            </div>
        );
    }

    render() {
        return (
            <div
                className={classNames(
                    css.root,
                    { [css.root_type_bordered]: !this.props.isPreviewMode }
                )}
            >
                <div className={css.title}>
                    {this.props.menuProps.title || 'New menu'}
                </div>
                <div className={css.container}>
                    {this.renderLinks()}
                    {this.renderExpandLink()}
                </div>
            </div>
        );
    }
}

MenuPreset.propTypes = {
    isPreviewMode: PropTypes.bool,
    menuProps: PropTypes.object,
};
