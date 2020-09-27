<template>
  <Wrapper>
    <v-card-title>
      รายชื่อห้องพัก
      <!-- <v-btn class="ml-5 info" @click="downloadHotel">ดาวน์โหลด</v-btn> -->
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>

    <div v-if="userRoom == ''">
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
        :items="userRoom"
        :search="search"        
      >
      <template #[`item.full_name1`]="{ item }">{{ item.PF_1 }} {{ item.F_1 }} {{ item.L_1 }}</template>
      <template #[`item.full_name2`]="{ item }">{{ item.PF_2 }} {{ item.F_2 }} {{ item.L_2 }}</template>

      <template v-slot:top>
        <v-dialog v-model="dialog" persistent max-width="500px">
          <v-card>
            <v-card-title>
              <span class="headline"><h5>แก้ไขเลขห้อง</h5></span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="6" sm="6" md="6">
                    <v-select
                      class="text-custom"
                      v-model="getRoom.Province_1"
                      :items="myProvince" 
                      @change="updateUserRoom1"
                      item-text="th"
                      label="จังหวัด"
                    ></v-select>
                  </v-col>

                  <v-col cols="6" sm="6" md="6">
                    <v-select
                      class="text-custom"
                      v-model="getRoom.User_1_ID"
                      :items="getUpdateUserRoom1" 
                      :item-text="text"
                      item-value="User_ID"
                      label="ชื่อคนที่ 1"
                    ></v-select>
                  </v-col>

                  <v-col cols="6" sm="6" md="6">
                    <v-select
                      class="text-custom"
                      v-model="getRoom.Province_2"
                      :items="myProvince" 
                      @change="updateUserRoom2"
                      item-text="th"
                      label="จังหวัด"
                    ></v-select>
                  </v-col>

                  <v-col cols="6" sm="6" md="6">
                    <v-select
                      class="text-custom"
                      v-model="getRoom.User_2_ID"
                      :items="getUpdateUserRoom2" 
                      :item-text="text"
                      item-value="User_ID"
                      label="ชื่อคนที่ 2"
                    ></v-select>
                  </v-col>

                  <v-col cols="12" sm="12" md="12">
                    <v-text-field v-model="getRoom.Room_Number" label="หมายเลขห้อง"></v-text-field>
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
    data(){
      return{
          disabled: false,
          dialog: false,
          search: "",
          headers: [
            { text: 'ID', value: 'Room_ID' },
            { text: 'ชื่อคนที่ 1', value: 'full_name1' },
            { text: 'จังหวัด', value: 'PV_1' },
            { text: 'ชื่อคนที่ 2', value: 'full_name2' },
            { text: 'จังหวัด', value: 'PV_2' },
            { text: 'หมายเลขห้อง', value: 'Room_Number' },
            { text: 'แก้ไขเลขห้อง', value: 'actions', sortable: false }
          ],
      }
    },
    components:{
      Wrapper
    },
    mounted() {
      this.$store.dispatch('setUserRoom');      
    },
    watch: {
      overlay (val) {
        val && setTimeout(() => {
          this.overlay = false
        }, 3000)
      },
    },
    computed: {
      userRoom() {
        return this.$store.getters.getUserRoom;
      },
      getRoom() {
        return this.$store.getters.getRoom;
      },
      getTmp() {
        return this.$store.getters.getTmp;
      },
      users() {
        return this.$store.getters.getShowUsers;
      },
      myProvince() {
        return this.$store.getters.myProvince;
      },
      getUpdateUserRoom1(){
        return this.$store.getters.getUpdateUserRoom1;
      },
      getUpdateUserRoom2(){
        return this.$store.getters.getUpdateUserRoom2;
      }
    },
    methods: {
      editItem (item) {    
        this.disabled = false,          
        this.$store.dispatch('updateUserRoom1')
        this.$store.dispatch('updateUserRoom2')
        this.getRoom.Room_Number = item.Room_Number
        this.getRoom.User_1_ID = item.UID1
        this.getRoom.User_2_ID = item.UID2
        this.getTmp.User_1_ID = item.UID1
        this.getTmp.User_2_ID = item.UID2
        this.getRoom.Province_1 = item.PV_1
        this.getRoom.Province_2 = item.PV_2
        this.getRoom.Room_ID = item.Room_ID
        this.$store.state.roomItems = item
        this.dialog = true
      },
      close () {
        this.dialog = false
      },
      async save() {      
        // this.disabled = true,     
        // await this.$store.dispatch('resetData')             
        // await this.$store.dispatch('updateRoom')
        // await this.$store.dispatch('partnerRoomHotel')   
        // await this.$store.dispatch('setUserRoom')      
        // await this.$store.dispatch('setUsersHotel');  
        await this.close()
      },
      updateUserRoom1(){
        this.$store.dispatch('updateUserRoom1')
      },
      updateUserRoom2(){
        this.$store.dispatch('updateUserRoom2')
      },
      text: item => item.F_Name + ' ' +  item.L_Name
    },
  }
</script>