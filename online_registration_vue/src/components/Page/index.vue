<template>
<Wrapper>
  <v-stepper v-model="steps" vertical >
    <v-stepper-step :complete="steps > 1" step="1">
      ข้อมูลส่วนตัว
    </v-stepper-step>

    <v-stepper-content step="1">
      <FormPersonal/>
      <v-btn color="primary" @click="steps = 2">Continue</v-btn>
      <v-btn class="purple" dark @click="setUsers">บันทึกข้อมูล</v-btn>
    </v-stepper-content>

    <v-stepper-step :complete="steps > 2" step="2">หัวข้อการอบรม</v-stepper-step>

    <v-stepper-content step="2">
      <FormTraining/>
      <v-btn color="primary" @click="steps = 3">Continue</v-btn>
      <v-btn class="purple" dark @click="setTraning">บันทึกข้อมูล</v-btn>
    </v-stepper-content>

    <v-stepper-step :complete="steps > 3" step="3">การเข้าพักโรงแรม</v-stepper-step>

    <v-stepper-content step="3">
      <v-card color="grey lighten-1" class="mb-12" height="200px"></v-card>
      <v-btn color="primary" @click="steps = 1">Continue</v-btn>
      <v-btn text>Cancel</v-btn>
    </v-stepper-content>
  </v-stepper>
  </Wrapper>
</template>

<script>
import { Wrapper } from './index.style'
import FormPersonal from './FormPersonal'
import FormTraining from './FormTraining'
  export default {
    data () {
      return {
        steps: 1,
      }
    },
    components:{
        Wrapper,
        FormPersonal,
        FormTraining
    },
    methods: {
    async setUsers() {
      // if (this.users.F_Name != '') {
      //     this.$refs.form.resetValidation()
          await this.$store.dispatch('setUsers')
          // await this.$refs.form.reset()
      // }else{
      //     this.$refs.form.resetValidation()
      //     await this.$store.dispatch('submit')
      //     await this.$refs.form.validate()
      // \
      },
      setTraning(){
        this.$store.dispatch('setTraining')
      }
    },
  }
</script>