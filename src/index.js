import { tanok } from 'tanok';

import AppDispatcher from './dispatcher';
import Model from './model';

import App from './components/Editor/index';

import css from './main.styl'; // eslint-disable-line no-unused-vars

const node = document.getElementById('app');

tanok(
    new Model(),
    (new AppDispatcher()).collect(),
    App,
    { container: node },
);
