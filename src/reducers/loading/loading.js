import {
    ADD_LOADING,
    REMOVE_LOADING,
} from '../../constants/actionTypes'

const initialState = {
    loaders: 0
}

const loading = (state = initialState, action) => {
    switch (action.type) {
        case ADD_LOADING:
            return addLoading(state)
        case REMOVE_LOADING:
            return removeLoading(state)
        default:
            return state
    }
}

const addLoading = (state) => {
    console.log("add loading reducer")
    return {
        ...state,
        loaders: state.loaders + 1
    }
}

const removeLoading = (state) => {
    console.log("remove loading reducer")
    return {
        ...state,
        loaders: (state.loaders > 0) ? state.loaders - 1 : 0
    }
}

export default loading