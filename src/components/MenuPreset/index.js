import React from 'react';

import css from '../../style/blocks/category-tree/index.styl';

export default class MenuPreset extends React.Component {
    render () {
        return (
            <div className={css.categoryTree}>
                <div className={css.categoryTree__title}>Техника, электроника, аксессуары</div>
                <div className={css.categoryTree__container}>
                    <div className={css.categoryTree__item}>
                        <a className={css.categoryTree__link} href="#">Чехлы для телефонов</a>
                    </div>
                    <div className={css.categoryTree__item}>
                        <a className={css.categoryTree__link} href="#">Наушники</a>
                    </div>
                    <div className={css.categoryTree__item}>
                        <a className={css.categoryTree__link} href="#">Рower bank</a>
                    </div>
                </div>
            </div>
        );
    }
}
