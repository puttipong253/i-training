import { API } from "../../API";

const rooms = {
    state: {
        room:{
            Room_ID: '',
            User_1_ID: '',
            User_2_ID: '',
            Room_Number: '',
            Province_1: '',
            Province_2: ''
        },
        tmp:{
            User_1_ID: '',
            User_2_ID: '',
        },
        userRoom: [],
        roomItems: [],
        roomID:0 ,
        roomData: [],
        updateUserRoom1: [],
        updateUserRoom2: [],
        countUserRoom: ""
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
        getUser2ID(state){
            return state.room.User_2_ID
        },
        getUserRoom(state){
            return state.userRoom
        },
        getRoomItems(state){
            return state.roomItems
        },
        getUpdateUserRoom1(state){
            return state.updateUserRoom1
        },
        getUpdateUserRoom2(state){
            return state.updateUserRoom2
        },
        getCountUserRoom(state){
            return state.countUserRoom
        }
    },
    mutations: {
        SET_USER_ROOM(state, data){
            state.userRoom = data
        },
        SET_USER2_ID(state, data){
            state.UserID2 = data
        },
        SET_ROOM_ID(state, data){
            state.roomID = data
        },
        SET_ROOM_DATA(state, data){
            state.roomData = data
        },
        SET_UPDATE_USER_ROOM1(state, data){
            state.updateUserRoom1 = data
        },
        SET_UPDATE_USER_ROOM2(state, data){
            state.updateUserRoom2 = data
        },
        SET_COUNT_USERROOM(state, data){
            state.countUserRoom = data
        }
    },
    actions: {
        async setRoom({ commit }){
            if (this.getters.getUsersStatus == 0) {
                try {
                    let r = await API.post(`/room`,{User_1_ID:this.getters.getUserID,User_2_ID:this.getters.getRoom.User_2_ID})
                    commit('SET_ROOM_ID', r.data.Room_ID)
                } catch (error) {
                    console.log(error)
                }
            }
        },
        async setRoomMatch({ commit }){
            if (this.getters.getRoom.User_1_ID != '' && this.getters.getRoom.User_2_ID != ''){
                try {
                    let r = await API.post(`/room`,{User_1_ID:this.getters.getRoom.User_1_ID, User_2_ID:this.getters.getRoom.User_2_ID})
                    .then(res => (
                        commit('SET_ROOM_DATA', res.data),
                        console.log('roomMatch',res.data),
                        API.put(`/users/`+this.getters.getRoom.User_1_ID,{Status:false}).then(res => (
                            console.log('User_1_ID',res.data),
                            this.getters.getRoom.User_1_ID = ''
                        )),
                        API.put(`/users/`+this.getters.getRoom.User_2_ID,{Status:false}).then(res => (
                            console.log('User_2_ID',res.data),
                            this.getters.getRoom.User_2_ID = ''
                        ))
                    ))
                    return r
                } catch (error) {
                    console.log('er',error)
                }
            }
        },
        async setUserRoom({ commit }){
            try { 
                let r = await API.get(`/users-room`) // data table room
                commit('SET_USER_ROOM', r.data)
                console.log('SET_USER_ROOM', r.data)
            } catch (error) {
                console.log(error)
            }
        },
        async updateRoom(){
            try {
                let r = await API.put(`/room/`+this.getters.getRoom.Room_ID,{User_1_ID:this.getters.getRoom.User_1_ID,User_2_ID:this.getters.getRoom.User_2_ID,Room_Number:this.getters.getRoom.Room_Number})
                console.log('update',r.data)
                API.put(`/users/`+this.getters.getRoom.User_1_ID,{Status:false})
                API.put(`/users/`+this.getters.getRoom.User_2_ID,{Status:false}).then(() => (
                    this.getters.getRoom.Room_ID = '',
                    this.getters.getRoom.User_1_ID = '',
                    this.getters.getRoom.User_2_ID = '',
                    this.getters.getRoom.Room_Number = '',
                    this.getters.getRoom.Province_1 = '',
                    this.getters.getRoom.Province_2 = ''
                ))
            } catch (error) {
                console.log(error)
            }
        },
        async updateUserRoom1({ commit }){
            try {
                let r = await API.post(`/provinceUserRoom1`,this.getters.getRoom)                
                commit('SET_UPDATE_USER_ROOM1', r.data)
            } catch (error) {
                console.log(error)
            }
        },
        async updateUserRoom2({ commit }){
            try {
                let r = await API.post(`/provinceUserRoom2`,this.getters.getRoom)                
                commit('SET_UPDATE_USER_ROOM2' ,r.data)
            } catch (error) {
                console.log(error)
            }
        },
        resetData(){
            if (this.getters.getTmp.User_1_ID != null) {
                API.put(`/hotel/`+this.getters.getTmp.User_1_ID,{Room_ID:0,Partner_ID:''})
                API.put(`/users/`+this.getters.getTmp.User_1_ID,{Status:true})
            }
            if (this.getters.getTmp.User_2_ID != null) {
                API.put(`/hotel/`+this.getters.getTmp.User_2_ID,{Room_ID:0,Partner_ID:''})            
                API.put(`/users/`+this.getters.getTmp.User_2_ID,{Status:true})
            }
        },
        async countUserRoom({ commit }){
            try {
                let r = await API.get(`/countUserRoom`)
                commit('SET_COUNT_USERROOM', r.data)
            } catch (error) {
                console.log(error)
            }
          },
    }
}
export default rooms;