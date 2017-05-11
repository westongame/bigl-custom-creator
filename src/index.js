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
    const { presetTemplates } = require('./templates'); // eslint-disable-line global-require
    require('./reset.styl'); // eslint-disable-line global-require

    const node = document.getElementById('app');
    const importJSON = null;
    const onExportJSON = (data, link) => {
        const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });

        link.href = URL.createObjectURL(blob);
        link.download = `${data.title}.json`;
        URL.revokeObjectURL(blob);
    };

    biglCustomCreator(node, { presetTemplates, importJSON, onExportJSON });
}

export default biglCustomCreator;
