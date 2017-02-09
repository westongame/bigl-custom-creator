import React from 'react';

import css from '../../style/blocks/editor-bar/index.styl';

import IcoDownload from './download.svg';

export default class BottomBar extends React.Component {
    constructor(props) {
        super(props);

        this.onDownload = this.onDownload.bind(this);
    }

    onDownload(e) {
        const link = e.currentTarget;
        const data = {
            title: this.props.customTitle,
            menu: this.props.menuStructure,
            content: this.props.contentStructure,
        };
        const blob = new Blob([JSON.stringify(data)], {type: 'application/json'});
        const url = URL.createObjectURL(blob);
        link.href = url;
        link.download = this.props.customTitle + '.json';
    }

    render () {
        return (
            <div className={css.editorBar}>
                <div className={css.editorBar__btnsContainer}>
                    <a
                        className={css.editorBar__button}
                        onClick={this.onDownload}
                    >
                        <IcoDownload className={css.editorBar__buttonIco} />
                        <span className={css.editorBar__buttonText}>
                            Download JSON
                        </span>
                    </a>
                </div>
            </div>
        );
    }
}

BottomBar.propTypes = {
    customTitle: React.PropTypes.string
};
