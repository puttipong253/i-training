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
      การเข้าพักโรงแรม
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

  </v-tabs>
</template>
<script>
import User from './User'
import Training from './Training'
import Hotel from './Hotel'
export default {
    components:{
        User,
        Training,
        Hotel
    }
}
</script>