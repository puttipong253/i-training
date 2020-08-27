<template>
  <Wrapper>
    <v-col cols="12" class="mb-5">
      <v-checkbox v-model="getTraining.TISI" label="รง.4" value="Yes" color="green" hide-details></v-checkbox>
      <v-checkbox v-model="getTraining.I_Factory" label="มผช." value="Yes" color="green" hide-details></v-checkbox>
      <v-checkbox v-model="getTraining.E_Payment" label="e-payment" value="Yes" color="green" hide-details></v-checkbox>
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