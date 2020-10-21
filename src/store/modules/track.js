import { API } from "../../API"
import  router  from '../../router'

const tracking = {
    state: {
        items:{
            Phone: ""
        },        
        customerTrack: []
    },
    getters: {
        getCustomerTrack(state){
            return state.customerTrack
        },
        getPhone(state){
            return state.items
        }
    },
    mutations:{
        SET_CUSTOMER_TRACK(state, data){
            state.customerTrack = data
          },
    },
    actions: {
        async customerTracking({ commit }){
            try {
              let r = await API.post(`/tracking`, this.getters.getPhone)
              if (r.data != '') {
                commit('SET_CUSTOMER_TRACK', r.data[0])
                console.log('SET_CUSTOMER_TRACK', this.getters.getCustomerTrack)
                router.push('/track')
                this.getters.getPhone.Phone = ''
              }else{
                alert('เบอร์โทรศัพท์ไม่ถูกต้อง')
                this.getters.getPhone.Phone = ''
              }
            } catch (error) {
              console.log(error)
            }
        },
    },
}
export default tracking;