import React from 'react';
import PropTypes from 'prop-types';
import { tanokComponent } from 'tanok';
import classNames from 'classnames';

import CustomPropTypes from '../../customPropTypes';
import MenuPreset from '../MenuPreset';
import Preset from '../Preset';

import css from '../../style/blocks/preview/index.styl';

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
                className={css.preview__menuContainer}
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
                className={css.preview__gridContainer}
                key={index}
            >
                <Preset
                    isPreviewMode={this.props.isPreviewMode}
                    previewDevice={this.props.previewDevice}
                    structure={item}
                />
            </div>
        );
    }

    render() {
        return (
            <div className={css.preview}>
                <div
                    className={classNames(
                        css.preview__container,
                        {
                            [css.preview__container_type_tablet]: this.props.previewDevice === 'tablet',
                            [css.preview__container_type_smartphone]: this.props.previewDevice === 'smartphone',
                        }
                    )}
                >
                    <div className={css.preview__title}>
                        {this.props.customTitle.text}
                    </div>
                    <div className={css.preview__contentContainer}>
                        <div
                            className={classNames(
                                css.preview__sidebar,
                                { [css.preview__sidebar_type_visible]: this.props.previewDevice === 'desktop' }
                            )}
                        >
                            {this.renderMenu()}
                        </div>
                        <div className={css.preview__content}>
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
