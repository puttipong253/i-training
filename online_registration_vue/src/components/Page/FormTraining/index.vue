<template>
  <Wrapper>
    <v-col cols="12" class="mb-5">
      <v-switch v-model="getTraining.TISI"  hide-details color="success" label="รง.4"></v-switch>
      <v-switch v-model="getTraining.I_Factory"  hide-details color="success" label="มผช."></v-switch>
      <v-switch v-model="getTraining.E_Payment"  hide-details color="success" label="e-payment"></v-switch>
    </v-col>
  </Wrapper>
</template>
<script>
import { Wrapper } from './index.style'
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
  methods:{
    setTraing(){
      this.$store.dispatch('setTrain')
    }
  },
  components:{
      Wrapper
  }
};
</script>