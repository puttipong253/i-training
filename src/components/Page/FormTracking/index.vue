<template>

    <Wrapper>
      <v-row>
        <v-col cols="12" sm="12" md="12"><Header>ข้อมูลการลงทะเบียน</Header></v-col>
        <v-col cols="3" sm="2" md="2">
          <v-text-field
            :value="getUserTrack.Prefix"
            label="คำนำหน้า"
            readonly
          ></v-text-field>
        </v-col>

        <v-col cols="4" sm="3" md="3">
          <v-text-field
            :value="getUserTrack.F_Name"
            label="ชื่อ"
            readonly
          ></v-text-field>
        </v-col>
        
        <v-col cols="5" sm="3" md="3">
          <v-text-field
            :value="getUserTrack.L_Name"
            label="นามสกุล"
            readonly
          ></v-text-field>
        </v-col>

        <v-col cols="6" sm="4" md="4">
          <v-text-field
            :value="getUserTrack.Rank"
            label="ตำแหน่ง"
            readonly
          ></v-text-field>
        </v-col>

        <v-col cols="6" sm="6" md="4">
          <v-text-field
            :value="getUserTrack.Phone"
            label="เบอร์โทรศัพท์"
            readonly
          ></v-text-field>
        </v-col>

        <v-col cols="6" sm="6" md="4">
          <v-text-field
            :value="getUserTrack.Email"
            label="อีเมล"
            readonly
          ></v-text-field>
        </v-col>

        <v-col cols="6" sm="4" md="4">
          <v-text-field
            :value="getUserTrack.name_th"
            label="จังหวัด"
            readonly
          ></v-text-field>
        </v-col>

        <v-col cols="6" sm="4" md="6">
          <v-text-field
            :value="getUserTrack.Food_Group"
            label="ประเภทอาหาร"
            readonly
          ></v-text-field>
        </v-col>

        <v-col cols="6" sm="4" md="6">
          <v-text-field
            :value="getUserTrack.Food_Allergy"
            label="อาหารที่แพ้"
            readonly
          ></v-text-field>
        </v-col>

        <v-col cols="12" sm="12" md="12"><Header>คู่พักและห้องพัก</Header></v-col>

        <!-- <div v-if="getUserTrack.Partner_ID != null"> -->
          <v-col v-if="getUserTrack.Partner_ID != null" cols="3" sm="2" md="2">
            <v-text-field
              :value="getPartner.Prefix"
              label="คำนำหน้า"
              readonly
            ></v-text-field>
          </v-col>

          <v-col v-if="getUserTrack.Partner_ID != null" cols="4" sm="5" md="5">
            <v-text-field
              :value="getPartner.F_Name"
              label="ชื่อ"
              readonly
            ></v-text-field>
          </v-col>

          <v-col v-if="getUserTrack.Partner_ID != null" cols="5" sm="5" md="5">
            <v-text-field
              :value="getPartner.L_Name"
              label="นามสกุล"
              readonly
            ></v-text-field>
          </v-col>

          <v-col v-if="getUserTrack.Partner_ID != null" cols="4" sm="4" md="4">
            <v-text-field
              :value="getPartner.Phone"
              label="เบอร์โทรศัพท์"
              readonly
            ></v-text-field>
          </v-col>

          <v-col v-if="getUserTrack.Partner_ID != null" cols="4" sm="4" md="4">
            <v-text-field
              :value="getPartner.name_th"
              label="จังหวัด"
              readonly
            ></v-text-field>
          </v-col>

          <v-col v-if="getUserTrack.Partner_ID != null" cols="4" sm="4" md="4">
            <v-text-field
              :value="getUserTrack.room_Number"
              label="หมายเลขห้องพัก"
              readonly
            ></v-text-field>
          </v-col>
      </v-row>

      <div v-if="getUserTrack.Partner_ID == null" class="mt-5 mb-5" >
        <v-progress-circular
          :size="50"
          :width="5"
          color="red"
          indeterminate
        ></v-progress-circular>
        <div class="mt-5">กำลังรอจับคู่ ...</div> 
      </div>
      
      <v-btn class="purple mt-5" href="/" dark>กลับหน้าหลัก</v-btn>
    </Wrapper>
</template>

<script>
import {Header ,Wrapper} from './index.style'
export default {
  data() {
    return {
      
    }
  },
  components:{
    Header,
    Wrapper,
  },
  computed:{
    getUserTrack(){
      return this.$store.getters.getUserTrack
    },
    getPartner(){
      return this.$store.getters.getPartner
    }
  }
}
</script>