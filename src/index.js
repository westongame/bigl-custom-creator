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
    const presetTemplates = require('./templates'); // eslint-disable-line global-require
    require('./reset.styl'); // eslint-disable-line global-require

    const node = document.getElementById('app');

    biglCustomCreator(node, { presetTemplates });
}

export default biglCustomCreator;
