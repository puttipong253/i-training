import { API } from "../../API";

const hotel = {
    state: {
        hotels:{
            User_ID: "",
            Check_In: "",
            Check_Out: "",
            Partner_Province_ID: "",
            Room_ID: "",
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
        },
   },
    mutations: {
        SET_USERS_HOTEL(state, data){
            state.usersHotel = data
        },
        SET_USER_HID(state, data){
            state.hotels.User_ID = data
        },
        SET_PARTNER_PROVINCES(state, data){
            state.partnerProvinceItems = data
        },
        SET_PARTNER_NAME(state, data){
            state.partnerNameItems = data
        },
        SET_PARTNER_ID(state, data){
            state.partnerIdItems = data
        },
    },
    actions: {
        async setHotel({commit}){
            try {
                commit('SET_USER_HID', this.getters.getUserID) //เก็บค่า user_ID ไว้ในตัวแปร 
                let r = await API.post(`/hotel`,this.getters.getHotel) //ส่งค่าใน state hotels ทั้งหมดไปให้ backend
                console.log('hotel', r.data)
                return r.data
            } catch (error) {
                console.log(error)
            }
        },
        async setUsersHotel({ commit }){
            try {
                let r = await API.get(`/users-hotel`) //data table
                console.log('SET_USERS_HOTEL', r.data),
                commit('SET_USERS_HOTEL', r.data)
                return r.data
            } catch (error) {
                console.log(error)
            }
            
        },
        async setPartnerProvinces({ commit }){
            try {
                let r = await API.get(`/province`) //ดึงข้อมูลจังหวัด
                commit('SET_PARTNER_PROVINCES', r.data)
                return r.data
            } catch (error) {
                console.log(error)
            }
          },
        async setPartnerName({ commit }){
            try {
                let r = await API.post(`/partner`,this.getters.getHotel) //post หา $request ของ id จังหวัด แล้วไปเช็ค id ของจังหวัดนั้นๆ                      //ว่าตรงกับ ptovince_id ของ ของ user คนไหนบ้าง และให้แสดงชื่อของuser ที่มี status = 1
                console.log('SET_PARTNER_NAME', r.data),
                commit('SET_PARTNER_NAME', r.data) //เก็บค่า data ที่ได้จากการ post มาไว้ในตัวแปร
                return r.data
            } catch (error) {
                console.log(error)
            }
            
        },
    }
}
export default hotel;