import { API } from "../../API";

const rooms = {
    state: {
        room:{
            Room_ID: '',
            Customer_1_ID: '',
            Customer_2_ID: '',
            Room_Number: '',
            Province_1: '',
            Province_2: ''
        },
        tmp:{
            Customer_1_ID: '',
            Customer_2_ID: '',
        },
        customerRoom: [],
        roomItems: [],
        roomID:0 ,
        roomData: [],
        updateCustomerRoom1: [],
        updateCustomerRoom2: [],
        countCustomerRoom: ""
    },
    getters: {
        getRoom(state){
            return state.room
        },
        getTmp(state){
            return state.tmp
        },
        getRoomID(state){
            return state.roomID
        },
        getRoomData(state){
            return state.roomData
        },
        getCustomer2ID(state){
            return state.room.Customer_2_ID
        },
        getCustomerRoom(state){
            return state.customerRoom
        },
        getRoomItems(state){
            return state.roomItems
        },
        getUpdateCustomerRoom1(state){
            return state.updateCustomerRoom1
        },
        getUpdateCustomerRoom2(state){
            return state.updateCustomerRoom2
        },
        getCountCustomerRoom(state){
            return state.countCustomerRoom
        }
    },
    mutations: {
        SET_CUSTOMER_ROOM(state, data){
            state.customerRoom = data
        },
        SET_CUSTOMER2_ID(state, data){
            state.CustomerID2 = data
        },
        SET_ROOM_ID(state, data){
            state.roomID = data
        },
        SET_ROOM_DATA(state, data){
            state.roomData = data
        },
        SET_UPDATE_CUSTOMER_ROOM1(state, data){
            state.updateCustomerRoom1 = data
        },
        SET_UPDATE_CUSTOMER_ROOM2(state, data){
            state.updateCustomerRoom2 = data
        },
        SET_COUNT_CUSTOMERROOM(state, data){
            state.countCustomerRoom = data
        }
    },
    actions: {
        async setRoom({ commit }){
            if (this.getters.getCustomerStatus == 0) {
                try {
                    let r = await API.post(`/room`,{Customer_1_ID:this.getters.getCustomerID,Customer_2_ID:this.getters.getRoom.Customer_2_ID})
                    commit('SET_ROOM_ID', r.data.Room_ID)
                } catch (error) {
                    console.log(error)
                }
            }
        },
        async setRoomMatch({ commit }){
            if (this.getters.getRoom.Customer_1_ID != '' && this.getters.getRoom.Customer_2_ID != ''){
                try {
                    let r = await API.post(`/room`,{Customer_1_ID:this.getters.getRoom.Customer_1_ID, Customer_2_ID:this.getters.getRoom.Customer_2_ID})
                    .then(res => (
                        commit('SET_ROOM_DATA', res.data),
                        console.log('roomMatch',res.data),
                        API.put(`/customers/`+this.getters.getRoom.Customer_1_ID,{Status:false}).then(res => (
                            console.log('Customer_1_ID',res.data),
                            this.getters.getRoom.Customer_1_ID = ''
                        )),
                        API.put(`/customers/`+this.getters.getRoom.Customer_2_ID,{Status:false}).then(res => (
                            console.log('Customer_2_ID',res.data),
                            this.getters.getRoom.Customer_2_ID = ''
                        ))
                    ))
                    return r
                } catch (error) {
                    console.log('er',error)
                }
            }
        },
        async setCustomerRoom({ commit }){
            try { 
                let r = await API.get(`/customers-room`) // data table room
                commit('SET_CUSTOMER_ROOM', r.data)
                console.log('SET_CUSTOMER_ROOM', r.data)
            } catch (error) {
                console.log(error)
            }
        },
        async updateRoom(){
            try {
                let r = await API.put(`/room/`+this.getters.getRoom.Room_ID,{Customer_1_ID:this.getters.getRoom.Customer_1_ID,Customer_2_ID:this.getters.getRoom.Customer_2_ID,Room_Number:this.getters.getRoom.Room_Number})
                console.log('update',r.data)
                API.put(`/customers/`+this.getters.getRoom.Customer_1_ID,{Status:false})
                API.put(`/customers/`+this.getters.getRoom.Customer_2_ID,{Status:false}).then(() => (
                    this.getters.getRoom.Room_ID = '',
                    this.getters.getRoom.Customer_1_ID = '',
                    this.getters.getRoom.Customer_2_ID = '',
                    this.getters.getRoom.Room_Number = '',
                    this.getters.getRoom.Province_1 = '',
                    this.getters.getRoom.Province_2 = ''
                ))
            } catch (error) {
                console.log(error)
            }
        },
        async updateCustomerRoom1({ commit }){
            try {
                let r = await API.post(`/provinceCustomerRoom1`,this.getters.getRoom)                
                commit('SET_UPDATE_CUSTOMER_ROOM1', r.data)
            } catch (error) {
                console.log(error)
            }
        },
        async updateCustomerRoom2({ commit }){
            try {
                let r = await API.post(`/provinceCustomerRoom2`,this.getters.getRoom)                
                commit('SET_UPDATE_CUSTOMER_ROOM2' ,r.data)
            } catch (error) {
                console.log(error)
            }
        },
        resetData(){
            if (this.getters.getTmp.Customer_1_ID != null) {
                API.put(`/hotel/`+this.getters.getTmp.Customer_1_ID,{Room_ID:0,Partner_ID:''})
                API.put(`/customers/`+this.getters.getTmp.Customer_1_ID,{Status:true})
            }
            if (this.getters.getTmp.Customer_2_ID != null) {
                API.put(`/hotel/`+this.getters.getTmp.Customer_2_ID,{Room_ID:0,Partner_ID:''})            
                API.put(`/customers/`+this.getters.getTmp.Customer_2_ID,{Status:true})
            }
        },
        async countCustomerRoom({ commit }){
            try {
                let r = await API.get(`/countCustomerRoom`)
                commit('SET_COUNT_CUSTOMERROOM', r.data)
            } catch (error) {
                console.log(error)
            }
          },
    }
}
export default rooms;