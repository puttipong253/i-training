import { API } from "../../API";

const hotel = {
    state: {
        hotels:{
            Check_In: "",
            Check_Out: "",
            Partner_Name: "",
            Partner_Province: "",
            Room_Number: "000",
            Note: ""
        },
        usersHotel: [],
    },
    getters: {
        getHotel(state){
            return state.hotels
        },
        getUsersHotel(state){
            return state.usersHotel
        },
    },
    mutations: {
        SET_USERS_HOTEL(state, data){
            state.usersHotel = data
        },
    },
    actions: {
        setHotel(){
        API.post(`/hotel`,this.getters.getHotel)
            .then(res => (
                console.log('hotel', res.data)
            ))
            .catch(error => (
                console.log(error)
            ))
        },
        setUsersHotel({ commit }){
        API.get(`/users-hotel`)
            .then(res => (
                commit('SET_USERS_HOTEL', res.data)
            ))
        }
    }
}
export default hotel;