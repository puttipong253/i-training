import { API } from "../../API";

const trains = {
    state: {
        training:{
            TISI: "",
            I_Factory: "",
            E_Payment: ""
        }
    },
    getters: {
        getTraining(state){
            return state.training
        },
    },
    mutations: {

    },
    actions: {
        setTraining(){
        API.post(`/train`,this.getters.getTraining)
            .then(res => (
                console.log('train', res.data)
            ))
        }
    }
}
export default trains;