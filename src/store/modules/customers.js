import { API } from "../../API";

const customer = {
    state: {
      customer: {
          Customer_ID: "",
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
        customerID: "",
        customerById: [],
        showCustomer: [],
        snackbar: false,
        alertColor: "",
        alertText: "",
        matching: [],
        check: [],
        countAllCustomer: "",
        countCustomerMatch: "",
        countCustomerNotMatch: "",
        countCustomerNoHotel: "",
    },
    getters: {
      getCustomer(state){
        return state.customer 
      },
      getCustomerID(state){
        return state.customerID
      },
      getCustomerStatus(state){
        return state.customer.Status
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
      getShowCustomer(state){
        return state.showCustomer 
      },
      getMatching(state){
        return state.matching 
      },
      getCheckPhone(state){
        return state.check 
      },
      getCustomerById(state){
        return state.customerById
      },
      getCountAllCustomer(state){
        return state.countAllCustomer
      },
      getCountCustomerMatch(state){
        return state.countCustomerMatch
      },
      getCountCustomerNotMatch(state){
        return state.countCustomerNotMatch
      },
      getCountCustomerNoHotel(state){
        return state.countCustomerNoHotel
      },
    },
    mutations: {
      SET_CUSTOMER(state, data){
        state.customer = data
      },
      SET_SHOWCUSTOMER(state, data){
        state.showCustomer = data
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
      SET_CUSTOMER_ID(state, data){
        state.customerID = data
      },
      SET_MATCHING(state, data){
        state.matching = data
      },
      SET_CHECK_PHONE(state, data){
        state.check = data
      },
      SET_COUNT_ALLCUSTOMER(state, data){
        state.countAllCustomer = data
      },
      SET_COUNT_CUSTOMERMATCH(state, data){
        state.countCustomerMatch = data
      },
      SET_COUNT_CUSTOMERNOTMATCH(state, data){
        state.countCustomerNotMatch = data
      },
      SET_COUNT_CUSTOMERNOHOTEL(state, data){
        state.countCustomerNoHotel = data
      },
    },
    actions: {
        async setCustomer({ commit }){
          try {
            let r = await API.post(`/customers`, this.getters.getCustomer) //ส่งค่าใน state users ทั้งหมดไปให้ backend
            commit('SET_CUSTOMER_ID', r.data.Customer_ID)
            console.log('customer', r.data)
          } catch (error) {
            console.log(error)
          }
        },
        async setShowCustomer({ commit }){
          try {
            let r = await API.get(`/customers`)
            commit('SET_SHOWCUSTOMER', r.data)
          } catch (error) {
            console.log(error)
          }
        },
        async setCustomerStatus(){
          if (this.getters.getCustomer2ID != '' && this.getters.getCustomer2ID != undefined) {
              let data = await API.put(`/customers/`+this.getters.getCustomer2ID,{Status:this.getters.getCustomerStatus})  //ดึง Partner_ID ที่ได้จาก input form มาทำการ update status ของ user
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
            let r = await API.post(`/check-phone`, {Phone:this.getters.getCustomer.Phone})
            commit('SET_CHECK_PHONE', r.data)
          } catch (error) {
            console.log(error)
          }
        },
        async editCustomer(){
          try {
            let r = await API.put(`/customers/`+this.state.customerById, this.getters.getCustomer)
            return r.data
          } catch (error) {
            console.log(error)
          }
        },
        async deleteCustomer(){
          try {
            let r = await API.delete(`/customers/`+this.state.customerById)
            return r.data
          } catch (error) {
            console.log(error)
          }
        },
        async setProvinceRoom({ commit }){
          try {
              let r = await API.post(`/provinceUserRoom`,this.getters.getHotel) //post หา $request ของ id จังหวัด แล้วไปเช็ค id ของจังหวัดนั้นๆ                      //ว่าตรงกับ ptovince_id ของ ของ user คนไหนบ้าง และให้แสดงชื่อของuser ที่มี status = 1
              commit('SET_PARTNER_NAME', r.data) //เก็บค่า data ที่ได้จากการ post มาไว้ในตัวแปร             
              console.log('SET_PARTNER_NAME', r.data)        
          } catch (error) {
              console.log(error)
          }
        },
        async countAllCustomer({ commit }){
          try {
              let r = await API.get(`/countAllCustomer`)
              commit('SET_COUNT_ALLCUSTOMER', r.data)
          } catch (error) {
              console.log(error)
          }
        },
        async countCustomerMatch({ commit }){
          try {
              let r = await API.get(`/countCustomerMatch`)
              commit('SET_COUNT_CUSTOMERMATCH', r.data)
          } catch (error) {
              console.log(error)
          }
        },
        async countCustomerNotMatch({ commit }){
          try {
              let r = await API.get(`/countCustomerNotMatch`)
              commit('SET_COUNT_CUSTOMERNOTMATCH', r.data)
          } catch (error) {
              console.log(error)
          }
        },
        async countCustomerNoHotel({ commit }){
          try {
              let r = await API.get(`/countCustomerNoHotel`)
              commit('SET_COUNT_CUSTOMERNOHOTEL', r.data)
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
export default customer;