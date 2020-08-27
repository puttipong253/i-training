<template>
  <Wrapper>
    <v-stepper class="custom-stepper" v-model="steps" vertical>
      <v-stepper-step :complete="steps > 1" step="1">ข้อมูลส่วนตัว</v-stepper-step>

      <v-stepper-content step="1">
        <v-form ref="form" v-model="valid" lazy-validation>
          <FormPersonal />
          <v-btn color="purple" @click="OnPersonal" dark>ถัดไป</v-btn>
        </v-form>
      </v-stepper-content>

      <v-stepper-step :complete="steps > 2" step="2">หัวข้อการอบรม</v-stepper-step>

      <v-stepper-content step="2">
        <FormTraining />
        <v-btn class="mr-5" color="info" @click="steps = 1">ย้อนกลับ</v-btn>
        <v-btn color="purple" @click="OnTrain" dark>ถัดไป</v-btn>
      </v-stepper-content>

      <v-stepper-step :complete="steps > 3" step="3">การเข้าพักโรงแรม</v-stepper-step>

      <v-stepper-content step="3">
        <v-form ref="form2" v-model="valid" lazy-validation>
          <FormHotel />
          <v-btn class="mr-5" color="info" @click="steps = 2">ย้อนกลับ</v-btn>
          <v-btn color="purple" @click="submit" dark>บันทึกข้อมูล</v-btn>
        </v-form>
      </v-stepper-content>
      <v-stepper-content step="4"></v-stepper-content>
    </v-stepper>
  </Wrapper>
</template>

<script>
import router from "../../router";
import { Wrapper } from "./index.style";
import FormPersonal from "./FormPersonal";
import FormTraining from "./FormTraining";
import FormHotel from "./FormHotel";
export default {
  data() {
    return {
      valid: true,
      steps: 1,
    };
  },
  components: {
    Wrapper,
    FormPersonal,
    FormTraining,
    FormHotel,
  },
  computed: {
    getUsers() {
      return this.$store.getters.getUsers;
    },
    getTraining() {
      return this.$store.getters.getTraining;
    },
  },
  methods: {
    submit() {
      if (this.$refs.form2.validate() == false) {
        this.$refs.form2.validate();
        this.$store.dispatch('alertError')
      } else {
        this.$store.dispatch("setUsers");
        this.$store.dispatch("setTraining");
        this.$store.dispatch("setHotel");
        setTimeout(() => (
          this.$refs.form.reset(),
          this.$refs.form2.reset(),
          router.push("/")
        ), 1500);
      }
    },
    OnPersonal() {
      if (this.$refs.form.validate() == true) {
        this.$refs.form.validate();
        this.$store.dispatch('alertError')
      } else {
        this.steps = 2;
      }
    },
    OnTrain() {
      if (
        !this.getTraining.TISI &&
        !this.getTraining.I_Factory &&
        !this.getTraining.E_Payment
      ) {
        this.$store.dispatch('alertError')
      } else {
        this.steps = 3;
      }
    },
  },
};
</script>