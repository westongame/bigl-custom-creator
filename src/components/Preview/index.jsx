import React from 'react';
import PropTypes from 'prop-types';
import { tanokComponent } from 'tanok';
import classNames from 'classnames';

import CustomPropTypes from '../../customPropTypes';
import MenuPreset from '../MenuPreset';
import Preset from '../Preset';

import css from './preview.styl';

@tanokComponent
export default class Preview extends React.Component {
    constructor(props) {
        super(props);

        this.renderMenu = this.renderMenu.bind(this);
        this.renderContent = this.renderContent.bind(this);
    }

    renderMenu() {
        return this.props.menuPresets.map((item, index) =>
            <div
                className={css.menuContainer}
                key={index}
            >
                <MenuPreset
                    isPreviewMode={this.props.isPreviewMode}
                    menuProps={item}
                />
            </div>
        );
    }

    renderContent() {
        return this.props.contentStructure.map((item, index) =>
            <div
                className={css.gridContainer}
                key={index}
            >
                <Preset
                    isPreviewMode={this.props.isPreviewMode}
                    previewDevice={this.props.previewDevice}
                    structure={item.generateMarkupData()}
                />
            </div>
        );
    }

    render() {
        return (
            <div className={css.root}>
                <div
                    className={classNames(
                        css.container,
                        {
                            [css.container_type_tablet]: this.props.previewDevice === 'tablet',
                            [css.container_type_smartphone]: this.props.previewDevice === 'smartphone',
                        }
                    )}
                >
                    <div className={css.title}>
                        {this.props.customTitle.text}
                    </div>
                    <div className={css.contentContainer}>
                        <div
                            className={classNames(
                                css.sidebar,
                                { [css.sidebar_type_visible]: this.props.previewDevice === 'desktop' }
                            )}
                        >
                            {this.renderMenu()}
                        </div>
                        <div className={css.content}>
                            {this.renderContent()}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Preview.propTypes = {
    isPreviewMode: PropTypes.bool,
    previewDevice: PropTypes.string.isRequired,
    customTitle: PropTypes.object.isRequired,
    menuPresets: PropTypes.arrayOf(CustomPropTypes.menuPreset).isRequired,
    contentStructure: PropTypes.arrayOf(CustomPropTypes.preset).isRequired,
};
