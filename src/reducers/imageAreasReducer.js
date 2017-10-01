import _ from 'lodash';
import { ADD_PROCESSING_BLOCK, REMOVE_PROCESSING_BLOCK } from '../actions/types';

export default function (state = {}, action) {
    switch (action.type) {
        case ADD_PROCESSING_BLOCK:
            return { ...state, [_.size(state)]: { ...action.payload, id: _.size(state) } };
        case REMOVE_PROCESSING_BLOCK:
            const test = _.filter(state, con => con.id !== action.payload.id);
            console.log(test);
            return test;
        default:
            return state;
    }
}
