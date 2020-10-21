<template>
  <v-tabs
    fixed-tabs
    background-color="deep-purple"
    dark
  >
    <v-tab>
      DashBoard
    </v-tab>
    <v-tab>
      ข้อมูลส่วนตัว
    </v-tab>
    <v-tab>
      เช็คอิน
    </v-tab>
    <v-tab>
      ห้องพัก
    </v-tab>
    <v-tab>
      จับคู่
    </v-tab>
    
    <v-tab-item>
      <DashBoard/>
    </v-tab-item>  
    <v-tab-item>
      <Customer/>
    </v-tab-item>    
    <v-tab-item>
      <Hotel/> 
    </v-tab-item>  
    <v-tab-item>
      <Room/> 
    </v-tab-item>  
    <v-tab-item>
      <Matching/> 
    </v-tab-item>  

  </v-tabs>
</template>
<script>
import DashBoard from './DashBoard'
import Customer from './Customer'
import Hotel from './Hotel'
import Room from './Room'
import Matching from './Matching'
export default {
    components:{
        DashBoard,
        Customer,
        Hotel,
        Room,
        Matching
    }
}
</script>