<template>
  <nav>
    <v-app-bar color="deep-purple" dark>
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
      <v-toolbar-title>ลงทะเบียนอบรม</v-toolbar-title>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list nav>
        <v-list-item-group active-class="deep-purple--text text--accent-4">
          <v-list-item to="/">
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title>กลับหน้าหลัก</v-list-item-title>
          </v-list-item>

          <v-list-item to="/page">
            <v-list-item-icon>
              <v-icon>mdi-pencil</v-icon>
            </v-list-item-icon>
            <v-list-item-title>ลงทะเบียน</v-list-item-title>
          </v-list-item>

          <v-list-item target="_blank" href="https://www.google.com/maps/place/KU+Home+@+Kasetsart+University+Bangkok/@13.8453406,100.567736,251m/data=!3m1!1e3!4m8!3m7!1s0x30e29cddec0efb41:0x4fac1d0b01aca6c8!5m2!4m1!1i2!8m2!3d13.845122!4d100.5676568">
            <v-list-item-icon>
              <v-icon>mdi-google-maps</v-icon>
            </v-list-item-icon>
            <v-list-item-title>แผนที่โรงแรม</v-list-item-title>
          </v-list-item>

          <v-list-item target="_blank" href="https://www.google.com/maps/place/%E0%B8%AA%E0%B8%B3%E0%B8%99%E0%B8%B1%E0%B8%81%E0%B8%9A%E0%B8%A3%E0%B8%B4%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B8%84%E0%B8%AD%E0%B8%A1%E0%B8%9E%E0%B8%B4%E0%B8%A7%E0%B9%80%E0%B8%95%E0%B8%AD%E0%B8%A3%E0%B9%8C+%E0%B8%A1%E0%B8%AB%E0%B8%B2%E0%B8%A7%E0%B8%B4%E0%B8%97%E0%B8%A2%E0%B8%B2%E0%B8%A5%E0%B8%B1%E0%B8%A2%E0%B9%80%E0%B8%81%E0%B8%A9%E0%B8%95%E0%B8%A3%E0%B8%A8%E0%B8%B2%E0%B8%AA%E0%B8%95%E0%B8%A3%E0%B9%8C+%E0%B8%9A%E0%B8%B2%E0%B8%87%E0%B9%80%E0%B8%82%E0%B8%99/@13.8455694,100.5664277,538m/data=!3m1!1e3!4m5!3m4!1s0x0:0x2d8c77dfc235fd03!8m2!3d13.844606!4d100.5675213">
            <v-list-item-icon>
              <v-icon>mdi-google-maps</v-icon>
            </v-list-item-icon>
            <v-list-item-title>แผนห้องอบรม</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
export default {
  data: () => ({
    drawer: false,
  }),
};
</script>