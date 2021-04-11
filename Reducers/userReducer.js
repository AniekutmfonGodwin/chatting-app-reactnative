import constatnt from "../assets/constatnt"

const initialState = {
    phoneNumber:'',
    name:'',
    token:'',
    friends:[]
}

export default (state = initialState, { type, payload }) => {
    switch (type) {

    case constatnt.UPDATE_USER:
        return { ...state, ...payload }
    case constatnt.RESET_USER:
        return {
            phoneNumber:'',
            name:'',
            token:'',
            friends:[]
        }

    default:
        return state
    }
}
