import { API } from "../../API";

const rooms = {
    state: {
        room:{
            User_1_ID: "",
            User_2_ID: "",
            Room_Number: ""
        },
        userRoom: [],
        roomItems: []
    },
    getters: {
        getRoom(state){
            return state.room
        },
        getUser2ID(state){
            return state.room.User_2_ID
        },
        getUserRoom(state){
            return state.userRoom
        },
        getRoomItems(state){
            return state.roomItems
        }
    },
    mutations: {
        SET_USER_ROOM(state, data){
            state.userRoom = data
        },
        SET_USER2_ID(state, data){
            state.UserID2 = data
        },
    },
    actions: {
        async setRoom(){
            if (this.getters.getUsersStatus == 0) {
                try {
                    let r = await API.post(`/room`,{User_1_ID:this.getters.getUserID,User_2_ID:this.getters.getRoom.User_2_ID})
                    console.log('room', r.data)
                    return r.data
                } catch (error) {
                    console.log(error)
                }
            }
        },
        async setRoomMatch(){
            if (this.getters.getRoom.User_1_ID != '' && this.getters.getRoom.User_2_ID != ''){
                try {
                    let r = await API.post(`/room`,{User_1_ID:this.getters.getRoom.User_1_ID, User_2_ID:this.getters.getRoom.User_2_ID})
                    console.log(r.data)
                    return r.data
                } catch (error) {
                    console.log(error)
                }
            }
        },
        async setUserRoom({ commit }){
            try { 
                let r = await API.get(`/users-room`) // data table room
                console.log('SET_USER_ROOM',r.data),
                commit('SET_USER_ROOM', r.data)
                return r.data
            } catch (error) {
                console.log(error)
            }
        },
        async updateRoom(){
            try {
                let r = await API.put(`/room/`+this.state.roomItems.Room_ID,{Room_Number:this.getters.getRoom.Room_Number})
                console.log('updata',r.data)
                return r.data
            } catch (error) {
                console.log(error)
            }
        }
    }
}
export default rooms;