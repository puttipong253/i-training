<template>
  <v-app>
    <Navbar/>
    <Alert/>
    <v-main>
      <router-view></router-view>
    </v-main>
    <Footer/>
  </v-app>
</template>
<script>
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Alert from './components/Alert'
export default {
    components:{
      Navbar,
      Footer,
      Alert
    }
}
</script>