<template>
  <Wrapper>
    <v-card-title>
      รายชื่อผู้เข้าอบรม
      <!-- <v-btn class="ml-5 info" @click="downloadTraining">ดาวน์โหลด</v-btn> -->
      <v-spacer></v-spacer>
      
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>

    <div v-if="usersTraining == ''">
      <v-data-table
        item-key="name"
        class="elevation-1"
        loading
        loading-text="Loading... Please wait"
        :headers="headers"
        :search="search"
      ></v-data-table>
    </div>
    <div v-else>
      <v-data-table
        :headers="headers"
        :items="usersTraining"
        :search="search"
      ></v-data-table>
    </div>
  </Wrapper>
</template>

<script>
import { Wrapper } from './index.style'
export default {
  data() {
    return {
      search: "",
      headers: [
        { text: "ID", value: "T_ID" },
        { text: "คำนำหน้า", value: "Prefix" },
        { text: "ชื่อ", value: "F_Name" },
        { text: "นามสกุล", value: "L_Name" },
        { text: "จังหวัด", value: "Province" },
        { text: "ทะเบียนโรงงาน", value: "I_Factory" },
        { text: "ALOHA", value: "ALOHA" },
        { text: "ชำระค่าธรรมเนียมออนไลน์", value: "E_Payment" },
        { text: "การประกอบกิจการโรงงาน", value: "I_SingleForm" }
      ],
    };
  },
  components:{
    Wrapper
  },
  computed: {
    usersTraining() {
      return this.$store.getters.getUsersTraining;
    },
  },
  mounted() {
    this.$store.dispatch("setUsersTraining");
  },
  methods:{
    downloadTraining(){
      this.$store.dispatch("downloadTraining");
    },
  }
};
</script>