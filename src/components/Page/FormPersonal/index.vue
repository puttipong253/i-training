<template>
    <Wrapper>
        <v-row>
          <v-col cols="12" sm="12" md="12"><Header>ข้อมูลส่วนตัว</Header></v-col>

          <v-col cols="12" sm="4" md="2">
            <v-select
              class="text-custom"
              v-model="getUsers.Prefix"
              :rules="prefixRules"
              :items="prefixItems"
              label="คำนำหน้า"              
            ><v-icon slot="prepend" color="red">mdi-asterisk</v-icon></v-select>
            
          </v-col>

          <v-col cols="6" sm="4" md="5">
            <v-text-field
              class="text-custom"
              v-model="getUsers.F_Name"
              :rules="fnameRules"
              label="ชื่อจริง"              
            ><v-icon slot="prepend" color="red">mdi-asterisk</v-icon></v-text-field>
          </v-col>

          <v-col cols="6" sm="4" md="5">
            <v-text-field
              class="text-custom"
              v-model="getUsers.L_Name"
              :rules="lnameRules"
              label="นามสกุล"              
            ><v-icon slot="prepend" color="red">mdi-asterisk</v-icon></v-text-field>
          </v-col>

          <v-col cols="7" sm="4" md="3">
            <v-radio-group v-model="getUsers.Gender" :rules="genderRules"  row>
              <v-icon slot="prepend" color="red">mdi-asterisk</v-icon>
              <v-radio label="ชาย" value="ชาย"></v-radio>
              <v-radio label="หญิง" value="หญิง"></v-radio>
            </v-radio-group>
          </v-col>

          <v-col cols="5" sm="4" md="4">
            <v-text-field
              class="text-custom"
              v-model="getUsers.Phone"
              :rules="phoneRules"
              :counter="10"
              maxlength="10"
              oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
              label="เบอร์โทรศัพท์"
              type="number"              
            ><v-icon slot="prepend" color="red">mdi-asterisk</v-icon></v-text-field>
          </v-col>

          <v-col cols="12" sm="4" md="5">
            <v-text-field
              class="text-custom"
              v-model="getUsers.Rank"
              :rules="rankRules"
              label="ตำแหน่ง"              
            ><v-icon slot="prepend" color="red">mdi-asterisk</v-icon></v-text-field>
          </v-col>

          <v-col cols="12" sm="6" md="6">
            <v-text-field
              class="text-custom"
              v-model="getUsers.Email"
              :rules="emailRules"
              label="อีเมล"              
            ><v-icon slot="prepend" color="red">mdi-asterisk</v-icon></v-text-field>
          </v-col>

          <v-col cols="7" sm="6" md="6" >       
            <v-select
              class="text-custom"
              v-model="getUsers.Province"
              :rules="provinceRules"
              :items="getMyProvince"
              item-text="th"
              label="จังหวัด"
            ><v-icon slot="prepend" color="red">mdi-asterisk</v-icon></v-select>     
          </v-col>

          <v-col cols="5" sm="6" md="6">
            <v-select
              class="text-custom"
              v-model="getUsers.Food_Group"
              :rules="foodGroupRules"
              :items="foodGroupItems"
              label="ประเภทอาหาร"              
            ><v-icon slot="prepend" color="red">mdi-asterisk</v-icon></v-select>
          </v-col>

          <v-col cols="12" sm="6" md="6">
            <v-text-field
              class="text-custom"
              v-model="getUsers.Food_Allergy"
              label="อาหารที่แพ้"              
            ><v-icon slot="prepend" color="red"></v-icon></v-text-field>
          </v-col>
        </v-row>
    </Wrapper>
</template>

<script>
import { Wrapper, Header } from "./index.style";

export default {
  data: () => ({
    prefixRules: [(v) => !!v || "กรุณาเลือกคำนำหน้า"],
    fnameRules: [(v) => !!v || "กรุณากรอกชื่อจริง"],
    lnameRules: [(v) => !!v || "กรุณากรอกนามสกุล"],
    genderRules: [(v) => !!v || "กรุณาเลือกเพศ"],
    rankRules: [(v) => !!v || "กรุณากรอกตำแหน่ง"],
    emailRules: [
      v => !!v || "กรุณากรอกอีเมล",
      v => /.+@.+\..+/.test(v) || "อีเมลไม่ถูกต้อง",
    ],
    phoneRules: [
      v => !!v || "กรุณากรอกเบอร์โทรศัพท์",
      v => (v && v.length == 10) || "กรุณากรอกเบอร์โทรศัพท์ให้ครบ 10 หลัก",
    ],
    provinceRules: [(v) => !!v || "กรุณาเลือกจังหวัด"],
    foodGroupRules: [(v) => !!v || "กรุณาเลือกหมวดหมู่อาหาร"],
    prefixItems: ["นาย", "นาง", "นางสาว"],
    foodGroupItems: ["ทั่วไป", "มังสวิรัติ", "อิสลาม"],
  }),
  components: {
    Wrapper,
    Header
  },
  mounted() {
    this.getMyProvince.sort(this.compareItem)
  },
  computed: {
    getUsers () {
      return this.$store.getters.getUsers
    },
    getMyProvince(){
      return this.$store.getters.myProvince
    }

  },
  methods:{
    compareItem(a, b){
        if(a.th < b.th){
                return -1;
        }else if(a.th > b.th){
                return 1;
        }else{
                return 0;
        }
    }
  }
};
</script>