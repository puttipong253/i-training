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
        { text: "ID", value: "User_ID" },
        { text: "ชื่อ", value: "F_Name" },
        { text: "นามสกุล", value: "L_Name" },
        { text: "จังหวัด", value: "p_name" },
        { text: "มผช", value: "TISI" },
        { text: "รง.4", value: "I_Factory" },
        { text: "e-payment", value: "E_Payment" }
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