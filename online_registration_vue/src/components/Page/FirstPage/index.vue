<template>
  <Wrapper>
    <v-img :src="require('@/assets/logo_moi480.png')" class="my-3" contain height="160" />
    <WrapperText>
      <Title>การจัดอบรมสัมมนาเชิงปฏิบัติการ</Title>
      <SubTitle>เรื่อง การเพิ่มประสิทธิภาพการปฏิบัติงานของเจ้าหน้าที่สำนักงานอุตสาหกรรมจังหวัด</SubTitle>
      <Content>ระหว่างวันที่ ๑๙ - ๒๑ ตุลาคม ๒๕๖๓</Content><SubContent>ณ มหาวิทยาลัยเกษตรศาสตร์ บางเขน</SubContent>
      
    </WrapperText>
    <v-btn class="purple" dark @click="check">ลงทะเบียน</v-btn>
  </Wrapper>
</template>

<script>
import router from '../../../router';
import { Wrapper, WrapperText, Title, SubTitle, Content, SubContent } from "./index.style";

export default {
  components: {
    Wrapper,
    WrapperText,
    Title,
    SubTitle,
    Content,
    SubContent
  },
  data() {
    return {
      load:[]
    }
  },
  methods:{
    check(){
      console.log('check',this.$store.getters.getUser2ID) 
      router.push('/page')
    },
  },
}
</script>