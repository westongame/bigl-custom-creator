import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import css from './menuPreset.styl';

export default class MenuPreset extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            collapse: this.props.menuProps.links.length > 3,
        };

        this.showBtnClick = this.showBtnClick.bind(this);
        this.hideBtnClick = this.hideBtnClick.bind(this);
        this.renderLinks = this.renderLinks.bind(this);
    }

    showBtnClick() {
        this.setState({
            collapse: false,
        });
    }

    hideBtnClick() {
        this.setState({
            collapse: true,
        });
    }

    renderLinks() {
        const links = [];

        this.props.menuProps.links.forEach((item, index) => {
            links.push(
                <div className={css.item} key={index}>
                    <a className={css.link} href={item.href ? item.href : '#'}>
                        {item.text ? item.text : 'New link'}
                    </a>
                </div>
            );
        });

        if (this.props.isPreviewMode && this.state.collapse) {
            const hiddenItemsCount = this.props.menuProps.links.length - 3;

            links.splice(3, hiddenItemsCount);

            links.push(
                <div className={css.item} key='showMore'>
                    <a
                        className={css.expandLink}
                        onClick={this.showBtnClick}
                    >
                        {`Show ${hiddenItemsCount} more`}
                    </a>
                </div>
            );

            return links;
        }

        if (this.props.isPreviewMode && this.props.menuProps.links.length > 3 && !this.state.collapse) {
            links.push(
                <div className={css.item} key='hide'>
                    <a
                        className={css.expandLink}
                        onClick={this.hideBtnClick}
                    >
                        {`Hide items`}
                    </a>
                </div>
            );
        }

        return links;
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
                    {this.props.menuProps.title ? this.props.menuProps.title : 'New menu'}
                </div>
                <div className={css.container}>
                    {this.renderLinks()}
                </div>
            </div>
        );
    }
}

MenuPreset.propTypes = {
    isPreviewMode: PropTypes.bool,
    menuProps: PropTypes.object,
};
