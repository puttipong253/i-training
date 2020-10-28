<template>
<Wrapper>
  <v-form
    ref="form"
    v-model="valid"
    lazy-validation
  >
  <Header>Login Admin</Header>
    <v-text-field
      v-model="email"
      :rules="emailRules"
      label="E-mail"
      required
    ></v-text-field>

    <v-text-field
      v-model="password"
      :rules="passwordRules"
      label="Password"
      required
    ></v-text-field>

    <v-btn
      :disabled="!valid"
      color="purple"
      class="mt-10"
      @click="validate"
      dark
    >
      เข้าสู่ระบบ
    </v-btn>

    <v-btn
      color="info"
      class="ml-2 mt-10"
      @click="reset"
    >
      กลับหน้าหลัก
    </v-btn>

  </v-form>
  </Wrapper>
</template>
<script>
import { Wrapper, Header } from './index.style'
  export default {
    data: () => ({
      valid: true,
      password: '',
      passwordRules: [
        v => !!v || 'Password is required'
      ],
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
    }),
    components:{
        Wrapper,
        Header
    },

    methods: {
      validate () {
        this.$refs.form.validate()
      },
      reset () {
        this.$refs.form.reset()
      },
      resetValidation () {
        this.$refs.form.resetValidation()
      },
    },
  }
</script>