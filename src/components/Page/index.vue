<template>
  <Wrapper>
    <v-stepper class="custom-stepper" v-model="steps">
      <v-stepper-header>
        <v-stepper-step :complete="steps > 1" step="1">ข้อมูลส่วนตัว</v-stepper-step>
        <v-divider></v-divider>

        <v-stepper-step :complete="steps > 2" step="2">หัวข้อการอบรม</v-stepper-step>
        <v-divider></v-divider>

        <v-stepper-step :complete="steps > 3" step="3">การเข้าพักโรงแรม</v-stepper-step>

      </v-stepper-header>
      
      <v-stepper-items>
        <v-stepper-content step="1">
          <v-form ref="form" v-model="valid" lazy-validation>
            <FormPersonal />
            <v-btn color="purple" @click="OnPersonal" dark >ถัดไป</v-btn>
          </v-form>
        </v-stepper-content>

        <v-stepper-content step="2">
          <v-form ref="form3" v-model="valid" lazy-validation>
            <FormTraining />
            <v-btn class="mr-1" color="info" @click="steps = 1">ย้อนกลับ</v-btn>
            <v-btn color="purple" @click="OnTrain" dark>ถัดไป</v-btn>
          </v-form>
        </v-stepper-content>

        <v-stepper-content step="3">
          <v-form ref="form2" v-model="valid" lazy-validation>
            <FormHotel />
            <v-btn class="mr-1" color="info" @click="steps = 2">ย้อนกลับ</v-btn>
            <v-btn class="white--text" v-if="getUsers.User_ID == ''" color="purple" @click="submit" :disabled="disable">บันทึกข้อมูล</v-btn>
            <v-btn v-if="getUsers.User_ID != ''" color="purple" dark href="/">หน้าหลัก</v-btn>
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
import FormTraining from "./FormTraining";
import FormHotel from "./FormHotel";
import router from '../../router';

export default {
  data() {
    return {
      valid: true,
      steps: 1,
      disable: false,
      overlay: false,
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
      return this.$store.getters.getTraining; //this.getters.getUserID
    },  
  },
  watch: {
    overlay (val) {
      val && setTimeout(() => {
        this.$refs.form.reset(),
        this.$nextTick(() => {
          this.getUsers.Status = true  
          this.disable = false   
          this.overlay = false   
          router.push('/')                
        })        
      }, 3000)
    },
  },
  methods: {
    async submit() {
      this.disable = true 
      if (this.$store.getters.getRoom.User_2_ID == '') {
          this.$store.getters.getUsers.Status = true
      }      
      if (this.$refs.form2.validate() == true) { //ทำการเช็ค validate
            this.overlay = true
            await this.$store.dispatch("setUsers")
            await this.$store.dispatch("setRoom")
            this.time = await setInterval(() => {
              if (!this.$store.getters.getUserID) {
                console.log('loading')
              } else {
                 clearInterval(this.time)
                  this.$store.dispatch("setTraining")
                  this.$store.dispatch("setHotel")
                  this.$store.dispatch("partnerUpdateID")                       
                  this.$store.dispatch("setUserStatus")
                  this.$store.dispatch("alertSuccess")
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
            this.$store.getters.getUsers.Phone = ""
          }
      } else {
        this.$refs.form.validate();
        this.$store.dispatch('alertError')
      }
    },
    OnTrain() {
        this.steps = 3
    },
  },
};
</script>