<template>
  <Wrapper>
    <v-stepper class="custom-stepper" v-model="steps">
      <v-stepper-header>
        <v-stepper-step :complete="steps > 1" step="1">ข้อมูลส่วนตัว</v-stepper-step>
        <v-divider></v-divider>

        <v-stepper-step :complete="steps > 2" step="2">การเข้าพักโรงแรม</v-stepper-step>

      </v-stepper-header>
      
      <v-stepper-items>
        <v-stepper-content step="1">
          <v-form ref="form" v-model="valid" lazy-validation>
            <FormPersonal />
            <v-btn color="purple" @click="OnPersonal" dark >ถัดไป</v-btn>
          </v-form>
        </v-stepper-content>

        <v-stepper-content step="2">
          <v-form ref="form2" v-model="valid" lazy-validation>
            <FormHotel />
            <v-btn class="mr-1" color="info" @click="steps = 1">ย้อนกลับ</v-btn>
            <v-btn class="white--text" v-if="getCustomer.Customer_ID == ''" color="purple" @click="submit">บันทึกข้อมูล</v-btn>
          </v-form>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
    <v-overlay :value="overlay">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </Wrapper>
</template>

<script>
import { Wrapper } from "./index.style";
import FormPersonal from "./FormPersonal";
import FormHotel from "./FormHotel";
import router from '../../router';

export default {
  data() {
    return {
      valid: true,
      steps: 1,
      overlay: false,
    };
  },
  components: {
    Wrapper,
    FormPersonal,
    FormHotel,
  },
  computed: {
    getCustomer() {
      return this.$store.getters.getCustomer;
    },
  },
  watch: {
    overlay (val) {
      val && setTimeout(() => {
        this.$refs.form.reset(),
        this.$nextTick(() => {
          this.getCustomer.Status = true   
          this.overlay = false   
          router.push('/')                
        })        
      }, 4000)
    },
  },
  methods: {
    async submit() {
      if (this.$store.getters.getRoom.Customer_2_ID == '' && this.$store.getters.getCustomer.Status == false) {
          this.$store.getters.getCustomer.Status = true
      }      
      if (this.$refs.form2.validate() == true) { //ทำการเช็ค validate
            this.overlay = true
            await this.$store.dispatch('setCustomer')
            await this.$store.dispatch('setRoom')
            this.time = await setInterval(() => {
              if (!this.$store.getters.getCustomerID) {
                console.log('loading')
              } else {
                 clearInterval(this.time)
                  this.$store.dispatch('setHotel')
                  this.$store.dispatch('partnerUpdateID')                       
                  this.$store.dispatch('setCustomerStatus')
                  this.$store.dispatch('alertSuccess')
              }
            }, 1000);
      } else {
        this.$refs.form2.validate();
        this.$store.dispatch('alertError')
        this.disable = false 
      }
    },
    async OnPersonal() {
      if (this.$refs.form.validate() == true) {
          await this.$store.dispatch('checkPhone')
          if (this.$store.getters.getCheckPhone == 0) {
            this.steps = 2
          } else {
            alert("เบอร์โทรศัพท์ถูกใช้งานแล้ว")
            this.$store.getters.getCustomer.Phone = ""
          }
      } else {
        this.$refs.form.validate();
        this.$store.dispatch('alertError')
      }
    },
  },
};
</script>