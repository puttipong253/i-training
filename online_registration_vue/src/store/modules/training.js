import { API } from "../../API";

const trainings = {
    state: {
        training:{
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
    },
    actions: {
        setTraining(){
            API.post(`/training`,this.getters.getTraining)
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