import { API } from "../../API";

const hotel = {
    state: {
        hotels:{
            Check_In: "",
            Check_Out: "",
            Partner_ID: "",
            Partner_Province_ID: "",
            Room_Number: "000",
            Note: ""
        },
        usersHotel: [],
        partnerProvinceItems: [],
        partnerNameItems: []
    },
    getters: {
        getHotel(state){
            return state.hotels
        },
        getUsersHotel(state){
            return state.usersHotel
        },
        getPartnerProvinces(state){
            return state.partnerProvinceItems 
        },
        getPartnerName(state){
            return state.partnerNameItems
        }
    },
    mutations: {
        SET_USERS_HOTEL(state, data){
            state.usersHotel = data
        },
        SET_PARTNER_PROVINCES(state, data){
            state.partnerProvinceItems = data
        },
        SET_PARTNER_NAME(state, data){
            state.partnerNameItems = data
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
        },
        setPartnerProvinces({ commit }){
            API.get(`/province`)
                .then(res => (
                    commit('SET_PARTNER_PROVINCES', res.data)
                ))
                .catch(error => (
                console.log(error)
              ))
          },
        setPartnerName({ commit }){
            API.post(`/partner`,this.getters.getHotel)
                .then(res => (
                    console.log('SET_PARTNER_NAME', res.data),
                    commit('SET_PARTNER_NAME', res.data)
                ))
        }
    }
}
export default hotel;