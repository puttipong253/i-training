<template>
  <Wrapper>
    <v-card-title>
      รายชื่อผู้เช็คอิน
      <v-spacer></v-spacer>
      
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>

    <div v-if="customerHotel == ''">
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
        :items="customerHotel"
        :search="search"
      >
      <template #[`item.Room`]="{ item }">{{item.Room_ID == 0 ? 'ไม่มี' : item.Room_ID}}</template>
      </v-data-table>
      
    </div>
  </Wrapper>
</template>

<script>
import { Wrapper } from './index.style'
export default {
  data() {
    return {
      search: "",
      text: "ว่าง",
      headers: [
        { text: "ID", value: "Hotel_ID" },
        { text: "คำนำหน้า", value: "Prefix" },
        { text: "ชื่อ", value: "F_1" },
        { text: "นามสกุล", value: "L_1" },
        { text: "จังหวัด", value: "Province" },
        { text: "วันที่เช็คอิน", value: "Check_In" },
        { text: "วันที่เช็คเอาท์", value: "Check_Out" },
        { text: "รหัสห้องพัก", value: "Room" },
        { text: "หมายเหตุ", value: "Note" },
      ],
    };
  },
  components:{
      Wrapper
  },
  computed: {
    customerHotel() {
      return this.$store.getters.getCustomerHotel;
    },
  },
  mounted() {
    this.$store.dispatch('setCustomerHotel');
  },
};
</script>