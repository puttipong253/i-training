<template>
  <Wrapper>
    <v-img :src="require('@/assets/logo_moi480.png')" class="my-3" contain height="160" />
    <WrapperText>
      <Title>การจัดอบรมสัมมนาเชิงปฏิบัติการ</Title>
      <SubTitle>เรื่อง การเพิ่มประสิทธิภาพการปฏิบัติงานของเจ้าหน้าที่สำนักงานอุตสาหกรรมจังหวัด</SubTitle>
      <Content>ระหว่างวันที่ ๑๙ - ๒๑ ตุลาคม ๒๕๖๓</Content><SubContent>ณ มหาวิทยาลัยเกษตรศาสตร์ บางเขน</SubContent>
      
    </WrapperText>
      <v-dialog v-model="dialog" persistent max-width="600px">
        <v-card>
          <v-card-title>
            <span class="headline">ตรวจสอบการลงทะเบียน</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="12" md="12">
                  <v-text-field
                    class="text-custom"
                    v-model="getPhone.Phone"
                    :rules="phoneRules"
                    :counter="10"
                    maxlength="10"
                    oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
                    label="เบอร์โทรศัพท์"
                    type="number"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="submitTrack">ตกลง</v-btn>
            <v-btn color="blue darken-1" text @click="dialog = false">ยกเลิก</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-btn class="purple" dark @click="check">ลงทะเบียน</v-btn>
      <v-btn class="orange ml-1" dark @click="tracking">ตรวจสอบ</v-btn>
  </Wrapper>
</template>

<script>
import router from '../../../router';
import { Wrapper, WrapperText, Title, SubTitle, Content, SubContent } from "./index.style";

export default {
  data() {
    return {
      dialog: false,
      phoneRules: [
        v => !!v || "กรุณากรอกเบอร์โทรศัพท์",
        v => (v && v.length == 10) || "กรุณากรอกเบอร์โทรศัพท์ให้ครบ 10 หลัก",
      ],
    }
  },
  components: {
    Wrapper,
    WrapperText,
    Title,
    SubTitle,
    Content,
    SubContent
  },
  computed:{
    getPhone(){
      return this.$store.getters.getPhone
    },
  },
  methods:{
    check(){
      console.log('check',this.$store.getters.getUser2ID) 
      router.push('/page')
    },
    tracking(){
      this.dialog = true
    },
    submitTrack(){
      this.$store.dispatch('userTracking')
    },
        ssdsdsd(){
      this.$store.dispatch('userTracking')
    }
  },
}
</script>