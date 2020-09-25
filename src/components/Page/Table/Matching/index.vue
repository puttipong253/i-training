<template>
  <Wrapper>
    <v-row>
      <Table1>
        <v-text-field
          class="text-custom"
          v-model="this.name1"
          label="ชื่อคนที่ 1 : "
          readonly
        ></v-text-field>
        <v-card-title>
          รายชื่อผู้เข้าพักโรงแรม
          <!-- <v-btn class="ml-5 info" @click="downloadHotel">ดาวน์โหลด</v-btn> -->
          <v-spacer></v-spacer>

          <v-text-field
            v-model="search1"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>

        <div v-if="getMatching == ''">
          <v-data-table
            item-key="name"
            class="elevation-1"
            loading
            loading-text="Loading... Please wait"
            :headers="headers1"
            :search="search1"
          ></v-data-table>
        </div>

        <div v-else>
          <v-data-table
            :headers="headers1"
            :items="getMatching"
            :search="search1"
          >
            <template v-if="userMatch.User_1_ID == '' " v-slot:[`item.actions`]="{ item }">
              <v-icon
                small
                class="mr-2"
                color="green"
                @click="selectUser1(item)"
                :disabled="item.User_ID == userMatch.User_2_ID"
              >
                mdi-plus
              </v-icon>
            </template>
            <template v-else v-slot:[`item.actions`]="{ item }">
              <v-icon
                small
                class="mr-2"
                @click="selectUser1(item)"
                disabled
              >
                mdi-plus
              </v-icon>
            </template>
          </v-data-table>
        </div>
      </Table1>

      <Table1>
        <v-text-field
          class="text-custom"
          v-model="this.name2"
          label="ชื่อคนที่ 2 : "
          readonly
        ></v-text-field>
        <v-card-title>
          รายชื่อผู้เข้าพักโรงแรม
          <v-spacer></v-spacer>

          <v-text-field
            v-model="search2"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>

        <div v-if="getMatching == ''">
          <v-data-table
            item-key="name"
            class="elevation-1"
            loading
            loading-text="Loading... Please wait"
            :headers="headers2"
            :search="search2"
          ></v-data-table>
        </div>

        <div v-else>
          <v-data-table
            :headers="headers2"
            :items="getMatching"
            :search="search2"

          >
          <template v-if="userMatch.User_2_ID == ''" v-slot:[`item.actions`]="{ item }">
            <v-icon
              small
              class="mr-2"
              color="blue"
              @click="selectUser2(item)"
              :disabled="item.User_ID == userMatch.User_1_ID"
            >
              mdi-plus
            </v-icon>
          </template>
          <template v-else v-slot:[`item.actions`]="{ item }">
            <v-icon
              small
              class="mr-2"
              @click="selectUser2(item)"
              disabled
            >
              mdi-plus
            </v-icon>
          </template>
          </v-data-table>
        </div>
      </Table1>
    <v-overlay :value="overlay">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
    </v-row>
      <v-btn class="purple mt-5 mb-5 mr-1" dark @click="saveMatch">บันทึก</v-btn>
      <v-btn class="warning mt-5 mb-5" dark @click="clear">Clear</v-btn>
  </Wrapper>
</template>

<script>
import { Wrapper,Table1 } from './index.style'
export default {
    data() {
        return {
            search1: "",
            name1:"",
            name2:"",
            overlay: false,
            headers1:[
                { text: "ID", value: "User_ID" },
                { text: "คำนำหน้า", value: "Prefix" },
                { text: "ชื่อ", value: "F_Name" },
                { text: "นามสกุล", value: "L_Name" },
                { text: "เพศ", value: "Gender" },
                { text: "เบอร์โทรศัพท์", value: "Phone" },
                { text: "จังหวัด", value: "Province" },
                { text: "select", value: 'actions', sortable: false },
            ],
            search2: "",
            headers2:[
                { text: "ID", value: "User_ID" },
                { text: "คำนำหน้า", value: "Prefix" },
                { text: "ชื่อ", value: "F_Name" },
                { text: "นามสกุล", value: "L_Name" },
                { text: "เพศ", value: "Gender" },
                { text: "เบอร์โทรศัพท์", value: "Phone" },
                { text: "จังหวัด", value: "Province" },
                { text: "select", value: 'actions', sortable: false },
            ]
        }
    },
    components:{
        Wrapper,
        Table1,
    },
    mounted(){
        this.$store.dispatch('matching')
    },
    watch: {
      overlay (val) {
        val && setTimeout(() => {
          this.overlay = false
        }, 3000)
      },
    },
    computed:{
        getMatching(){
            return this.$store.getters.getMatching
        },
        userMatch(){
            return this.$store.getters.getRoom
        },
        getMatchingStatus(){
            return this.$store.getters.getMatchingStatus
        }
    },
    methods:{
      selectUser1(item){
        if (confirm('เลือกคุณ'+' '+item.F_Name+' '+'ใช่หรือไม่')) {
          this.userMatch.User_1_ID = item.User_ID
          this.name1 = item.F_Name +" "+ item.L_Name
        }
      },
      selectUser2(item){
        if (confirm('เลือกคุณ'+' '+item.F_Name+' '+'ใช่หรือไม่')) {
          this.userMatch.User_2_ID = item.User_ID
          this.name2 = item.F_Name +" "+ item.L_Name
        }
      },
      async saveMatch(){
        this.overlay = true
        if (this.userMatch.User_1_ID !='' && this.userMatch.User_2_ID !='') {
          if (confirm(this.name1 +' และ '+ this.name2)) {
            this.name1 = ''
            this.name2 = ''
            await this.$store.dispatch("setRoomMatch")
            await this.$store.dispatch("partnerHotel") 
            await this.$store.dispatch("alertSuccess")
            await this.$store.dispatch("matching")
            await this.$store.dispatch("setUserRoom")               
          } 
        }
      },
      clear(){
        this.name1 = ''
        this.name2 = ''
        this.userMatch.User_1_ID = ''
        this.userMatch.User_2_ID = ''
      }
    }
}
</script>