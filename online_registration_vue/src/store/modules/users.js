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
          Province_ID: "",
          Food_Group: "",
          Food_Allergy: "",
          Status: true,
        },
        userID: "",
        showUsers: [],
        Provinceitems: [],
        snackbar: false,
        alertColor: "",
        alertText: "",
    },
    getters: {
      getProvinces(state){
        return state.Provinceitems 
      },
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
      SET_USER_ID(state, data){
        state.userID = data
      },
    },
    actions: {
        setUsers({ commit }){
             API.post(`/users`, this.getters.getUsers) //ส่งค่าใน state users ทั้งหมดไปให้ backend
              .then(res => (
                console.log('user',res.data),
                commit('SET_USER_ID', res.data.User_ID)
              ))
              .catch(error => (
                console.log("error", error),
                commit('SET_ALERT',  true ),
                commit('SET_ALERT_COLOR',  "error"),
                commit('SET_ALERT_TEXT',  "กรุณากรอกข้อมูลให้ครบถ้วน")
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
        setUserStatus(){
          if (this.getters.getPartnerID != '') { //เช็คว่าค่าของ Partner_ID เป็นค่าว่างหรือไม่
            API.put(`/users/`+this.getters.getPartnerID,{   //ดึง Partner_ID ที่ได้จาก input form มาทำการ update status ของ user
                Status:this.getters.getUsersStatus,         //ทำการ update Status ของ user จาก 1 เป็น 0
            })
              .then(res => (
                  console.log('SET_USERS_STATUS', res.data)
              ))
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