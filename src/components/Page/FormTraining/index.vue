<template>
  <Wrapper>
    <v-row>
      <v-col cols="12" sm="12" md="12"><Header>หัวข้อการอบรม</Header></v-col>
      <v-col cols="12" class="mb-5">
        <v-switch v-model="getTraining.E_Payment" :false-value="0" :true-value="1"  hide-details color="success" label="ระบบการออกใบแจ้งชำระค่าธรรมเนียมรายปี (e-Payment)" disabled></v-switch>
        <v-switch v-model="getTraining.I_SingleForm" :false-value="0" :true-value="1"  hide-details color="success" label="ระบบการแจ้งข้อมูลการประกอบกิจการโรงงาน (i-SingleForm)" disabled></v-switch>
         <v-switch v-model="getTraining.ALOHA" :false-value="0" :true-value="1"  hide-details color="success" label="ALOHA" disabled></v-switch>
        <v-switch v-model="getTraining.I_Factory" :false-value="0" :true-value="1"  hide-details color="success" label="ระบบบริหารจัดการข้อมูลโรงงานอุตสาหกรรม (i-Factory)" disabled></v-switch>
      </v-col>
      </v-row>
  </Wrapper>
</template>
<script>
import { Wrapper, Header } from './index.style'
export default {
  data() {
    return {
    };
  },
  computed:{
    getTraining(){
      return this.$store.getters.getTraining
    },
  },
  components:{
      Wrapper,
      Header
  }
};
</script>