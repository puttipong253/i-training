import { API } from "../../API";

const users = {
    state: {
        users: {
          User_ID: "",
          Prefix: "",
          F_Name: "",
          L_Name: "",
          Gender: "",
          Rank: "",
          Email: "",
          Phone: "",
          Province: "",
          Food_Group: "",
          Food_Allergy: "",
          Status: true,
        },
        userID: "",
        showUsers: [],
        snackbar: false,
        alertColor: "",
        alertText: "",
        matching: [],
        check: []
    },
    getters: {
      getUsers(state){
        return state.users 
      },
      getUserID(state){
        return state.userID
      },
      getUsersStatus(state){
        return state.users.Status
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
      getMatching(state){
        return state.matching 
      },
      getCheckPhone(state){
        return state.check 
      },
    },
    mutations: {
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
      SET_USER_ID(state, data){
        state.userID = data
      },
      SET_MATCHING(state, data){
        state.matching = data
      },
      SET_CHECK_PHONE(state, data){
        state.check = data
      },
    },
    actions: {
        async setUsers({ commit }){
          try {
            let r = await API.post(`/users`, this.getters.getUsers) //ส่งค่าใน state users ทั้งหมดไปให้ backend
            commit('SET_USER_ID', r.data.User_ID)
          } catch (error) {
            console.log(error)
          }
        },
        async setShowUsers({ commit }){
          try {
            let r = await API.get(`/users`)
            commit('SET_SHOWUSERS', r.data)
          } catch (error) {
            console.log(error)
          }
        },
        async setUserStatus(){
          if (this.getters.getUser2ID != '' && this.getters.getUser2ID != undefined) {
              let data = await API.put(`/users/`+this.getters.getUser2ID,{Status:this.getters.getUsersStatus})  //ดึง Partner_ID ที่ได้จาก input form มาทำการ update status ของ user
              return data                                                                                       
            }       
        },
        async matching({ commit }){
          try {
            let r = await API.get(`/matching`)
            commit('SET_MATCHING', r.data)
            console.log('SET_MATCHING',r.data)
          } catch (error) {
            console.log(error)
          }
        },
        async checkPhone({ commit }){
          try {
            let r = await API.post(`/check-phone`, {Phone:this.getters.getUsers.Phone})
            commit('SET_CHECK_PHONE', r.data)
          } catch (error) {
            console.log(error)
          }
        },
        closeAlert({ commit }){
          commit('SET_ALERT', this.getAlert = false )
        },
        alertError({ commit }){
          commit('SET_ALERT',  true )
          commit('SET_ALERT_COLOR',  "error"),
          commit('SET_ALERT_TEXT',  "กรุณากรอกข้อมูลให้ครบถ้วน")
        },
        alertSuccess({ commit }){
          commit('SET_ALERT',  true )
          commit('SET_ALERT_COLOR',  "success"),
          commit('SET_ALERT_TEXT',  "บันทึกข้อมูลเรียบร้อย")
        },
    }
}
export default users;