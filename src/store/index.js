import Vue from 'vue'
import Vuex from 'vuex'

import users from './modules/users'
import download from './modules/download'
import training from './modules/training'
import hotel from './modules/hotel'
import room from './modules/room'
import track from './modules/track'
import province from './modules/provinces'

Vue.use(Vuex)

export default new Vuex.Store({
  modules:{
    users,
    download,
    training,
    hotel,
    room,
    track,
    province
  }
})