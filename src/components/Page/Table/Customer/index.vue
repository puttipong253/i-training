<template>
  <Wrapper>
    <v-card-title>
      รายชื่อผู้ลงทะเบียนทั้งหมด
      <v-btn class="ml-5 info" @click="downloadCustomer">ดาวน์โหลด</v-btn>
      <v-btn class="ml-1 info" @click="downloadListCustomer">ดาวน์โหลดใบเซ็นชื่อ</v-btn>
      <v-spacer></v-spacer>
      
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>

    <div v-if="customer == ''">
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
        :items="customer"
        :search="search"
      >
      <template v-slot:top>
        <v-dialog v-model="dialog" persistent max-width="500px">
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
                      v-model="getCustomer.Prefix"
                      :rules="prefixRules"
                      :items="prefixItems"
                      label="คำนำหน้า"              
                    ></v-select>            
                  </v-col>

                  <v-col cols="6" sm="5" md="5">
                    <v-text-field
                      class="text-custom"
                      v-model="getCustomer.F_Name"
                      :rules="fnameRules"
                      label="ชื่อจริง"              
                    ></v-text-field>
                  </v-col>

                  <v-col cols="6" sm="4" md="4">
                    <v-text-field
                      class="text-custom"
                      v-model="getCustomer.L_Name"
                      :rules="lnameRules"
                      label="นามสกุล"              
                    ></v-text-field>
                  </v-col>

                  <v-col cols="5" sm="3" md="3">
                    <v-select 
                      class="text-custom"
                      v-model="getCustomer.Gender" 
                      :items="genderItems" 
                      :rules="genderRules"
                      label="เพศ"
                    ></v-select>
                  </v-col>

                  <v-col cols="7" sm="5" md="5">
                    <v-text-field
                      class="text-custom"
                      v-model="getCustomer.Rank"
                      :rules="rankRules"
                      label="ตำแหน่ง"              
                    ></v-text-field>
                  </v-col>

                  <v-col cols="5" sm="4" md="4">
                    <v-text-field
                      class="text-custom"
                      v-model="getCustomer.Phone"
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
                      v-model="getCustomer.Email"
                      :rules="emailRules"
                      label="อีเมล"              
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" sm="6" md="6" >       
                    <v-select
                      class="text-custom"
                      v-model="getCustomer.Province"
                      :rules="provinceRules"
                      :items="getMyProvince"
                      item-text="th"
                      label="จังหวัด"
                    ></v-select>     
                  </v-col>

                  <v-col cols="5" sm="5" md="5">
                    <v-select
                      class="text-custom"
                      v-model="getCustomer.Food_Group"
                      :rules="foodGroupRules"
                      :items="foodGroupItems"
                      label="ประเภทอาหาร"              
                    ></v-select>
                  </v-col>

                  <v-col cols="7" sm="7" md="7">
                    <v-text-field
                      class="text-custom"
                      v-model="getCustomer.Food_Allergy"
                      label="อาหารที่แพ้"              
                    ><v-icon slot="prepend" color="red"></v-icon></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text :disabled="disabled" @click="save">บันทึก</v-btn>
              <v-btn color="blue darken-1" text :disabled="disabled" @click="close">ยกเลิก</v-btn>
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
          @click="deleteCustomer(item)"
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
      disabled: false,
      headers: [
        { text: "ID", value: "Customer_ID" },
        { text: "คำนำหน้า", value: "Prefix" },
        { text: "ชื่อ", value: "F_Name" },
        { text: "นามสกุล", value: "L_Name" },
        { text: "เพศ", value: "Gender" },
        { text: "ตำแหน่ง", value: "Rank" },
        { text: "อีเมล", value: "Email" },
        { text: "เบอร์โทรศัพท์", value: "Phone" },
        { text: "จังหวัด", value: "Province" },
        { text: "ประเภทอาหาร", value: "Food_Group" },
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
    customer() {
      return this.$store.getters.getShowCustomer;
    },
    getCustomer () {
      return this.$store.getters.getCustomer
    },
    getMyProvince(){
      return this.$store.getters.myProvince
    }
  },
  mounted() {
    this.$store.dispatch('setShowCustomer');
    this.getMyProvince.sort(this.compareItem)
  },
  methods:{
    downloadCustomer(){
      this.$store.dispatch('downloadCustomer');
    },
    downloadListCustomer(){
      this.$store.dispatch('downloadListCustomer');
    },
    editItem (item) {
      this.disabled = false
      this.getCustomer.Prefix = item.Prefix
      this.getCustomer.F_Name = item.F_Name
      this.getCustomer.L_Name = item.L_Name
      this.getCustomer.Gender = item.Gender
      this.getCustomer.Phone = item.Phone
      this.getCustomer.Rank = item.Rank
      this.getCustomer.Email = item.Email
      this.getCustomer.Province = item.Province
      this.getCustomer.Food_Group = item.Food_Group
      this.getCustomer.Food_Allergy = item.Food_Allergy
      this.getCustomer.Status = item.Status
      this.$store.state.customerById = item.Customer_ID
      this.dialog = true
      console.log('items',item)
    },
    close () {      
      this.getCustomer.Prefix = ""
      this.getCustomer.F_Name = ""
      this.getCustomer.L_Name = ""
      this.getCustomer.Gender = ""
      this.getCustomer.Phone = ""
      this.getCustomer.Rank = ""
      this.getCustomer.Email = ""
      this.getCustomer.Province = ""
      this.getCustomer.Food_Group = ""
      this.getCustomer.Food_Allergy = ""
      this.$store.state.customerById = ""
      this.getCustomer.Status = ""
      this.dialog = false
    },
    async save () {   
      this.disabled = true  
      await this.$store.dispatch('editCustomer')
      await this.$store.dispatch('setShowCustomer');
      await this.close()
    },
    async deleteCustomer(item){
      this.$store.state.customerById = item.Customer_ID
      this.$store.dispatch('getpartnerID')
      var con = confirm("ต้องการลบคุณ"+" "+item.F_Name+" "+"ใช่หรือไม่ ?");      
      if (con) {
        await this.$store.dispatch('deleteCustomer')
        await this.$store.dispatch('deleteHotel')
        await this.$store.dispatch('resetPartnerID');
        await this.$store.dispatch('setShowCustomer');
        await this.$store.dispatch('setCustomerHotel');     
        await this.$store.dispatch('setCustomerRoom');     
      }        
      else{
        return false;
      }        
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