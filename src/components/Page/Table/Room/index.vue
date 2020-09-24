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
      <template #[`item.full_name1`]="{ item }">{{ item.F_1 }} {{ item.L_1 }}</template>
      <template #[`item.full_name2`]="{ item }">{{ item.F_2 }} {{ item.L_2 }}</template>

      <template v-slot:top>
        <v-dialog v-model="dialog" max-width="500px">
          <v-card>
            <v-card-title>
              <span class="headline"><h5>แก้ไขเลขห้อง</h5></span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="room.Room_Number" label="หมายเลขห้อง"></v-text-field>
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
          dialog: false,
          search: "",
          headers: [
            { text: 'ID', value: 'Room_ID' },
            { text: 'ชื่อคนที่ 1', value: 'full_name1' },
            { text: 'ชื่อคนที่ 2', value: 'full_name2' },
            { text: 'หมายเลขห้อง', value: 'Room_Number' },
            { text: 'แก้ไขเลขห้อง', value: 'actions', sortable: false }
          ]
      }
    },
    components:{
      Wrapper
    },
    mounted() {
      this.$store.dispatch("setUserRoom");
    },
    computed: {
      userRoom() {
        return this.$store.getters.getUserRoom;
      },
      room() {
        return this.$store.getters.getRoom;
      },
    },
    methods: {
      editItem (item) {
        this.room.Room_Number = item.Room_Number
        this.$store.state.roomItems = item
        this.dialog = true
        console.log('items',this.$store.state.roomItems)
      },
      close () {
        this.dialog = false
      },
      async save() {
        await this.$store.dispatch('updateRoom')
        await this.$store.dispatch('setUserRoom')        
        await this.close()
      },
    },
  }
</script>