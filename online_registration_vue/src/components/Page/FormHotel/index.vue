<template>
  <Wrapper>
    <v-row>
      <v-col cols="6" sm="6" md="6">
        <v-select
          class="text-custom"
          v-model="getHotel.Check_In"
          :rules="checkInRules"
          :items="checkInItems"
          label="วันที่เช็คอิน"
        ></v-select>
      </v-col>

      <v-col cols="6" sm="6" md="6">
        <v-select
          class="text-custom"
          v-model="getHotel.Check_Out"
          :rules="checkOutRules"
          :items="checkOutItems"
          label="วันที่เช็คเอาท์"
        ></v-select>
      </v-col>

      <v-col cols="12" sm="12" md="12"><Header>คู่พัก</Header></v-col>

      <v-col cols="6" sm="6" md="4">
        <v-radio-group v-model="getUsers.Status" required row >
          <v-radio class="mr-5" color="green" label="รอจับคู่" :value="true"></v-radio>
          <v-radio color="green" label="เลือกคู่พักเอง" :value="false" class="mr-5"></v-radio>
        </v-radio-group>
      </v-col>

      <v-col cols="12" sm="6" md="4">
        <v-select
          class="text-custom"
          v-model="getHotel.Partner_Province_ID"
          :items="getPartnerProvinces"
          :disabled="getUsers.Status"
          @change="setPartnerName"
          item-text="name_th"
          item-value="id"
          label="จังหวัดของผู้ร่วมพัก"
        ></v-select>
      </v-col>

      <v-col cols="6" sm="6" md="4">
        <v-select
          class="text-custom"
          v-model="getHotel.Partner_ID"
          :items="getPartnerName"
          :disabled="getUsers.Status"
          :item-text="text"
          item-value="User_ID"
          label="ชื่อของผู้ร่วมพัก"
          required
        ></v-select>
      </v-col>

      <v-col cols="12" sm="6" md="12">
        <v-textarea
          class="mx-2"
          v-model="getHotel.Note"
          label="หมายเหตุ"
          rows="1"
          prepend-icon="mdi-comment"
        ></v-textarea>
      </v-col>
    </v-row>
  </Wrapper>
</template>

<script>
import { Wrapper, Header } from "./index.style";
export default {
  data: () => ({
    valid: false,
    checkInRules: [(v) => !!v || "กรุณาเลือกวันที่เช็คอิน"],
    checkOutRules: [(v) => !!v || "กรุณาเลือกวันที่เช็คเอาท์"],
    checkInItems: ["19 ตุลาคม 2563", "20 ตุลาคม 2563"],
    checkOutItems: ["20 ตุลาคม 2563", "21 ตุลาคม 2563"],
  }),
  components: {
    Wrapper,
    Header
  },
  mounted(){
    this.$store.dispatch("setPartnerProvinces") 
  },
  computed: {
    getHotel() {
      return this.$store.getters.getHotel;
    },
    getPartnerProvinces() {
      return this.$store.getters.getPartnerProvinces;
    },
    getPartnerName(){
      return this.$store.getters.getPartnerName
    },
    getUsers () {
      return this.$store.getters.getUsers
    },
  },
  methods: {
    setPartnerName(){
      this.$store.dispatch('setPartnerName') //เมื่อจังหวัดมีการเปลี่ยนแปลงจะทำการ get user ที่มี id จังหวัด ที่ตรงกับจังหวัดที่เลือก
    },
    text: item => item.F_Name + ' ' + item.L_Name
  },
};
</script>