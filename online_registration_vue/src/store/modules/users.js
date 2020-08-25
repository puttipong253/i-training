import { API } from "../../API";
import router from '../../router'

const users = {
    state: {
        users: {
          Prefix: "",
          F_Name: "",
          L_Name: "",
          Gender: "",
          Rank: "",
          Email: "",
          Phone: "",
          Province: "",
          Food_Group: "",
          Food_Allergy: ""
        },
        showUsers: [],
        Provinceitems: [],
        snackbar: false,
        alertColor: "",
        alertText: ""
    },
    getters: {
      getProvinces(state){
        return state.Provinceitems 
      },
      getUsers(state){
        return state.users 
      },
      getAlert(state){
        return state.snackbar
      },
      getAlertColor(state){
        return state.alertColor
      },
      getAlertText(state){
        return state.alertText
      },
      getShowUsers(state){
        return state.showUsers 
      },
    },
    mutations: {
      SET_PROVINCES(state, data){
        state.Provinceitems = data
      },
      SET_USERS(state, data){
        state.users = data
      },
      SET_SHOWUSERS(state, data){
        state.showUsers = data
      },
      SET_ALERT(state, data){
        state.snackbar = data
      },
      SET_ALERT_COLOR(state, data){
        state.alertColor = data
      },
      SET_ALERT_TEXT(state, data){
        state.alertText = data
      },
    },
    actions: {
        async submit({ commit }){
             await API.post(`/users`, this.getters.getUsers)
              .then(res => (
                console.log(res.data),
                commit('SET_USERS', res.data),
                commit('SET_ALERT', this.getAlert = true),
                commit('SET_ALERT_COLOR', this.getAlertColor = "success"),
                commit('SET_ALERT_TEXT', this.getAlertText = "บันทึกข้อมูลเรียบร้อย"),
                setTimeout(() => (
                  router.push('/')
                ), 1500))
              )
              .catch(error => (
                console.log("error", error),
                commit('SET_ALERT', this.getAlert = true),
                commit('SET_ALERT_COLOR', this.getAlertColor = "error"),
                commit('SET_ALERT_TEXT', this.getAlertText = "กรุณากรอกข้อมูลให้ถูกต้อง")
              ))
        },
        showUsers({ commit }){
          API.get(`/users`)
            .then(res => (
              commit('SET_SHOWUSERS', res.data)
            ))
            .catch(error => (
              console.log(error)
            ))
        },
        provinces({ commit }){
          API.get(`/province`)
            .then(res => (
              commit('SET_PROVINCES', res.data)
            ))
            .catch(error => (
              console.log(error)
            ))
        },
        closeAlert({ commit }){
          commit('SET_ALERT', this.getAlert = false )
        },
    }
}
export default users;