<template>
  <Wrapper>
    <v-card-title>
      รายชื่อผู้เข้าพักโรงแรม
      <!-- <v-btn class="ml-5 info" @click="downloadHotel">ดาวน์โหลด</v-btn> -->
      <v-spacer></v-spacer>
      
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>

    <div v-if="usersHotel == ''">
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
        :items="usersHotel"
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
        { text: "ชื่อ", value: "F_1" },
        { text: "นามสกุล", value: "L_1" },
        { text: "จังหวัด", value: "p_name" },
        { text: "วันที่เช็คอิน", value: "Check_In" },
        { text: "วันที่เช็คเอาท์", value: "Check_Out" },
        { text: "Room_ID", value: "Room_ID" },
        { text: "หมายเหตุ", value: "Note" },
      ],
    };
  },
  components:{
      Wrapper
  },
  computed: {
    usersHotel() {
      return this.$store.getters.getUsersHotel;
    },
  },
  mounted() {
    this.$store.dispatch("setUsersHotel");
  },
  methods:{
    downloadHotel(){
      this.$store.dispatch("downloadHotel");
    }
  }
};
</script>