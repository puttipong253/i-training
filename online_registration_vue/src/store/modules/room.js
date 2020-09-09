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
        setRoom(){
            if (this.getters.getUsersStatus == 0) {
                API.post(`/room`,{User_1_ID:this.getters.getUserID,User_2_ID:this.getters.getRoom.User_2_ID, Room_Number:this.getters.getRoom.Room_Number})
                .then(res => (
                    console.log('room', res.data)
                ))
                .catch(error => (
                    console.log(error)
                ))
            }
        },
        setUserRoom({ commit }){
            API.get(`/users-room`) // data table room
                .then(res => (
                    console.log('SET_USER_ROOM',res.data),
                    commit('SET_USER_ROOM', res.data)
                ))
        },
        updateRoom(){
            API.put(`/room/`+this.state.roomItems.Room_ID,{Room_Number:this.getters.getRoom.Room_Number}).then(res => (
                console.log(res.data)
            ))
        }
    }
}
export default rooms;