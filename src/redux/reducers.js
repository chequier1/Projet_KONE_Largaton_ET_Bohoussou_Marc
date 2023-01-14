import { SET_TACHES, SET_TACHE_ID } from './actions';

const initialState = {
    taches: [],
    tacheID: 1,
}

function tacheReducer(state = initialState, action) {
    switch (action.type) {
        case SET_TACHES:
            return { ...state, taches: action.payload };
        case SET_TACHE_ID:
            return { ...state, tacheID: action.payload };
        default:
            return state;
    }
}

export default tacheReducer;