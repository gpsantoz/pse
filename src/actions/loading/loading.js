import {
    ADD_LOADING,
    REMOVE_LOADING,
    SET_HAS_LOADING
} from '../../constants/actionTypes'

export const addLoading = () => ({
    type: ADD_LOADING
})

export const removeLoading = () => ({
    type: REMOVE_LOADING
})

export const setHasLoading = (hasLoading) => ({
    type: SET_HAS_LOADING,
    hasLoading
})