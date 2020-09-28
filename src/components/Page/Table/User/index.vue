<template>
  <Wrapper>
    <v-card-title>
      รายชื่อผู้ลงทะเบียนทั้งหมด
      <v-btn class="ml-5 info" @click="downloadUser">ดาวน์โหลด</v-btn>
      <v-btn class="ml-1 info" @click="downloadListUser">ดาวน์โหลดใบเซ็นชื่อ</v-btn>
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
      >
      <template v-slot:top>
        <v-dialog v-model="dialog" max-width="500px">
          <v-card>
            <v-card-title>
              <span class="headline"><h5>แก้ไขข้อมูล</h5></span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="3" md="3">
                    <v-select
                      class="text-custom"
                      v-model="getUsers.Prefix"
                      :rules="prefixRules"
                      :items="prefixItems"
                      label="คำนำหน้า"              
                    ></v-select>            
                  </v-col>

                  <v-col cols="6" sm="5" md="5">
                    <v-text-field
                      class="text-custom"
                      v-model="getUsers.F_Name"
                      :rules="fnameRules"
                      label="ชื่อจริง"              
                    ></v-text-field>
                  </v-col>

                  <v-col cols="6" sm="4" md="4">
                    <v-text-field
                      class="text-custom"
                      v-model="getUsers.L_Name"
                      :rules="lnameRules"
                      label="นามสกุล"              
                    ></v-text-field>
                  </v-col>

                  <v-col cols="5" sm="3" md="3">
                    <v-select 
                      class="text-custom"
                      v-model="getUsers.Gender" 
                      :items="genderItems" 
                      :rules="genderRules"
                      label="เพศ"
                    ></v-select>
                  </v-col>

                  <v-col cols="7" sm="5" md="5">
                    <v-text-field
                      class="text-custom"
                      v-model="getUsers.Rank"
                      :rules="rankRules"
                      label="ตำแหน่ง"              
                    ></v-text-field>
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
                    ></v-text-field>
                  </v-col>

                  <v-col cols="7" sm="6" md="6">
                    <v-text-field
                      class="text-custom"
                      v-model="getUsers.Email"
                      :rules="emailRules"
                      label="อีเมล"              
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" sm="6" md="6" >       
                    <v-select
                      class="text-custom"
                      v-model="getUsers.Province"
                      :rules="provinceRules"
                      :items="getMyProvince"
                      item-text="th"
                      label="จังหวัด"
                    ></v-select>     
                  </v-col>

                  <v-col cols="5" sm="5" md="5">
                    <v-select
                      class="text-custom"
                      v-model="getUsers.Food_Group"
                      :rules="foodGroupRules"
                      :items="foodGroupItems"
                      label="ประเภทอาหาร"              
                    ></v-select>
                  </v-col>

                  <v-col cols="7" sm="7" md="7">
                    <v-text-field
                      class="text-custom"
                      v-model="getUsers.Food_Allergy"
                      label="อาหารที่แพ้"              
                    ><v-icon slot="prepend" color="red"></v-icon></v-text-field>
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
          color="green"
          @click="editItem(item)"
        >
          mdi-pencil
        </v-icon>
        <v-icon
          small
          color="red"
        >
          mdi-delete
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
      search: "",
      dialog: false,
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
        { text: 'actions', value: 'actions', sortable: false }
      ],
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
      foodGroupRules: [(v) => !!v || "กรุณาเลือกประเภทอาหาร"],
      prefixItems: ["นาย", "นาง", "นางสาว"],
      foodGroupItems: ["ทั่วไป", "มังสวิรัติ", "อิสลาม"],
      genderItems: ["ชาย", "หญิง"],
    } 
  },
  components:{
    Wrapper
  },
  computed: {
    users() {
      return this.$store.getters.getShowUsers;
    },
    getUsers () {
      return this.$store.getters.getUsers
    },
    getMyProvince(){
      return this.$store.getters.myProvince
    }
  },
  mounted() {
    this.$store.dispatch("setShowUsers");
    this.getMyProvince.sort(this.compareItem)
  },
  methods:{
    downloadUser(){
      this.$store.dispatch("downloadUser");
    },
    downloadListUser(){
      this.$store.dispatch("downloadListUser");
    },
    editItem (item) {
      this.getUsers.Prefix = item.Prefix
      this.getUsers.F_Name = item.F_Name
      this.getUsers.L_Name = item.L_Name
      this.getUsers.Gender = item.Gender
      this.getUsers.Phone = item.Phone
      this.getUsers.Rank = item.Rank
      this.getUsers.Email = item.Email
      this.getUsers.Province = item.Province
      this.getUsers.Food_Group = item.Food_Group
      this.getUsers.Food_Allergy = item.Food_Allergy
      this.$store.state.userById = item.User_ID
      this.dialog = true
      console.log('items',this.$store.state.userById)
    },
    close () {      
      this.getUsers.Prefix = ""
      this.getUsers.F_Name = ""
      this.getUsers.L_Name = ""
      this.getUsers.Gender = ""
      this.getUsers.Phone = ""
      this.getUsers.Rank = ""
      this.getUsers.Email = ""
      this.getUsers.Province = ""
      this.getUsers.Food_Group = ""
      this.getUsers.Food_Allergy = ""
      this.$store.state.userById = ""
      this.dialog = false
    },
    async save () {     
      await this.$store.dispatch('editUser')
      await this.$store.dispatch('setShowUsers');
      await this.close()
    },
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