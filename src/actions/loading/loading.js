import {
    ADD_LOADING,
    REMOVE_LOADING
} from '../../constants/actionTypes'

export const addLoading = () => ({
    type: ADD_LOADING
})

export const removeLoading = () => ({
    type: REMOVE_LOADING
})