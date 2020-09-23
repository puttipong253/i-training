<template>
  <Wrapper>
    <v-card-title>
      รายชื่อผู้ลงทะเบียนทั้งหมด
      <v-btn class="ml-5 info" @click="downloadUser">ดาวน์โหลด</v-btn>
      <v-spacer></v-spacer>
      
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>

    <div v-if="users == ''">
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
        :items="users"
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
        { text: "คำนำหน้า", value: "Prefix" },
        { text: "ชื่อ", value: "F_Name" },
        { text: "นามสกุล", value: "L_Name" },
        { text: "เพศ", value: "Gender" },
        { text: "ตำแหน่ง", value: "Rank" },
        { text: "อีเมล", value: "Email" },
        { text: "เบอร์โทรศัพท์", value: "Phone" },
        { text: "จังหวัด", value: "Province" },
        { text: "หมวดหมู่อาหาร", value: "Food_Group" },
        { text: "อาหารที่แพ้", value: "Food_Allergy" },
      ],
    }
  },
  components:{
    Wrapper
  },
  computed: {
    users() {
      return this.$store.getters.getShowUsers;
    },
  },
  mounted() {
    this.$store.dispatch("setShowUsers");
  },
  methods:{
    downloadUser(){
      this.$store.dispatch("downloadUser");
    }
  }
};
</script>