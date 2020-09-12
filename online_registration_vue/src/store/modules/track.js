import { API } from "../../API"
// import  router  from '../../router'

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
              commit('SET_USER_TRACK', r.data)
              console.log('SET_USER_TRACK', this.getters.getUserTrack)
              console.log('SET_USERS', this.getters.getUsers)
            //   router.push('/page')
            } catch (error) {
              console.log(error)
            }
          },
    },
}
export default tracking;