<template>

    <Wrapper>
        <v-row>
          <v-col cols="12" sm="4" md="2">
            <v-select
              class="text-custom"
              v-model="getUsers.Prefix"
              :rules="prefixRules"
              :items="prefixItems"
              label="คำนำหน้า"
            ></v-select>
          </v-col>

          <v-col cols="6" sm="4" md="5">
            <v-text-field
              class="text-custom"
              v-model="getUsers.F_Name"
              :rules="fnameRules"
              label="ชื่อจริง"
              required
            ></v-text-field>
          </v-col>

          <v-col cols="6" sm="4" md="5">
            <v-text-field
              class="text-custom"
              v-model="getUsers.L_Name"
              :rules="lnameRules"
              label="นามสกุล"
              required
            ></v-text-field>
          </v-col>

          <v-col cols="6" sm="4" md="3">
            <v-radio-group v-model="getUsers.Gender" :rules="genderRules" required row>
              <v-radio label="ชาย" value="ชาย"></v-radio>
              <v-radio label="หญิง" value="หญิง"></v-radio>
            </v-radio-group>
          </v-col>

          <v-col cols="6" sm="8" md="5">
            <v-text-field
              class="text-custom"
              v-model="getUsers.Rank"
              :rules="rankRules"
              label="ตำแหน่ง"
              required
            ></v-text-field>
          </v-col>

          <v-col cols="6" sm="6" md="4">
            <v-text-field
              class="text-custom"
              v-model="getUsers.Phone"
              :rules="phoneRules"
              :counter="10"
              label="เบอร์โทรศัพท์"
              type="number"
              required
            ></v-text-field>
          </v-col>

          <v-col cols="6" sm="6" md="6">
            <v-text-field
              class="text-custom"
              v-model="getUsers.Email"
              :rules="emailRules"
              label="อีเมล"
              required
            ></v-text-field>
          </v-col>

          <v-col cols="6" sm="6" md="6">
            <v-select
              class="text-custom"
              v-model="getUsers.Province"
              :rules="provinceRules"
              :items="getProvinces"
              item-text="name_th"
              label="จังหวัด"
            ></v-select>
          </v-col>

          <v-col cols="6" sm="6" md="6">
            <v-select
              class="text-custom"
              v-model="getUsers.Food_Group"
              :rules="foodGroupRules"
              :items="foodGroupItems"
              label="หมวดหมู่อาหาร"
            ></v-select>
          </v-col>

          <v-col cols="12" sm="12" md="6">
            <v-text-field
              class="text-custom"
              v-model="getUsers.Food_Allergy"
              label="อาหารที่แพ้"
            ></v-text-field>
          </v-col>

        </v-row>
    </Wrapper>

</template>

<script>
import { Wrapper } from "./index.style";
export default {
  data: () => ({

    prefixRules: [(v) => !!v || "กรุณาเลือกคำนำหน้า"],
    fnameRules: [(v) => !!v || "กรุณากรอกชื่อจริง"],
    lnameRules: [(v) => !!v || "กรุณากรอกนามสกุล"],
    genderRules: [(v) => !!v || "กรุณาเลือกเพศ"],
    rankRules: [(v) => !!v || "กรุณาเลือกตำแหน่ง"],
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
  },
  mounted() {
    this.$store.dispatch('setProvinces')
  },
  computed: {
    getProvinces () {
      return this.$store.getters.getProvinces
    },
    getUsers () {
      return this.$store.getters.getUsers
    },
  },
  methods: {
    async setUsers() {
      // if (this.users.F_Name != '') {
      //     this.$refs.form.resetValidation()
          await this.$store.dispatch('setUsers')
          await this.$refs.form.reset()
      // }else{
      //     this.$refs.form.resetValidation()
      //     await this.$store.dispatch('submit')
      //     await this.$refs.form.validate()
      // }
    },
  },
};
</script>