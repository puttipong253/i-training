import Vue from 'vue'
import Vuex from 'vuex'

import users from './modules/users'
import download from './modules/download'
import train from './modules/train'
import hotel from './modules/hotel'

Vue.use(Vuex)

export default new Vuex.Store({
  modules:{
    users,
    download,
    train,
    hotel
  }
})