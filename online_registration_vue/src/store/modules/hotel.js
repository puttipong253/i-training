import { API } from "../../API";

const hotel = {
    state: {
        hotels:{
            User_ID: "",
            Check_In: "",
            Check_Out: "",
            Partner_ID: "",
            Partner_Province_ID: "",
            Room_Number: "000",
            Note: ""
        },
        partnerIdItems: "",
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
        getPartnerID(state){
            return state.hotels.Partner_ID
        },
        getPartnerIdItems(state){
            return state.partnerIdItems
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
            await commit('SET_USER_HID', this.getters.getUserID) //เก็บค่า user_ID ไว้ในตัวแปร 
            await API.post(`/hotel`,this.getters.getHotel) //ส่งค่าใน state hotels ทั้งหมดไปให้ backend
                .then(res => (
                    console.log('hotel', res.data),
                    commit('SET_PARTNER_ID', res.data.Partner_ID) //เก็บค่า Partner_ID ไว้ในตัวแปร 
                ))
                .catch(error => (
                    console.log(error),
                    commit('SET_ALERT',  true ),
                    commit('SET_ALERT_COLOR',  "error"),
                    commit('SET_ALERT_TEXT',  "กรุณากรอกข้อมูลให้ครบถ้วน")
                ))
            if (!this.getters.getPartnerIdItems) {
                console.log('getPartnerId is Null')
            }else{
                await API.put(`/hotel/`+this.getters.getPartnerIdItems,{
                    Partner_ID:this.getters.getUserID
                }) //หลังจากเลือกคู่พักเสร็จแล้วจะทำการ update Partner_ID ให้ตรงกับ User_ID ของ partner ที่เลือกเรา
                .then(res => (
                    console.log('update partnerID', res.data)
                ))
                .catch(error => (
                    console.log(error)
                ))
            }
        },
        setUsersHotel({ commit }){
            API.get(`/users-hotel`) //data table
                .then(res => (
                    console.log('SET_USERS_HOTEL', res.data),
                    commit('SET_USERS_HOTEL', res.data)
                ))
        },
        setPartnerProvinces({ commit }){
            API.get(`/province`) //ดึงข้อมูลจังหวัด
                .then(res => (
                    commit('SET_PARTNER_PROVINCES', res.data)
                ))
                .catch(error => (
                console.log(error)
              ))
          },
        setPartnerName({ commit }){
            API.post(`/partner`,this.getters.getHotel) //post หา $request ของ id จังหวัด แล้วไปเช็ค id ของจังหวัดนั้นๆ
                .then(res => (                         //ว่าตรงกับ ptovince_id ของ ของ user คนไหนบ้าง และให้แสดงชื่อของuser ที่มี status = 1
                    console.log('SET_PARTNER_NAME', res.data),
                    commit('SET_PARTNER_NAME', res.data) //เก็บค่า data ที่ได้จากการ post มาไว้ในตัวแปร
                ))
        },
    }
}
export default hotel;