import { API } from "../../API"
import  router  from '../../router'

const tracking = {
    state: {
        items:{
            Phone: ""
        },        
        userTrack: []
    },
    getters: {
        getUserTrack(state){
            return state.userTrack
        },
        getPhone(state){
            return state.items
        }
    },
    mutations:{
        SET_USER_TRACK(state, data){
            state.userTrack = data
          },
    },
    actions: {
        async userTracking({ commit }){
            try {
              let r = await API.post(`/tracking`, this.getters.getPhone)
              if (r.data != '') {
                commit('SET_USER_TRACK', r.data[0])
                console.log('SET_USER_TRACK', this.getters.getUserTrack)
                router.push('/track')
                this.getters.getPhone.Phone = ''
              }else{
                alert('เบอร์โทรศัพท์ไมู่กต้อง')
                this.getters.getPhone.Phone = ''
              }
            } catch (error) {
              console.log(error)
            }
        },
    },
}
export default tracking;