import { API } from "../../API";

const hotel = {
    state: {
        hotels:{
            User_ID: "",
            Check_In: "19 ตุลาคม 2563",
            Check_Out: "21 ตุลาคม 2563",
            Partner_Province: "",
            Room_ID: "",
            Note: "",
            Partner_ID: "",
            Partner_Phone: ""
        },
        partner: [],
        usersHotel: [],
        partnerNameItems: []
    },
    getters: {
        getHotel(state){
            return state.hotels
        },
        getUsersHotel(state){
            return state.usersHotel
        },
        getPartnerName(state){
            return state.partnerNameItems
        },
        getPartner(state){
            return state.partner
        }
   },
    mutations: {
        SET_HOTEL(state, data){
            state.hotels = data
        },
        SET_USERS_HOTEL(state, data){
            state.usersHotel = data
        },
        SET_USER_HID(state, data){
            state.hotels.User_ID = data
        },
        SET_PARTNER_NAME(state, data){
            state.partnerNameItems = data
        },
        SET_PARTNER_ID(state, data){
            state.hotels.Partner_ID = data
        },
        SET_PARTNER_PHONE(state, data){
            state.partner = data
        },
    },
    actions: {
        async setHotel({commit}){
            try {
                commit('SET_USER_HID', this.getters.getUserID) //เก็บค่า user_ID ไว้ในตัวแปร 
                commit('SET_PARTNER_ID', this.getters.getRoom.User_2_ID)
                let r = await API.post(`/hotel`,this.getters.getHotel) //ส่งค่าใน state hotels ทั้งหมดไปให้ backend
                this.getters.getHotel.Partner_Province = ""
                this.getters.getRoom.User_2_ID = ""
                this.getters.getRoom.Note = ""
                console.log('hotel', r.data)
            } catch (error) {
                console.log(error)
            }
        },
        async setUsersHotel({ commit }){
            try {
                let r = await API.get(`/users-hotel`) //data table
                commit('SET_USERS_HOTEL', r.data)
                console.log('SET_USERS_HOTEL', r.data)
            } catch (error) {
                console.log(error)
            }
            
        },
        async setPartnerName({ commit }){
            try {
                let r = await API.post(`/partner`,this.getters.getHotel) //post หา $request ของ id จังหวัด แล้วไปเช็ค id ของจังหวัดนั้นๆ                      //ว่าตรงกับ ptovince_id ของ ของ user คนไหนบ้าง และให้แสดงชื่อของuser ที่มี status = 1
                commit('SET_PARTNER_NAME', r.data) //เก็บค่า data ที่ได้จากการ post มาไว้ในตัวแปร             
                console.log('SET_PARTNER_NAME', r.data)        
            } catch (error) {
                console.log(error)
            }
        },
        async partnerUpdateID() {
            try {
                if (this.getters.getRoom.User_2_ID != '' && this.getters.getRoom.User_2_ID != undefined) {
                    let r = await API.put(`/hotel/`+this.getters.getRoom.User_2_ID,{Partner_ID:this.getters.getUserID})
                    return r
                }

            } catch (error) {
                console.log(error)
            }
        },
        async partnerPhone({ commit }){
            if (this.getters.getUserTrack.Partner_ID != null) {
                try {
                    let r = await API.get(`/users/`+this.getters.getUserTrack.Partner_ID)
                    commit('SET_PARTNER_PHONE', r.data)
                    console.log('SET_PARTNER_PHONE', this.getters.getPartner)
                } catch (error) {
                  console.log(error)
                }
            }
        },
        partnerHotel(){
            API.put(`/hotel/`+this.getters.getRoomID.User_1_ID,{Room_ID:this.getters.getRoomID.Room_ID,Partner_ID:this.getters.getRoomID.User_2_ID})
            .then((res => (
                console.log('updatePartnerRoom1',res.data)
            )))
            API.put(`/hotel/`+this.getters.getRoomID.User_2_ID,{Room_ID:this.getters.getRoomID.Room_ID,Partner_ID:this.getters.getRoomID.User_1_ID})
            .then((res => (
                console.log('updatePartnerRoom2',res.data)
            )))            
        },
    }
}
export default hotel;