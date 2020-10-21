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

      <template v-slot:top>
        <v-dialog v-model="dialog" persistent max-width="500px">
          <v-card>
            <v-card-title>
              <span class="headline"><h5>แก้ไข</h5></span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="6" sm="6" md="6">
                    
                  </v-col>

                  <v-col cols="6" sm="6" md="6">

                  </v-col>

                  <v-col cols="6" sm="6" md="6">

                  </v-col>              
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="save">บันทึก</v-btn>
              <v-btn color="blue darken-1" text @click="close">ยกเลิก</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon
          small
          class="mr-2"
          @click="editItem(item)"
        >
          mdi-pencil
        </v-icon>
      </template>
      </v-data-table>
      
    </div>
  </Wrapper>
</template>

<script>
import { Wrapper } from './index.style'
export default {
  data() {
    return {
      dialog: false,
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
        { text: "actions", value: "actions" },
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
  methods:{
    editItem() {    
      this.dialog = true        
    },
    close() {
      this.dialog = false 
    },
    save() {
      this.dialog = false 
    }
  }
};
</script>