<template>
  <Wrapper>
    <v-img :src="require('@/assets/logo_moi480.png')" class="my-3" contain height="160" />
    <WrapperText>
      <Title>การจัดอบรมสัมมนาเชิงปฏิบัติการ</Title>
      <SubTitle>เรื่อง การเพิ่มประสิทธิภาพการปฏิบัติงานของเจ้าหน้าที่สำนักงานอุตสาหกรรมจังหวัด</SubTitle>
      <Content>ระหว่างวันที่ ๔ - ๖ สิงหาคม ๒๕๖๓</Content>
      <SubContent>ณ ห้องประชุมอยุธยา ชั้น ๕ โรงแรมท๊อปแลนด์ จ.พิษณุโลก</SubContent>
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
  methods:{
    check(){
      console.log('check',this.$store.getters.getUser2ID) 
      router.push('/page')
    }
  }
};
</script>