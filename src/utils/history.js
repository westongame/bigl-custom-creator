const HISTORY_LIMIT = 20;
const START_STEP = 0;
const START_ID = 0;
const APP_NAMESPACE = 'bccApp';
const INITIAL_HISTORY_STATE = {
    step: START_STEP,
    idMap: [START_ID],
};

const getHistoryRaw = () => {
    try {
        return localStorage.getItem(`${APP_NAMESPACE}-history`);
    } catch (err) {
        throw new Error(`Unable to get application history`);
    }
};

const getCheckPointRaw = (id) => {
    try {
        return localStorage.getItem(`${APP_NAMESPACE}-${id}`);
    } catch (err) {
        throw new Error(`Unable to get application saved check point`);
    }
};

const populateHistory = (state) => {
    try {
        localStorage.setItem(`${APP_NAMESPACE}-history`, JSON.stringify(INITIAL_HISTORY_STATE));
        localStorage.setItem(`${APP_NAMESPACE}-${START_ID}`, JSON.stringify(state));
    } catch (err) {
        throw new Error(`Unable to initialize application history`);
    }
};

const createCheckPoint = (state, id) => {
    try {
        localStorage.setItem(`${APP_NAMESPACE}-${id}`, state);
    } catch (err) {
        throw new Error(`Unable to save application check point`);
    }
};

const deleteCheckPoint = (id) => {
    try {
        localStorage.removeItem(`${APP_NAMESPACE}-${id}`);
    } catch (err) {
        throw new Error(`Unable to delete application check point`);
    }
};

const updateHistoryMap = (history) => {
    try {
        localStorage.setItem(`${APP_NAMESPACE}-history`, JSON.stringify(history));
    } catch (err) {
        throw new Error(`Unable to update application history`);
    }
};

const updateState = (currentState, savedState) => {
    const stateProps = JSON.parse(savedState);

    Object.keys(stateProps).forEach((item) => {
        currentState[item] = stateProps[item];
    });

    return currentState;
};

const retrieveHistory = (state, stepIncrement, elseCallback) => {
    const historyRaw = getHistoryRaw();

    if (historyRaw) {
        const history = JSON.parse(historyRaw);
        const currentId = history.idMap[history.step + stepIncrement];
        const savedState = getCheckPointRaw(currentId);

        if (savedState) {
            updateState(state, savedState);
            if (stepIncrement) {
                history.step += stepIncrement;
                updateHistoryMap(history);
            }
        }
    } else if (elseCallback) {
        elseCallback(state);
    }
    return state;
};

export const isHistoryInitialized = () => (!!getHistoryRaw() || false);

export const initHistory = (state) => {
    return retrieveHistory(state, 0, populateHistory);
};

export const saveHistory = (state) => {
    const history = JSON.parse(getHistoryRaw());
    const currentId = history.idMap[history.step];
    const newState = JSON.stringify(state);
    const savedState = getCheckPointRaw(currentId);

    if (savedState !== newState) {
        const newId = Date.now();

        createCheckPoint(newState, newId);
        history.idMap.splice(0, history.step, newId);
        history.step = 0;

        if (history.idMap.length > HISTORY_LIMIT) {
            deleteCheckPoint(history.idMap.pop());
        }

        updateHistoryMap(history);
    }
};

export const historyBack = (state) => {
    return retrieveHistory(state, 1);
};

export const historyForward = (state) => {
    return retrieveHistory(state, -1);
};
