import React from 'react';
import { tanokComponent } from 'tanok';

import PresetBar from '../PresetBar';
import Preset from '../Preset'

import css from '../../style/blocks/content/index.styl';

@tanokComponent
export default class Content extends React.Component {
    constructor(props) {
        super(props);

        this.onEdit = this.onEdit.bind(this);
    }

    onEdit() {
        this.send('onPresetEdit', true);
    }

    render () {
        const structure = { columns:
            [
                {
                    columns: [
                        {
                            items: [
                                {
                                    imageSrc: 'http://static-cache.ua.uaprom.net/custom-view/BIGL/custom-100/custom-100-img1.png',
                                    title: 'title'
                                }
                            ]
                        },
                        {
                            items: [{}]
                        }
                    ]
                },
                {
                    items: [
                        {
                            imageSrc: 'http://static-cache.ua.uaprom.net/custom-view/BIGL/custom-100/custom-100-img3.png',
                            title: 'title'
                        }
                    ]
                }
            ]
        };
        return (
            <div className={css.content}>
                <div className={css.content__item}>
                    <PresetBar onEdit={this.onEdit} />
                    <Preset structure={structure} />
                </div>
            </div>
        );
    }
}
