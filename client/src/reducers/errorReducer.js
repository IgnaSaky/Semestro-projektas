import { GET_ERRORS,CLEAR_ERRORS} from '../actions/types'

const initialState = {
    message: {},
    status: null,
    id: null
}

export default function(state = initialState, action) {
    switch (action.type) {
        case GET_ERRORS:
            return {
                message: action.payload,
                status: action.payload,
                id: action.payload
            };           
        case CLEAR_ERRORS:
            return {
                msg: {},
                status: null,
                id:null
            };
        default:
            return state;
    }
}