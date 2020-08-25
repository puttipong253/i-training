import Vue from 'vue'
import Vuex from 'vuex'

import users from './modules/users'
import download from './modules/download'

Vue.use(Vuex)

export default new Vuex.Store({
  modules:{
    users,
    download
  }
})