import Vue from 'vue'
import Vuex from 'vuex'

import customers from './modules/customers'
import download from './modules/download'
import hotel from './modules/hotel'
import room from './modules/room'
import track from './modules/track'
import province from './modules/provinces'

Vue.use(Vuex)

export default new Vuex.Store({
  modules:{
    customers,
    download,
    hotel,
    room,
    track,
    province
  }
})