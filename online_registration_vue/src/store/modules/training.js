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
        setTraining({commit}){
            commit('SET_USER_HID', this.getters.getUserID)
            API.post(`/training`,this.getters.getTraining)
                .then(res => (
                    console.log('training', res.data),
                    this.getters.getTraining.TISI = false,
                    this.getters.getTraining.I_Factory = false,
                    this.getters.getTraining.E_Payment = false
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