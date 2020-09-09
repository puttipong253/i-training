<template>
  <v-tabs
    fixed-tabs
    background-color="deep-purple"
    dark
  >
    <v-tab>
      ข้อมูลส่วนตัว
    </v-tab>
    <v-tab>
      หัวข้อการอบรม
    </v-tab>
    <v-tab>
      เช็คอิน
    </v-tab>
    <v-tab>
      ห้องพัก
    </v-tab>
    
    <v-tab-item>
         <User/>
    </v-tab-item>   
    <v-tab-item> 
         <Training/> 
    </v-tab-item>   
    <v-tab-item>
         <Hotel/> 
    </v-tab-item>  
    <v-tab-item>
         <Room/> 
    </v-tab-item>  

  </v-tabs>
</template>
<script>
import User from './User'
import Training from './Training'
import Hotel from './Hotel'
import Room from './Room'
export default {
    components:{
        User,
        Training,
        Hotel,
        Room
    }
}
</script>