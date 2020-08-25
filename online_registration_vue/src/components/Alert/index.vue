<template>
  <div class="text-center">
    <v-snackbar
      v-model="alert"
      :timeout="timeout"
      :color="alertColor"
      :multi-line="multiLine"
      top
      right
    >
      <v-icon v-if="alertColor == 'error'" class="pr-2">mdi-cancel</v-icon>
      <v-icon v-else-if="alertColor == 'success'" class="pr-2">mdi-checkbox-marked-circle</v-icon>

      {{ alertText }}
      <template v-slot:action="{ attrs }">
        <v-btn color="white" text v-bind="attrs" @click="closeAlert">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import router from '../../router'
export default {
  name: "Alert",
  data() {
    return {
      multiLine: true,
      timeout: 1500,
    };
  },
  computed: {
    alert: {
      get() {
        return this.$store.getters.getAlert;
      },
      set(alert) {
        return this.$store.commit("SET_ALERT", alert);
      },
    },
    alertColor() {
      return this.$store.getters.getAlertColor;
    },
    alertText() {
      return this.$store.getters.getAlertText;
    },
  },
  methods: {
    closeAlert() {
      if (this.alertColor == 'success') {
        return this.$store.dispatch("closeAlert"),
        router.push('/')
      }else{
        return this.$store.dispatch("closeAlert")
      }
    },
  },
};
</script>