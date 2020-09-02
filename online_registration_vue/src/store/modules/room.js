import { API } from "../../API";

const rooms = {
    state: {
        room:{
            User_1_ID: "",
            User_2_ID: "",
            Room_Number: "000"
        },
    },
    getters: {
        getRoom(state){
            return state.room
        },
        getUser1_ID(state){
            return state.room.User_1_ID
        }
    },
    mutations: {
        SET_ROOM(state, data){
            state.room = data
        },
    },
    actions: {
        async setRoom(){
            if (this.getters.getUsersStatus == 0) {
                await API.post(`/room`,{User_1_ID:this.getters.getUserID})
                .then(res => (
                    console.log('room', res.data)
                ))
                .catch(error => (
                    console.log(error)
                ))
            }
            await setTimeout(() => {
                if (this.getters.getPartnerIdItems) {
                    API.put(`/room/`+this.getters.getUserID,{
                        User_2_ID: this.getters.getPartnerIdItems
                    }) //หลังจากเลือกคู่พักเสร็จแล้วจะทำการ update Partner_ID ให้ตรงกับ User_ID ของ partner ที่เลือกเรา
                    .catch(error => (
                        console.log(error)
                    ))
                }
            }, 1000);
        }
    }
}
export default rooms;