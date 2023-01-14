export const SET_TACHES = 'SET_TACHES';
export const SET_TACHE_ID = 'SET_TACHE_ID';

export const setTaches = taches => dispatch => {
    dispatch({
        type: SET_TACHES,
        payload: taches,
    });
};

export const setTacheID = tacheID => dispatch => {
    dispatch({
        type: SET_TACHE_ID,
        payload: tacheID,
    });
};
