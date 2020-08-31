import Vue from 'vue'
import Vuex from 'vuex'

import users from './modules/users'
import download from './modules/download'
import training from './modules/training'
import hotel from './modules/hotel'

Vue.use(Vuex)

export default new Vuex.Store({
  modules:{
    users,
    download,
    training,
    hotel
  }
})