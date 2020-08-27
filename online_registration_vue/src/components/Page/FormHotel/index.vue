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

      <v-col cols="12" sm="12" md="12"><Header>คุณจะพักกับใคร</Header></v-col>

      <v-col cols="6" sm="6" md="4">
        <v-radio-group v-model="status" required row >
          <v-radio class="mr-5" color="green" label="ผู้จัดเลือกให้" :value="true"></v-radio>
          <v-radio color="green" label="เลือกเอง" :value="false" class="mr-5"></v-radio>
        </v-radio-group>
      </v-col>

      <v-col cols="6" sm="6" md="4">
        <v-text-field
          class="text-custom"
          v-model="getHotel.Partner_Name"
          :disabled="status"
          label="ชื่อของผู้ร่วมพัก"
          required
        ></v-text-field>
      </v-col>

      <v-col cols="12" sm="6" md="4">
        <v-select
          class="text-custom"
          v-model="getHotel.Partner_Province"
          :items="getProvinces"
          :disabled="status"
          item-text="name_th"
          label="จังหวัดของผู้ร่วมพัก"
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
    status: true,
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
  computed: {
    getHotel() {
      return this.$store.getters.getHotel;
    },
    getProvinces() {
      return this.$store.getters.getProvinces;
    },
  },
  methods: {
    setHotel() {
      this.$store.dispatch("setHotel");
    },
  },
};
</script>