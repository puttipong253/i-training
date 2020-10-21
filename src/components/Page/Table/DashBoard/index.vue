<template>
    <Wrapper>
        <v-row>
            <v-col cols="12" sm="6" md="3">
                <v-card
                    class="mx-auto mt-5"
                    max-width="344"
                    height="200px"
                >
                    <v-card-title class="blue white--text justify-center">
                      ผู้ลงทะเบียนทั้งหมด
                    </v-card-title>

                    <div class="mt-1 blue--text">
                      {{getCountAllCustomer}}
                    </div>
                </v-card>
            </v-col> 
            <v-col cols="12" sm="6" md="3">
                <v-card
                    class="mx-auto mt-5"
                    max-width="344"
                    height="200px"
                >
                    <v-card-title class="green white--text justify-center">
                      ผู้ลงทะเบียนที่จับคู่แล้ว
                    </v-card-title>

                    <div class="mt-1 green--text">
                      {{getCountCustomerMatch}}
                    </div>
                </v-card>
            </v-col> 
            <v-col cols="12" sm="6" md="3">
                <v-card
                    class="mx-auto mt-5"
                    max-width="344"
                    height="200px"
                >
                    <v-card-title class="orange white--text justify-center" >
                      ผู้ลงทะเบียนที่ยังไม่จับคู่
                    </v-card-title>

                    <div class="mt-1 orange--text">
                      {{getCountCustomerNotMatch}}
                    </div>
                </v-card>
            </v-col> 
            <v-col cols="12" sm="6" md="3">
                <v-card
                    class="mx-auto mt-5"
                    max-width="344"
                    height="200px"
                >                   
                    <v-card-title class="red white--text justify-center">
                      ห้องพักที่ลงทะเบียนแล้ว
                    </v-card-title>

                    <div class="mt-1 red--text">
                      {{getCountCustomerRoom}}
                    </div>
                </v-card>
            </v-col> 
        </v-row>                
    </Wrapper>
</template>

<script>
import {Wrapper} from './index.style'
export default {
    data() {
        return {
            
        }
    },
    components:{
        Wrapper
    },
    mounted(){
        this.$store.dispatch('countAllCustomer')
        this.$store.dispatch('countCustomerMatch')
        this.$store.dispatch('countCustomerNotMatch')
        this.$store.dispatch('countCustomerRoom')
    },
    computed: {
        getCountAllCustomer(){
            return this.$store.getters.getCountAllCustomer
        },
        getCountCustomerMatch(){
            return this.$store.getters.getCountCustomerMatch
        },
        getCountCustomerNotMatch(){
            return this.$store.getters.getCountCustomerNotMatch
        },
        getCountCustomerRoom(){
            return this.$store.getters.getCountCustomerRoom
        }
    },
}
</script>