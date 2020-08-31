import { API } from "../../API";

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
        alertText: "",
        userStatus: ""
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
      getUserStatus(state){
        return state.userStatus
      }
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
      SET_USER_STATUS(state, data){
        state.userStatus = data
      }
    },
    actions: {
        setUsers({ commit }){
             API.post(`/users`, this.getters.getUsers)
              .then(res => (
                console.log('user',res.data)
              ))
              .catch(error => (
                console.log("error", error),
                commit('SET_ALERT', this.getAlert = true),
                commit('SET_ALERT_COLOR', this.getAlertColor = "error")
              ))
        },
        setShowUsers({ commit }){
          API.get(`/users`)
            .then(res => (
              commit('SET_SHOWUSERS', res.data)
            ))
            .catch(error => (
              console.log(error)
            ))
        },
        setProvinces({ commit }){
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
        alertError({ commit }){
          commit('SET_ALERT', this.getAlert = true )
          commit('SET_ALERT_COLOR', this.getAlertColor = "error"),
          commit('SET_ALERT_TEXT', this.getAlertText = "กรุณากรอกข้อมูลให้ครบถ้วน")
        },
        alertSuccess({ commit }){
          commit('SET_ALERT', this.getAlert = true )
          commit('SET_ALERT_COLOR', this.getAlertColor = "success"),
          commit('SET_ALERT_TEXT', this.getAlertText = "บันทึกข้อมูลเรียบร้อย")
        },
        setStatus(){
          alert(this.getUserStatus)
        }
    }
}
export default users;