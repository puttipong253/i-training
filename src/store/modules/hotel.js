import { API } from "../../API";

const hotel = {
    state: {
        hotels:{
            Customer_ID: "",
            Check_In: "19 ตุลาคม 2563",
            Check_Out: "21 ตุลาคม 2563",
            Partner_Province: "",
            Room_ID: 0,
            Note: "",
            Partner_ID: "",
            Partner_Phone: ""
        },
        check:{
            Check_In_2: "",
            Check_Out_2: "",
        },
        hotelByID: [],
        partner: [],
        customerHotel: [],
        partnerNameItems: [],
        partnerID: []
    },
    getters: {
        getCheck(state){
            return state.check
        },
        getHotel(state){
            return state.hotels
        },
        getCustomerHotel(state){
            return state.customerHotel
        },
        getPartnerName(state){
            return state.partnerNameItems
        },
        getPartner(state){
            return state.partner
        },
        getPartnerID(state){
            return state.partnerID
        }
   },
    mutations: {
        SET_HOTEL(state, data){
            state.hotels = data
        },
        SET_CUSTOMER_HOTEL(state, data){
            state.customerHotel = data
        },
        SET_CUSTOMER_HID(state, data){
            state.hotels.Customer_ID = data
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
        SET_PARTNERID(state, data){
            state.partnerID = data
        }
    },
    actions: {
        async setHotel({commit}){
            try {
                commit('SET_CUSTOMER_HID', this.getters.getCustomerID) //เก็บค่า Customer_ID ไว้ในตัวแปร 
                commit('SET_PARTNER_ID', this.getters.getRoom.Customer_2_ID)
                let r = await API.post(`/hotel`,this.getters.getHotel) //ส่งค่าใน state hotels ทั้งหมดไปให้ backend
                this.getters.getHotel.Partner_Province = ""
                this.getters.getRoom.Customer_2_ID = ""
                this.getters.getRoom.Note = ""
                console.log('hotel', r.data)
            } catch (error) {
                console.log(error)
            }
        },
        async setCustomerHotel({ commit }){
            try {
                let r = await API.get(`/customers-hotel`) //data table
                commit('SET_CUSTOMER_HOTEL', r.data)
                console.log('SET_CUSTOMER_HOTEL', r.data)
            } catch (error) {
                console.log(error)
            }
        },
        async setPartnerName({ commit }){
            try {
                let r = await API.post(`/partner`,this.getters.getHotel) //post หา $request ของ id จังหวัด แล้วไปเช็ค id ของจังหวัดนั้นๆ                      //ว่าตรงกับ ptovince_id ของ ของ Customer คนไหนบ้าง และให้แสดงชื่อของCustomer ที่มี status = 1
                commit('SET_PARTNER_NAME', r.data) //เก็บค่า data ที่ได้จากการ post มาไว้ในตัวแปร             
                console.log('SET_PARTNER_NAME', r.data)        
            } catch (error) {
                console.log(error)
            }
        },
        partnerUpdateID() {
            if (this.getters.getRoom.Customer_2_ID != '' && this.getters.getRoom.Customer_2_ID != undefined) {          
                    API.put(`/hotel/`+this.getters.getRoom.Customer_2_ID,{Room_ID:this.getters.getRoomID,Partner_ID:this.getters.getCustomerID})
                    .then(res => (
                        console.log('updateID1',res.data),

                        API.put(`/hotel/`+this.getters.getCustomerID,{Room_ID:this.getters.getRoomID})
                        .then(res => (
                            console.log('updateID2',res.data)
                        ))
                    ))         
            }
        },
        async partnerPhone({ commit }){
            if (this.getters.getCustomerTrack.Partner_ID != null) {
                try {
                    let r = await API.get(`/customers/`+this.getters.getCustomerTrack.Partner_ID)
                    commit('SET_PARTNER_PHONE', r.data)
                    console.log('SET_PARTNER_PHONE', this.getters.getPartner)
                } catch (error) {
                  console.log(error)
                }
            }
        },
        partnerHotel(){
            API.put(`/hotel/`+this.getters.getRoomData.Customer_1_ID,{Room_ID:this.getters.getRoomData.Room_ID,Partner_ID:this.getters.getRoomData.Customer_2_ID})
            .then((res => (
                console.log('updatePartnerRoom1',res.data)
            )))
            API.put(`/hotel/`+this.getters.getRoomData.Customer_2_ID,{Room_ID:this.getters.getRoomData.Room_ID,Partner_ID:this.getters.getRoomData.Customer_1_ID})
            .then((res => (
                console.log('updatePartnerRoom2',res.data)
            )))            
        },
        partnerRoomHotel(){
            API.put(`/hotel/`+this.getters.getRoom.Customer_1_ID,{Room_ID:this.getters.getRoom.Room_ID,Partner_ID:this.getters.getRoom.Customer_2_ID})

            API.put(`/hotel/`+this.getters.getRoom.Customer_2_ID,{Room_ID:this.getters.getRoom.Room_ID,Partner_ID:this.getters.getRoom.Customer_1_ID})
        },
        async deleteHotel(){
            try {
              let r = await API.delete(`/hotel/`+this.state.CustomerById)
              return r.data
            } catch (error) {
              console.log(error)
            }
        },
        async getpartnerID({ commit }){
            try {
                let r = await API.get(`/hotel/`+this.state.CustomerById)
                commit('SET_PARTNERID', r.data.Partner_ID)
            } catch (error) {
                console.log(error)
            }
        },
        async resetPartnerID(){
            try {
                let r = await API.put(`/hotel/`+this.getters.getPartnerID,{Partner_ID:null})
                return r.data
            } catch (error) {
                console.log(error)
            }
        },
        async updateHotel(){
            try {
                let r = await API.put(`/hotel/`+this.state.hotelByID,{Check_In:this.getters.getCheck.Check_In_2, Check_Out:this.getters.getCheck.Check_Out_2, Note:this.getters.getHotel.Note})
                console.log(r.data)
                return r.data
            } catch (error) {
                console.log(error)
            }
        },
    }
}
export default hotel;