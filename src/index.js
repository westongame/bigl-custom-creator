import { tanok } from 'tanok';

import AppDispatcher from './dispatcher';
import Model from './model';

import { presetTemplates } from './templates';
import App from './components/Editor';

import css from './main.styl'; // eslint-disable-line no-unused-vars

const biglCustomCreator = (node, initialAppData) => {
    tanok(
        new Model(initialAppData),
        (new AppDispatcher()).collect(),
        App,
        { container: node },
    );
};

if (process.env.NODE_ENV === 'development') {
    const node = document.getElementById('app');

    biglCustomCreator(node, { presetTemplates });
}

export default biglCustomCreator;
