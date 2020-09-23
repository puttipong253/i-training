<template>
  <Wrapper>
    <div v-if="getUsers.User_ID == ''">
      <v-row>
      <v-col cols="12" sm="12" md="12"><Header>การเข้าพักโรงแรม</Header></v-col>

      <v-col cols="6" sm="6" md="6">
        <v-select
          class="text-custom"
          v-model="getHotel.Check_In"
          :rules="checkInRules"
          :items="checkInItems"
          label="วันที่เช็คอิน"
          disabled
        ></v-select>
      </v-col>

      <v-col cols="6" sm="6" md="6">
        <v-select
          class="text-custom"
          v-model="getHotel.Check_Out"
          :rules="checkOutRules"
          :items="checkOutItems"
          label="วันที่เช็คเอาท์"
          disabled
        ></v-select>
      </v-col>

      <v-col cols="12" sm="12" md="12"><Header>คู่พัก</Header></v-col>

      <v-dialog v-model="dialog" persistent max-width="500">
        <v-card>
          <v-card-title class="headline">คำอธิบายการเลือกคู่</v-card-title>
          <v-card-text class="text-body-1">1. กรณีเลือก "รอจับคู่" เป็นการลงชื่อไว้ในระบบจับคู่ เพื่อให้คู่พักของท่านมาเลือกท่านทีหลัง</v-card-text>
          <v-card-text class="text-body-1">2. กรณีเลือก "เลือกคู่พัก" ให้ท่านเลือกจังหวัดของคู่พักของท่าน แล้วรายชื่อของผู้ลงทะเบียนในจังหวัดนั้นๆ จะแสดงออกมาให้ท่านเลือก</v-card-text>
          <v-card-text class="red--text">****หมายเหตุ****</v-card-text>
          <v-card-text class="text-body-1">1.ถ้าหากคู่พักของท่านยังไม่ได้ลงทะเบียน ให้ท่านเลือก "กรณีที่ 1" เพื่อรอจับคู่</v-card-text>
          <v-card-text class="text-body-1">2.ถ้าหากท่านเลือก "กรณีที่ 2" คู่พักของท่านจะต้องลงทะเบียนไว้ก่อนแล้วเท่านั้น</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" text @click="dialog = false">ยกเลิก</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-col cols="1" sm="1" md="1">
      <v-icon slot="prepend" color="blue" @click="popup">mdi-exclamation-thick</v-icon>
      </v-col>

      <v-col cols="6" sm="3" md="3">
        <v-tooltip v-model="show1" color="success" bottom >
          <template v-slot:activator="{ on }">  
            <div v-on="on">
              <v-radio-group v-model="getUsers.Status" required row >                
                <v-radio class="mr-5" color="green" label="รอจับคู่" :value="true"></v-radio>
              </v-radio-group>
            </div>            
          </template>          
          <v-card-text class="text-body-1">1. กรณีเลือก "รอจับคู่" เป็นการลงชื่อไว้ในระบบจับคู่</v-card-text>
          <v-card-text class="text-body-1">เพื่อให้คู่พักของท่านมาเลือกท่านทีหลัง</v-card-text>
          <v-card-text class="text-body-1">**หมายเหตุ** ถ้าหากคู่พักของท่านยังไม่ได้ลงทะเบียนให้ท่านเลือก ตัวเลือกนี้ เพื่อรอจับคู่</v-card-text>
        </v-tooltip>
      </v-col>

      <v-col cols="5" sm="3" md="2">
        <v-tooltip v-model="show2" color="success" bottom>
          <template v-slot:activator="{ on }">  
            <div v-on="on">
                <v-radio-group v-model="getUsers.Status" required row >
                  <v-radio color="green" label="เลือกคู่พัก" :value="false"></v-radio>                    
                </v-radio-group>
            </div>            
          </template>          
          <v-card-text class="text-body-1">2. กรณีเลือก "เลือกคู่พัก" ให้ท่านเลือกจังหวัดของคู่พักของท่าน </v-card-text>
          <v-card-text class="text-body-1">แล้วรายชื่อของผู้ลงทะเบียนในจังหวัดนั้นๆ จะแสดงออกมาให้ท่านเลือก </v-card-text>
          <v-card-text class="text-body-1">**หมายเหตุ** คู่พักของท่านจะต้องลงทะเบียนไว้ก่อนแล้วเท่านั้น รายชื่อถึงจะแสดง</v-card-text>
        </v-tooltip>
      </v-col>

      <v-col cols="6" sm="5" md="3">
        <v-select
          class="text-custom"
          v-model="getHotel.Partner_Province"
          :items="getMyProvince"
          :disabled="getUsers.Status"
          @change="setPartnerName"
          label="จังหวัดของผู้ร่วมพัก"
          item-text="th"
          clearable
        ></v-select>
      </v-col>

      <v-col cols="6" sm="6" md="3">
        <v-select
          class="text-custom"
          v-model="getRoom.User_2_ID"
          :items="getPartnerName"
          :disabled="getUsers.Status"
          :item-text="text"
          item-value="User_ID"
          label="ชื่อของผู้ร่วมพัก"
          clearable
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
    </div>
  </Wrapper>
</template>

<script>
import { Wrapper, Header } from "./index.style";
export default {
  data: () => ({
    dialog: false,
    valid: false,
    show1: false,
    show2: false,
    checkInRules: [(v) => !!v || "กรุณาเลือกวันที่เช็คอิน"],
    checkOutRules: [(v) => !!v || "กรุณาเลือกวันที่เช็คเอาท์"],
    checkInItems: ["19 ตุลาคม 2563", "20 ตุลาคม 2563"],
    checkOutItems: ["20 ตุลาคม 2563", "21 ตุลาคม 2563"],  
    partnerRules: [(v) => !!v || "กรุณาเลือกคู่พัก"],
  }),
  components: {
    Wrapper,
    Header
  },
  mounted(){
    this.getMyProvince.sort(this.compareItem)
  },
  computed: {
    getHotel() {
      return this.$store.getters.getHotel;
    },
    getMyProvince(){
      return this.$store.getters.myProvince
    },
    getPartnerName(){
      return this.$store.getters.getPartnerName
    },
    getUsers () {
      return this.$store.getters.getUsers
    },
    getRoom() {
      return this.$store.getters.getRoom;
    },
    getPartner() {
      return this.$store.getters.getPartner;
    },
  },
  methods: {
    setPartnerName(){
      this.$store.dispatch('setPartnerName') //เมื่อจังหวัดมีการเปลี่ยนแปลงจะทำการ get user ที่มี id จังหวัด ที่ตรงกับจังหวัดที่เลือก
    },
    popup(){
      this.dialog = true
    },
    compareItem(a, b){
      if(a.th < b.th){
              return -1;
      }else if(a.th > b.th){
              return 1;
      }else{
              return 0;
      }
    },
    text: item => item.F_Name + ' ' + item.L_Name
  },
};
</script>