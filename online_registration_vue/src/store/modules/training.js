import { API } from "../../API";

const trainings = {
    state: {
        training:{
            User_ID: "",
            TISI: false,
            I_Factory: false,
            E_Payment: false
        },
        usersTraining:[],
    },
    getters: {
        getTraining(state){
            return state.training
        },
        getUsersTraining(state){
            return state.usersTraining
        },
    },
    mutations: {
        SET_USERS_TRAINING(state, data){
            state.usersTraining = data
        },
        SET_USER_HID(state, data){
            state.training.User_ID = data
        },
    },
    actions: {
        async setTraining({commit}){
            await commit('SET_USER_HID', this.getters.getUserID)
            await API.post(`/training`,this.getters.getTraining)
                .then(res => (
                    console.log('training', res.data)
                ))
        },
        setUsersTraining({ commit }){
            API.get(`/users-training`)
                .then(res => (
                    commit('SET_USERS_TRAINING', res.data)
                ))
            }
    }
}
export default trainings;