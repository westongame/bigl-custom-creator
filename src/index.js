import { tanok } from 'tanok';

import AppDispatcher from './dispatcher';
import Model from './model';

import App from './components/Editor';

const biglCustomCreator = (node, initialAppData) => {
    tanok(
        new Model(initialAppData),
        (new AppDispatcher()).collect(),
        App,
        { container: node },
    );
};

if (process.env.NODE_ENV === 'development') {
    require('./reset.styl'); // eslint-disable-line global-require

    const node = document.getElementById('app');
    const presetTemplates = [
        [
            { column: 1, row: 1 },
            { column: 2, row: 1 },
            { column: 3, row: 1 },
            { column: 4, row: 1 },
        ],
        [
            { column: [1, 2], row: 1 },
            { column: 3, row: 1 },
            { column: 4, row: 1 },
        ],
        [
            { column: 1, row: 1 },
            { column: [2, 3], row: 1 },
            { column: 4, row: 1 },
        ],
        [
            { column: 1, row: 1 },
            { column: 2, row: 1 },
            { column: [3, 4], row: 1 },
        ],
        [
            { column: [1, 2], row: 1 },
            { column: [3, 4], row: 1 },
        ],
        [
            { column: [1, 2, 3, 4], row: 1 },
        ],
    ];
    const importJSON = null;
    const onExportJSON = null;

    biglCustomCreator(node, { presetTemplates, importJSON, onExportJSON });
}

export default biglCustomCreator;
