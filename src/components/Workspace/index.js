import React from 'react';
import { tanokComponent } from 'tanok';
import classNames from 'classnames';

import SideBar from '../SideBar';
import Content from '../Content';

import css from '../../style/blocks/workspace/index.styl';

@tanokComponent
export default class Workspace extends React.Component {
    constructor(props) {
        super(props);

        this.onFocus = this.onFocus.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onFocus(e) {
        e.currentTarget.select();
    }

    onChange(e) {
        this.send('onTitleEdit', e.currentTarget.value);
    }

    render() {
        return (
            <div
                className={classNames(
                    css.workspace,
                    { [css.workspace_type_preview]: this.props.isPreviewMode }
                )}
            >
                <div className={css.workspace__wrapper}>
                    <input
                        className={css.workspace__titleInput}
                        type='text'
                        value={this.props.customTitle}
                        disabled={this.props.isPreviewMode}
                        onFocus={this.onFocus}
                        onChange={this.onChange}
                    />
                    <div className={css.workspace__contentContainer}>
                        <div className={css.workspace__sidebar}>
                            <SideBar
                                tanokStream={this.props.tanokStream}
                                isPreviewMode={this.props.isPreviewMode}
                                menuPresets={this.props.menuPresets}
                            />
                        </div>
                        <div className={css.workspace__content}>
                            <Content
                                tanokStream={this.props.tanokStream}
                                isPreviewMode={this.props.isPreviewMode}
                                content={this.props.content}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Workspace.propTypes = {
    tanokStream: React.PropTypes.object.isRequired,
    isPreviewMode: React.PropTypes.bool.isRequired,
    content: React.PropTypes.array.isRequired, // TODO more specific proptype needed
    menuPresets: React.PropTypes.array.isRequired,
    customTitle: React.PropTypes.string.isRequired,
};
