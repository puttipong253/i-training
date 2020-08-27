import { API } from "../../API";

const hotel = {
    state: {
        hotels:{
            Check_In: "",
            Check_Out: "",
            Partner_Name: "",
            Partner_Province: "",
            Room_Number: "",
            Note: ""
        }
    },
    getters: {
        getHotel(state){
            return state.hotels
        },
    },
    mutations: {

    },
    actions: {
        setHotel(){
        API.post(`/hotel`,this.getters.getHotel)
            .then(res => (
                console.log('hotel', res.data)
            ))
        }
    }
}
export default hotel;