import React from 'react';
import { tanokComponent } from 'tanok';

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
                    structure={item}
                />
            </div>
        );
    }

    render() {
        return (
            <div className={css.preview}>
                <div className={css.preview__container}>
                    <div className={css.preview__title}>
                        {this.props.customTitle.text}
                    </div>
                    <div className={css.preview__contentContainer}>
                        <div className={css.preview__sidebar}>
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
    isPreviewMode: React.PropTypes.bool,
    customTitle: React.PropTypes.object.isRequired,
    menuPresets: React.PropTypes.array.isRequired,
    contentStructure: React.PropTypes.array.isRequired, // TODO more specific proptype needed
};
