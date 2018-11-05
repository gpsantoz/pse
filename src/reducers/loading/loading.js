import {
    ADD_LOADING,
    REMOVE_LOADING,
    SET_HAS_LOADING
} from '../../constants/actionTypes'

const initialState = {
    loaders: 0,
    hasLoading: true
}

const loading = (state = initialState, action) => {
    switch (action.type) {
        case ADD_LOADING:
            return addLoading(state)

        case REMOVE_LOADING:
            return removeLoading(state)

        case SET_HAS_LOADING:
            return setHasLoading(state, action.hasLoading)

        default:
            return state
    }
}

const addLoading = (state) => {
    console.log("add loading")
    return {
        ...state,
        loaders: state.loaders + 1
    }
}

const removeLoading = (state) => {
    console.log("remove loading")
    return {
        ...state,
        loaders: (state.loaders > 0) ? state.loaders - 1 : 0
    }
}

const setHasLoading = (state, hasLoading) => ({
    ...state,
    hasLoading
})

export default loading