import { API } from "../../API";

const trainings = {
    state: {
        training:{
            User_ID: "",
            ALOHA: 1,
            I_Factory: 1,
            E_Payment: 1,
            I_SingleForm: 1
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
        SET_TRAINING(state, data){
            state.training = data
        },
    },
    actions: {
        async setTraining({commit}){
            commit('SET_USER_HID', this.getters.getUserID)
            let r = await API.post(`/training`,this.getters.getTraining)
            console.log('training', r.data)
        },
        async setUsersTraining({ commit }){
            let r = await API.get(`/users-training`)
            commit('SET_USERS_TRAINING', r.data)
            console.log('SET_USERS_TRAINING', r.data)
        }
    }
}
export default trainings;